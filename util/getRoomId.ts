export const getRoomId = async () => {
  const storage = await chrome.storage.sync.get("roomId")
  if ("roomId" in storage) {
    return storage.roomId
  }
  const id = crypto.randomUUID()
  await chrome.storage.sync.set({ roomId: id })
  return id
}
