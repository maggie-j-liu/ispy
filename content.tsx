import cssText from "data-text:~style.css"
import toastifyCss from "data-text:~toastify.css"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Draggable, { DraggableCore } from "react-draggable"
import { ToastContainer, toast } from "react-toastify"
import useMeasure from "react-use-measure"
import { Socket, io } from "socket.io-client"

import { getAvatar } from "~util/getAvatar"
import { getMinimizePref } from "~util/getMinimizePref"
import { getRoomId } from "~util/getRoomId"
import { getUid } from "~util/getUid"
import { getUsername } from "~util/getUsername"

export const getStyle = () => {
  const style = document.createElement("style")
  console.log(toastifyCss)
  style.textContent =
    toastifyCss +
    "\n" +
    cssText +
    "#plasmo-shadow-container > #plasmo-overlay-0 {position: relative !important; }"
  return style
}

const CustomButton = () => {
  const [urlsMap, setUrlsMap] = useState({})
  const [usernameMap, setUsernameMap] = useState({})
  const [avatarMap, setAvatarMap] = useState({})
  const [minimize, setMinimize] = useState(false)
  const [userId, setUserId] = useState()
  const [ref, { height }] = useMeasure()
  const socketRef = useRef<Socket>()

  const ToastMsg = ({ avatar, username }) => {
    return (
      <div className="flex items-center">
        <img src={avatar} className="w-8 h-8 rounded-full mr-2" />
        <div>
          <span className="text-gray-800">{username}</span> poked you! stay on
          task!
        </div>
      </div>
    )
  }

  useEffect(() => {
    ;(async () => {
      // check if the user has an uid already
      const uid = await getUid()
      setUserId(uid)
      console.log("headers", uid)
      const socket = io("wss://ispy-server.maggieliu1.repl.co", {
        auth: {
          uid
        }
      })
      socketRef.current = socket
      socket.on("connect", async () => {
        console.log("connected", socket.id)
        const [roomId, username, avatar, minimizePref] = await Promise.all([
          getRoomId(),
          getUsername(),
          getAvatar(uid),
          getMinimizePref()
        ])
        setMinimize(minimizePref)
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
      socket.on("changeUrl", async (userId, newUrl) => {
        setUrlsMap((u) => {
          u[userId] = newUrl
          return { ...u }
        })
        if (userId === uid) {
          const minimizePref = await getMinimizePref()
          setMinimize(minimizePref)
        }
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
      socket.on("poke", ({ from }) => {
        let avatar, username
        setAvatarMap((a) => {
          avatar = a[from]
          return a
        })
        setUsernameMap((u) => {
          username = u[from]
          return u
        })
        toast(<ToastMsg avatar={avatar} username={username} />, {
          position: "bottom-left"
        })
      })
    })()
  }, [])

  const poke = (friendId) => {
    socketRef.current.emit("poke", { from: userId, to: friendId })
  }

  //   <div className="box no-cursor">
  //     <strong className="cursor"><div>Drag here</div></strong>
  //     <div>You must click my handle to drag me</div>
  //   </div>
  // </Draggable>
  if (Object.entries(urlsMap).length === 0) return null
  return (
    <div>
      <Draggable enableUserSelectHack={false}>
        <div className="fixed cursor-move font-sans px-4 py-4 text-black">
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
                                <div className="flex-shrink-0 group-hover:ring-2 group-hover:ring-blue-300 rounded-full">
                                  <a
                                    onClick={() => poke(uid)}
                                    role="button"
                                    className="relative hover:cursor-pointer overflow-hidden rounded-full block">
                                    <img
                                      className="w-8 h-8"
                                      src={avatarMap[uid]}
                                    />
                                    <div className=" duration-150 opacity-0 hover:opacity-100 bg-gray-700/70 absolute top-0 left-0 w-8 h-8 flex items-center justify-center">
                                      <div className="text-[10px] text-gray-300 italic">
                                        poke
                                      </div>
                                    </div>
                                  </a>

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
                              {uid !== userId ? (
                                <button
                                  className="group rounded-full overflow-hidden relative"
                                  onClick={() => poke(uid)}>
                                  <img
                                    className="w-10 h-10"
                                    src={avatarMap[uid]}
                                  />
                                  <div className="duration-150 opacity-0 group-hover:opacity-100 bg-gray-700/70 absolute top-0 left-0 w-10 h-10 flex items-center justify-center">
                                    <div className="pb-0.5 text-sm text-gray-300 italic">
                                      poke
                                    </div>
                                  </div>
                                </button>
                              ) : (
                                <img
                                  className="w-10 h-10"
                                  src={avatarMap[uid]}
                                />
                              )}
                              <div className="max-w-sm">
                                <div className="truncate text-lg font-semibold leading-tight">
                                  {uid in usernameMap ? usernameMap[uid] : uid}
                                </div>
                                <a
                                  className="flex gap-1.5 items-center underline"
                                  href={urlsMap[uid]}
                                  target="_blank"
                                  rel="noreferrer">
                                  <img
                                    className="w-6 h-6 bg-white rounded px-0.5 py-0.5"
                                    src={`https://www.google.com/s2/favicons?domain=${urlsMap[uid]}&sz=32`}
                                  />
                                  <div className="text-gray-800 font-light truncate text-sm">
                                    {urlsMap[uid]}
                                  </div>
                                </a>
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
              onClick={async () => {
                await chrome.storage.sync.set({ minimize: !minimize })
                setMinimize(!minimize)
              }}
              className={`duration-150 h-6 w-full hover:bg-gray-400 flex items-center justify-center bg-gray-300 rounded-b bg-opacity-70`}>
              {minimize ? "▼" : "▲"}
            </button>
            {/* <div
            onMouseDown={(e) => e.preventDefault()}
            className="-ml-4 -mb-4 p-2 w-fit rounded-lg hover:cursor-move bg-blue-500 top-0 right-0 handle">
            <BsArrowsMove className="text-white" />
          </div> */}
          </div>
        </div>
      </Draggable>
      <ToastContainer />
    </div>
  )
}

export default CustomButton
