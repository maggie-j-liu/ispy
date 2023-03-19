import { useEffect, useState } from "react"
import { io } from "socket.io-client"

import { getRoomId } from "~util/getRoomId"
import { getUid } from "~util/getUid"
import { getUsername } from "~util/getUsername"

const CustomButton = () => {
  const [message, setMessage] = useState("")
  const [urlsMap, setUrlsMap] = useState({})
  const [usernameMap, setUsernameMap] = useState({})
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
        const [roomId, username] = await Promise.all([
          getRoomId(),
          getUsername()
        ])
        console.log("got username", username)
        socket.emit("joinRoom", {
          roomId,
          uid
        })
        socket.emit("setUsername", { uid, username })
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
      socket.on("changeUrl", (userId, newUrl) => {
        console.log("socket id", userId, "new url", newUrl)
        urlsMap[userId] = newUrl
        setUrlsMap((u) => {
          u[userId] = newUrl
          return { ...u }
        })
      })
      socket.on("initState", (_urlsMap, _usernameMap) => {
        setUrlsMap(_urlsMap)
        setUsernameMap(_usernameMap)
      })
      socket.on("usernameChange", ({ uid, username }) => {
        console.log("got usernamechange")
        setUsernameMap((u) => {
          u[uid] = username
          return { ...u }
        })
      })
    })()
  }, [])
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {Object.keys(urlsMap).map((uid) => (
        <div key={uid}>
          {uid in usernameMap ? usernameMap[uid] : uid}: {urlsMap[uid]}
        </div>
      ))}
    </div>
  )
}

export default CustomButton
