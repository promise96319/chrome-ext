<script setup lang="ts">
import 'uno.css'
import { sendMessage } from 'webext-bridge/content-script'
import { downloadUrl, log, transformM3u8oMp4 } from '~/util'

const download = async () => {
  const requestUrl = await sendMessage<string>('get-cctv-video-url', {})

  if (!requestUrl) {
    // eslint-disable-next-line no-alert
    alert('未找到视频连接，请确保视频已经在页面中加载')
    return
  }
  log('请求', requestUrl)

  const { title, hls_url: cctvUrl } = await fetch(requestUrl).then(res => res.json())
  log('链接', title, cctvUrl)

  const fileName = 'video.mp4'

  const mp4Url = await transformM3u8oMp4(cctvUrl, fileName)
  await downloadUrl(mp4Url, 'fileName')
}
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <button
      class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none" bg="teal-600 hover:teal-700"
      @click="download"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </button>
  </div>
</template>
