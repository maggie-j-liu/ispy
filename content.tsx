import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const CustomButton = () => {
  const [message, setMessage] = useState("")
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
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        setMessage(request)
      })
      console.log("headers", uid)
      const socket = io("wss://famous-duck-47.deno.dev", {
        auth: {
          uid
        }
      })
      socket.on("connect", () => {
        console.log("connected", socket.id)
      })
      socket.on("hello", (data) => {
        console.log("hellafdafo", data)
      })
      console.log("hello world")
    })()
  }, [])
  return <div>{message}</div>
}

export default CustomButton
