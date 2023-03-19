import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"

import { getUid } from "~util/getUid"

import "./style.css"

const Popup = () => {
  const getIdFromStorage = async () => {
    const allstorage = await chrome.storage.sync.get(null)
    console.log(allstorage)
    const storage = await chrome.storage.sync.get("roomId")
    console.log(storage)
    if ("roomId" in storage) {
      return storage.roomId
    }
    return null
  }

  const [loading, setLoading] = useState(true)
  const [roomId, setRoomId] = useState<string>()
  const [enteredCode, setEnteredCode] = useState("")
  const socket = useRef<Socket>()

  useEffect(() => {
    socket.current = io("wss://HalfPoliticalMap.maggieliu1.repl.co")
    socket.current.on("connect", () => {
      console.log("sock id", socket.current.id)
      setLoading(false)
    })
    ;(async () => {
      const id = await getIdFromStorage()
      if (id) {
        setRoomId(id)
        socket.current.emit("joinRoom", { roomId: id, uid: await getUid() })
      }
    })()
  }, [])

  const createRoom = async () => {
    const id = crypto.randomUUID()
    await chrome.storage.sync.set({ roomId: id })
    console.log("set room id", id)
    const uid = await getUid()
    setRoomId(id)
    console.log("emit", uid, id)
    socket.current.emit("joinRoom", { roomId: id, uid })
  }

  const joinRoom = async () => {
    await chrome.storage.sync.set({ roomId: enteredCode })
    const uid = await getUid()
    socket.current.emit("joinRoom", { roomId: enteredCode, uid })
  }

  if (loading) {
    return null
  }
  if (roomId) {
    return (
      <div className="py-12 px-8">
        <div>Your room id (share this with friends!)</div>
        <pre>{roomId}</pre>
      </div>
    )
  }
  return (
    <div className="min-w-[20rem] py-12 px-8 text-base space-y-2">
      <p className="font-mono text-center text-2xl">
        i<span className="font-bold text-3xl">Spy</span>
      </p>
      <div className="flex align-center justify-center">
        <button
          className="font-mono mt-4 mx-auto bg-blue-500 bg-opacity-20 hover:scale-105 duration-300	 px-4 rounded-md py-1 text-center"
          onClick={() => createRoom()}>
          Create a Room
        </button>
      </div>
      {/* <div className="h-2 w-full bg-blue-400 bg-opacity-80 rounded-sm" /> */}
      <div className="pt-6">
        <input
          className="mt-6 px-2 py-1 ring-blue-300 ring-2 rounded-md w-full bg-gray-100"
          id="joincode"
          type="text"
          value={enteredCode}
          onChange={(e) => setEnteredCode(e.target.value)}
        />
        {/*<label htmlFor="joincode" className="text-center font-mono block"> Join Room
        </label>*/}
        <div className="flex align-center justify-center">
          <button
            className="mt-4 text-center 	p-2 font-mono rounded-lg bg-blue-500 bg-opacity-20 hover:scale-105 duration-300"
            onClick={() => joinRoom()}>
            Join Room
          </button>
        </div>
      </div>
    </div>
  )
}

export default Popup
