import { useState } from "react"

function ReceivePopup() {
    const [data, setData] = useState("")

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 16
            }}>
            <h1>Receive Page</h1>
        </div>
    )
}

export default ReceivePopup
