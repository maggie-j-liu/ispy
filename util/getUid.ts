export const getUid = async () => {
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
  return uid
}
