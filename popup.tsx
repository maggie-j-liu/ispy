import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"

import { getAvatar } from "~util/getAvatar"
import { getRoomId } from "~util/getRoomId"
import { getUid } from "~util/getUid"
import { getUsername } from "~util/getUsername"

import "./style.css"

const Popup = () => {
  const [loading, setLoading] = useState(true)
  const [roomId, setRoomId] = useState<string>()
  const [enteredCode, setEnteredCode] = useState("")
  const [uid, setUid] = useState()
  const [username, setUsername] = useState<string>()
  const [avatar, setAvatar] = useState<string>()
  const [originalUsername, setOriginalUsername] = useState<string>()
  const socket = useRef<Socket>()

  useEffect(() => {
    socket.current = io("wss://ispy-server.maggieliu1.repl.co")
    socket.current.on("connect", () => {
      console.log("sock id", socket.current.id)
      setLoading(false)
    })
    ;(async () => {
      const [_roomId, _uid, _username] = await Promise.all([
        getRoomId(),
        getUid(),
        getUsername()
      ])
      const _avatar = await getAvatar(_uid)
      setRoomId(_roomId)
      setUid(_uid)
      setUsername(_username)
      setAvatar(_avatar)
      setOriginalUsername(_username)
      socket.current.emit("joinRoom", { roomId: _roomId, uid: _uid })
    })()
  }, [])

  const joinRoom = async () => {
    await chrome.storage.sync.set({ roomId: enteredCode })
    socket.current.emit("joinRoom", { roomId: enteredCode, uid })
    setRoomId(enteredCode)
    setEnteredCode("")
  }

  const leaveRoom = async () => {
    const id = crypto.randomUUID()
    await chrome.storage.sync.set({ roomId: id })
    socket.current.emit("joinRoom", { roomId: id, uid })
    setRoomId(id)
  }

  const changeUsername = async () => {
    await chrome.storage.sync.set({ username })
    setOriginalUsername(username)
    socket.current.emit("setUsername", { uid, username })
    setOriginalUsername(username)
  }

  return (
    <div className="w-[25rem] h-[28rem] relative">
      <AnimatePresence initial={false}>
        <motion.div
          key={loading ? "loading" : "loaded"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.15, delay: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}>
          {loading ? (
            <div className="text-7xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="">
                👀
                <p className="font-mono text-center text-2xl">
                  i<span className="font-bold text-3xl">Spy</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="w-[25rem] min-h-[28rem] py-12 px-8 text-base">
              <p className="font-mono text-center text-2xl">
                i<span className="font-bold text-3xl">Spy</span>
              </p>
              <br />

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
              <div className="h-6" />
              <hr />
              <div className="h-6" />
              <div className="flex gap-2">
                <img
                  className="w-9 h-9 rounded-full overflow-hidden"
                  src={avatar}
                />
                <input
                  type="text"
                  className="ring-gray-200 ring-1 rounded-md bg-gray-100 px-2 py-1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button
                  onClick={() => changeUsername()}
                  disabled={originalUsername === username}
                  className="enabled:hover:bg-blue-300 disabled:saturate-0 disabled:cursor-not-allowed px-4 rounded-md bg-blue-200">
                  Save
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Popup
