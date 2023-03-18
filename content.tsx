import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const CustomButton = () => {
  const [message, setMessage] = useState("")
  const [socketMessage, setSocketMessage] = useState("none")
  useEffect(() => {
    ;(async () => {
      // check if the user has an uid already
      const storage = await chrome.storage.sync.get("uid")
      let uid
      if (!("uid" in storage)) {
        // random 32 character string
        uid = crypto.randomUUID()
        console.log(uid)
        await chrome.storage.sync.set({ uid })
      } else {
        uid = storage.uid
      }

      console.log("headers", uid)
      const socket = io("wss://famous-duck-47.deno.dev", {
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
      socket.on("changeUrl", (socketId, newUrl) => {
        console.log("socket id", socketId, "new url", newUrl)
        setSocketMessage(newUrl)
      })
    })()
  }, [])
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>{message}</div>
      <div>{socketMessage}</div>
    </div>
  )
}

export default CustomButton
