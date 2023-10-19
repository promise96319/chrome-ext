import { onMessage } from 'webext-bridge/background'

const cctvUrl: Record<number, string> = {}

export default () => {
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      if (details.url.startsWith('https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do'))
        cctvUrl[details.tabId] = details.url
    },
    { urls: ['<all_urls>'] },
    [],
  )

  onMessage('get-cctv-video-url', async () => {
    const queryOptions = { active: true, lastFocusedWindow: true }
    const [tab] = await chrome.tabs.query(queryOptions)

    if (!tab || !tab.id)
      return

    return cctvUrl[tab.id]
  })
}
