import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>iSpy</h1>
      <button onClick={createWebSocketConnection}> Test </button>
    </div>
  )
}
let websocket
let host = "ws://localhost:8080"
function createWebSocketConnection() {
  if ('WebSocket' in window) {
    websocket = new WebSocket(host);
    console.log("======== websocket ===========", websocket);

    websocket.onopen = function () {
      websocket.send("Hello");
    };

    websocket.onmessage = function (event) {
      var received_msg = JSON.parse(event.data);
      var notificationOptions = {
        type: "basic",
        title: received_msg.title,
        message: received_msg.message,
        iconUrl: "extension-icon.png"
      }
    };

    websocket.onclose = function () {
      alert("==== web socket closed====== ");
    }
  }
}
export default IndexPopup
