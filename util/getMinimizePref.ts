export const getMinimizePref = async () => {
  const storage = await chrome.storage.sync.get("minimize")
  if ("minimize" in storage) {
    console.log("pref from storage", storage.minimize)
    return storage.minimize
  }
  await chrome.storage.sync.set({ minimize: false })
  return false
}
