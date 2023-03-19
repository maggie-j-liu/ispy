export const getMinimizePref = async () => {
  const storage = await chrome.storage.sync.get("minimize")
  if ("minimize" in storage) {
    return storage.minimize
  }
  await chrome.storage.sync.set({ minimize: false })
  return false
}
