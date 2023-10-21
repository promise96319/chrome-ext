<script setup lang="ts">
import 'uno.css'
import { sendMessage } from 'webext-bridge/content-script'
import { downloadUrl, log, transformM3u8oMp4 } from '~/util'

const loading = ref<boolean>(false)
const isCctvWebsite = globalThis.location?.href.startsWith('https://v.cctv.com')

const download = async () => {
  const requestUrl = await sendMessage<string>('get-cctv-video-url', {})

  if (!requestUrl) {
    // eslint-disable-next-line no-alert
    alert('未找到视频连接，请确保视频已经在页面中加载')
    return
  }
  log('请求', requestUrl)

  loading.value = true
  const { title, hls_url: cctvUrl } = await fetch(requestUrl).then(res => res.json())
  log('链接', title, cctvUrl)

  const mp4Url = await transformM3u8oMp4(cctvUrl)
  await downloadUrl(mp4Url, `${title}.mp4`)

  loading.value = false
}
</script>

<template>
  <div v-if="isCctvWebsite" class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <button
      class="flex items-center justify-center w-64px h-64px rounded-full shadow cursor-pointer border-none"
      bg="teal-600 hover:teal-700" @click="download"
    >
      <ant-design-loading-outlined v-if="loading" class="block m-auto text-white text-32px animate-rotate" />
      <ant-design-download-outlined v-else class="block m-auto text-white text-32px" />
    </button>
  </div>
</template>
