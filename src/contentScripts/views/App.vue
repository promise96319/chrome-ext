<script setup lang="ts">
import 'uno.css'
const load = async () => {
  // @ts-expect-error-next-line
  window.SharedArrayBuffer = ArrayBuffer
  // @ts-expect-error-next-line
  const { createFFmpeg, fetchFile } = FFmpeg
  const ffmpeg = createFFmpeg({
    log: true,
    corePath: chrome.runtime.getURL('vendor/ffmpeg-core.js'),
  })
  console.log('111', 111)
  await ffmpeg.load()

  console.log('222', 222)

  // // const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
  // // console.log('44', chrome.runtime.getURL('vendor/core.js'))

  // // toBlobURL is used to bypass CORS issue, urls with the same
  // // domain can be used directly.
  // await ffmpeg.load({
  //   // coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
  //   // wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  //   // coreURL: await toBlobURL(chrome.runtime.getURL('vendor/core.js'), 'text/javascript'),
  //   // wasmURL: await toBlobURL(chrome.runtime.getURL('vendor/core.wasm'), 'application/wasm'),
  //   coreURL: chrome.runtime.getURL('vendor/core.js'),
  //   // wasmURL: chrome.runtime.getURL('vendor/core.wasm'),
  // })

  // console.log('222', 222)
}
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <div>hello wrold</div>
    <button class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none" bg="teal-600 hover:teal-700"
      @click="load">
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </button>
  </div>
</template>
