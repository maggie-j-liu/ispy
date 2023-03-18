import { useEffect, useState } from "react"

const CustomButton = () => {
  const [message, setMessage] = useState("")
  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      setMessage(request)
    })
  }, [])
  return <div>{message}</div>
}

export default CustomButton
