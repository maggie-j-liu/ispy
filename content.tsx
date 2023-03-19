import { useEffect, useState } from "react"
import { io } from "socket.io-client"

import { getUid } from "~util/getUid"

const CustomButton = () => {
  const [message, setMessage] = useState("")
  const [urlsMap, setUrlsMap] = useState({})
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
      socket.on("connect", () => {
        console.log("connected", socket.id)
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
        setUrlsMap({ ...urlsMap })
      })
    })()
  }, [])
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{message}</div>
      <div>{JSON.stringify(urlsMap)}</div>
    </div>
  )
}

export default CustomButton
