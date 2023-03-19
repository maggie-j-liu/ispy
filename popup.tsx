import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"

import { getUid } from "~util/getUid"

import "./style.css"

const Popup = () => {
  const [loading, setLoading] = useState(true)
  const [roomId, setRoomId] = useState<string>()
  const [enteredCode, setEnteredCode] = useState("")
  const [name, setName] = useState<string>()
  const socket = useRef<Socket>()

  const getRoomId = async () => {
    const storage = await chrome.storage.sync.get("roomId")
    console.log(storage)
    if ("roomId" in storage) {
      setRoomId(storage.roomId)
      return storage.roomId
    }
    const id = crypto.randomUUID()
    await chrome.storage.sync.set({ roomId: id })
    setRoomId(id)
    return id
  }
  useEffect(() => {
    async function retrieveName() {
      const oldname = await chrome.storage.sync.get("name")
      if ("name" in oldname) {
        setName(oldname.name)
      }
    }
    retrieveName()
  })

  useEffect(() => {
    socket.current = io("wss://HalfPoliticalMap.maggieliu1.repl.co")
    socket.current.on("connect", () => {
      console.log("sock id", socket.current.id)
      setLoading(false)
    })
    ;(async () => {
      const id = await getRoomId()
      socket.current.emit("joinRoom", { roomId: id, uid: await getUid() })
    })()
  }, [])

  const joinRoom = async () => {
    await chrome.storage.sync.set({ roomId: enteredCode })
    const uid = await getUid()
    socket.current.emit("joinRoom", { roomId: enteredCode, uid })
    setRoomId(enteredCode)
    setEnteredCode("")
  }

  const doNameStuff = async (newName: string) => {
    setName(newName)
    await chrome.storage.sync.set({ name: newName })
  }

  const leaveRoom = async () => {
    const id = crypto.randomUUID()
    await chrome.storage.sync.set({ roomId: id })
    const uid = await getUid()
    socket.current.emit("joinRoom", { roomId: id, uid })
    setRoomId(id)
  }

  if (loading) {
    return null
  }
  return (
    <div className="min-w-[20rem] py-12 px-8 text-base">
      <p className="font-mono text-center text-2xl">
        i<span className="font-bold text-3xl">Spy</span>
      </p>
      <div>ur name:</div>
      <input
        className="px-2 py-1 ring-blue-300 ring-2 rounded-md w-full bg-gray-100"
        id="joincode"
        type="text"
        value={name}
        onChange={(e) => doNameStuff(e.target.value)}
      />
      <div>Current room (share this with friends!)</div>
      <pre>{roomId}</pre>
      <button
        className="bg-blue-300 px-2 py-1 rounded-md mt-2 hover:bg-blue-400"
        onClick={() => leaveRoom()}>
        Leave
      </button>
      <div className="h-6" />
      <div>
        <label htmlFor="joincode" className="block">
          Enter a room code
        </label>
        <input
          className="px-2 py-1 ring-blue-300 ring-2 rounded-md w-full bg-gray-100"
          id="joincode"
          type="text"
          value={enteredCode}
          onChange={(e) => setEnteredCode(e.target.value)}
        />
        <button
          className="bg-blue-300 px-2 py-1 rounded-md mt-2 hover:bg-blue-400"
          onClick={() => joinRoom()}>
          Join Room
        </button>
      </div>
    </div>
  )
}

export default Popup
