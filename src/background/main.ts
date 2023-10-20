import { onMessage } from 'webext-bridge/background'

import cctvBootstrap from './cctv'

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

onMessage<any>('cors-fetch', (params) => {
  const { url, type, ...restParams } = params.data
  return fetch(url, restParams).then((res) => {
    switch (type) {
      case 'json':
        return res.json()
      case 'buffer':
        return res.arrayBuffer()
      default:
        return res.text()
    }
  })
})

cctvBootstrap()
