import { useState } from "react"

function SendPopup() {
    const [data, setData] = useState("")

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 16
            }}>
            <h1>Send Page</h1>
        </div>
    )
}

export default SendPopup
