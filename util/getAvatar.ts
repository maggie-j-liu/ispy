export const getAvatar = async (uid) => {
  const storage = await chrome.storage.sync.get("avatar")
  if ("avatar" in storage) {
    return storage.avatar
  }
  return `https://source.boringavatars.com/beam/36/${uid}`
}
