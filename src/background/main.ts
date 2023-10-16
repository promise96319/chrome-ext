import { onMessage } from 'webext-bridge/background'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

// ==== 央视频系在 ====
let cctvVideoUrl: string

chrome.webRequest.onCompleted.addListener(
  (details) => {
    // 获取特定 URL 请求的条件，例如，以'http://example.com'开头的请求
    if (details.url.startsWith('https://vdn.apps.cntv.cn/api/getHttpVideoInfo.do'))
      cctvVideoUrl = details.url
  },
  { urls: ['<all_urls>'] }, // 监听所有 URL
)

onMessage<{ url: string }>('get-cctv-video-url', () => {
  console.log('cctvVideoUrl', cctvVideoUrl)

  return { url: cctvVideoUrl }
})
