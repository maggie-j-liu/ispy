import { generateUsername } from "unique-username-generator"

export const getUsername = async () => {
  const storage = await chrome.storage.sync.get("username")
  if ("username" in storage) {
    return storage.username
  }
  const username = generateUsername()
  await chrome.storage.sync.set({ username })
  return username
}
