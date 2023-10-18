<script setup lang="ts">
//@ts-expect-error
import { FFmpeg } from '@ffmpeg/ffmpeg'
//@ts-expect-error
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { getM3u8Url, getTsList } from './ffmpeg'
import 'uno.css'

const videoUrl = ref<string>('')

const url = "https://hls.cntv.kcdnvip.com/asp/hls/main/0303000a/3/default/4de48b81592d42a4bd024c2406eb70d8/main.m3u8?maxbr=2048"
const filename = 'output.mp4'

const loadFfmpeg = async () => {
  const ffmpeg = new FFmpeg()
  ffmpeg.on('log', ({ message }: any) => {
    console.log('[ffmpeg]: ', message);
  });

  const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.4/dist/esm";
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(
      `${baseURL}/ffmpeg-core.wasm`,
      "application/wasm"
    ),
    workerURL: await toBlobURL(
      `${baseURL}/ffmpeg-core.worker.js`,
      "text/javascript"
    ),
    // coreURL: chrome.runtime.getURL('vendor/ffmpeg-core.js'),
    // workerURL: chrome.runtime.getURL('vendor/ffmpeg-core.worker.js'),
    // wasmURL: chrome.runtime.getURL('vendor/ffmpeg-core.wasm'),
  })

  return ffmpeg
}


const downloadUrl = (url: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const download = async () => {
  const m3u8Url = await getM3u8Url(url)
  const tsList = await getTsList(m3u8Url)
  const ffmpeg = await loadFfmpeg()

  const inputPaths = [];
  for (const file of tsList) {
    const content = await fetchFile(file)
    const filename = file.split('/').pop() as string;
    ffmpeg.writeFile(filename, content);
    inputPaths.push(filename);
  }
  console.log('inputPaths', inputPaths);
  ffmpeg.on('progress', ({ progress }: any) => {
    console.log('[ffmpeg progress]: ', progress);
  })
  await ffmpeg.exec(['-i', `concat:${inputPaths.join('|')}`, '-c', 'copy', filename]);
  console.log('22', 22);
  const fileData = await ffmpeg.readFile(filename)
  const data = new Uint8Array(fileData as ArrayBuffer);
  videoUrl.value = URL.createObjectURL(
    new Blob([data.buffer], { type: 'video/mp4' })
  )


  await downloadUrl(videoUrl.value, filename)
}
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <div>hello wrold 2332</div>
    <video :src="videoUrl" controls />
    <button class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none" bg="teal-600 hover:teal-700"
      @click="download">
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </button>
  </div>
</template>
