import cssText from "data-text:~style.css"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { render } from "react-dom"
import Draggable, { DraggableCore } from "react-draggable"
import { BsArrowsMove } from "react-icons/bs"
import useMeasure from "react-use-measure"
import { io } from "socket.io-client"

import { getAvatar } from "~util/getAvatar"
import { getRoomId } from "~util/getRoomId"
import { getUid } from "~util/getUid"
import { getUsername } from "~util/getUsername"

export const getStyle = () => {
  const style = document.createElement("style")
  console.log(cssText)
  style.textContent =
    cssText +
    "#plasmo-shadow-container > #plasmo-overlay-0 {position: relative !important; }"
  return style
}

const CustomButton = () => {
  const [message, setMessage] = useState("")
  const [urlsMap, setUrlsMap] = useState({})
  const [usernameMap, setUsernameMap] = useState({})
  const [avatarMap, setAvatarMap] = useState({})
  const [minimize, setMinimize] = useState(true)
  const [ref, { height }] = useMeasure()
  useEffect(() => {
    ;(async () => {
      // check if the user has an uid already
      const uid = await getUid()
      console.log("headers", uid)
      const socket = io("wss://HalfPoliticalMap.maggieliu1.repl.co", {
        auth: {
          uid
        }
      })
      socket.on("connect", async () => {
        console.log("connected", socket.id)
        const [roomId, username, avatar] = await Promise.all([
          getRoomId(),
          getUsername(),
          getAvatar(uid)
        ])
        console.log("got username", username)
        socket.emit("joinRoom", {
          roomId,
          uid
        })
        socket.emit("setUsername", { uid, username })
        socket.emit("setAvatar", { uid, avatar })
        // poll for current url so addListener will be called
        chrome.runtime.sendMessage("getCurrentUrl")
        chrome.runtime.onMessage.addListener(
          (request, sender, sendResponse) => {
            setMessage(request)
            console.log("emitting currentUrl", request)
            socket.emit("currentUrl", request, Date.now())
          }
        )
      })
      socket.on("initState", (_urlsMap, _usernameMap, _avatarMap) => {
        setUrlsMap(_urlsMap)
        setUsernameMap(_usernameMap)
        setAvatarMap(_avatarMap)
      })
      socket.on("changeUrl", (userId, newUrl) => {
        setUrlsMap((u) => {
          u[userId] = newUrl
          return { ...u }
        })
      })
      socket.on("usernameChange", ({ uid, username }) => {
        console.log("got usernamechange")
        setUsernameMap((u) => {
          u[uid] = username
          return { ...u }
        })
      })
      socket.on("avatarChange", ({ uid, avatar }) => {
        setAvatarMap((u) => {
          u[uid] = avatar
          return { ...u }
        })
      })
    })()
  }, [])
  //   <div className="box no-cursor">
  //     <strong className="cursor"><div>Drag here</div></strong>
  //     <div>You must click my handle to drag me</div>
  //   </div>
  // </Draggable>
  return (
    <Draggable handle=".handle" enableUserSelectHack={false}>
      <div className="font-sans px-4 py-4 text-black">
        <div className="w-[29rem] backdrop-blur-sm">
          <div
            className={`bg-gray-200 bg-opacity-70 flex px-2 py-2 rounded-t flex-col gap-y-4`}>
            <motion.div animate={{ height }}>
              <AnimatePresence>
                <motion.div
                  key={minimize ? "min" : "max"}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.2, delay: 0.2 }
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}>
                  <div ref={ref}>
                    {minimize ? (
                      <div className="">
                        <div className="flex gap-2 relative">
                          {Object.keys(urlsMap).map((uid) => (
                            <div key={uid} className="group pb-4 -mb-4">
                              <div className="flex-shrink-0 hover:ring-2 hover:ring-blue-300 rounded-full">
                                <img className="w-8 h-8" src={avatarMap[uid]} />
                                <div className="bg-blue-200 rounded-md py-1 px-2 z-10 w-full h-max hidden group-hover:block absolute top-10 left-0">
                                  <div className="font-semibold">
                                    {uid in usernameMap
                                      ? usernameMap[uid]
                                      : uid}
                                  </div>
                                  <a
                                    className="flex gap-1.5 items-center mt-1.5"
                                    href={urlsMap[uid]}
                                    target="_blank"
                                    rel="noreferrer">
                                    <img
                                      className="w-5 h-5 bg-white rounded"
                                      src={`https://www.google.com/s2/favicons?domain=${urlsMap[uid]}&sz=32`}
                                    />
                                    <div className="text-gray-800 font-light truncate text-sm underline">
                                      {urlsMap[uid]}
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {Object.keys(urlsMap).map((uid) => (
                          <div key={uid} className="flex items-center gap-4">
                            <img className="w-10 h-10" src={avatarMap[uid]} />
                            <div className="max-w-sm">
                              <div className="truncate text-lg font-semibold leading-tight">
                                {uid in usernameMap ? usernameMap[uid] : uid}
                              </div>
                              <div className="flex gap-1.5 items-center">
                                <img
                                  className="w-6 h-6 bg-white rounded px-0.5 py-0.5"
                                  src={`https://www.google.com/s2/favicons?domain=${urlsMap[uid]}&sz=32`}
                                />
                                <div className="text-gray-800 font-light truncate text-sm">
                                  {urlsMap[uid]}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            {/* */}
          </div>
          <button
            onClick={() => {
              setMinimize(!minimize)
            }}
            className={`duration-150 h-6 w-full hover:bg-gray-400 flex items-center justify-center bg-gray-300 rounded-b bg-opacity-70`}>
            {minimize ? "▼" : "▲"}
          </button>
          <div
            onMouseDown={(e) => e.preventDefault()}
            className="-ml-4 -mb-4 p-2 w-fit rounded-lg hover:cursor-move bg-blue-500 top-0 right-0 handle">
            <BsArrowsMove className="text-white" />
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default CustomButton
