import { useEffect, useState } from "react"
import { io } from "socket.io-client"

import { getAvatar } from "~util/getAvatar"
import { getRoomId } from "~util/getRoomId"
import { getUid } from "~util/getUid"
import { getUsername } from "~util/getUsername"

const CustomButton = () => {
  const [message, setMessage] = useState("")
  const [urlsMap, setUrlsMap] = useState({})
  const [usernameMap, setUsernameMap] = useState({})
  const [avatarMap, setAvatarMap] = useState({})
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
