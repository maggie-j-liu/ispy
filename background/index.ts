let activeTabId, lastTabUrl, websocket

  const getCurrentTab = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    if (!tab || tab.url === lastTabUrl) {
      return { change: false }
    }
    lastTabUrl = tab.url
    console.log(tab)
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
