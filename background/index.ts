export {}

let activeTabId, lastTabUrl, websocket

const getCurrentTab = async () => {
  console.log("getcurrentTab")
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  })
  lastTabUrl = tab.url
  console.log(tab.id)
  chrome.tabs.sendMessage(tab.id, tab.url)
  return { tab, change: true }
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  activeTabId = activeInfo.tabId
  getCurrentTab()
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (activeTabId === tabId) {
    getCurrentTab()
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message received", message, sender.tab.id)
  if (message === "getCurrentUrl") {
    getCurrentTab()
  }
})
