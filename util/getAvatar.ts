export const getAvatar = async (uid) => {
  const storage = await chrome.storage.sync.get("avatar")
  if ("avatar" in storage) {
    return storage.avatar
  }
  const avatar = `https://source.boringavatars.com/beam/36/${uid}`
  await chrome.storage.sync.set({ avatar })
  return avatar
}
