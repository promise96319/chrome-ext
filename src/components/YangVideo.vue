<!-- eslint-disable -->

<script setup lang="ts">
// import { FFmpeg } from '@ffmpeg/ffmpeg'

// const ffmpeg = new FFmpeg()

// 用 a 标签下载 buffer 数据
const download = (data: Uint8Array, filename: string) => {
  const blob = new Blob([data], { type: 'video/mp4' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const handleDownload = async () => {
  // console.log('1', 1)
  // try {
  //   await ffmpeg.load()
  // }
  // catch (err) {
  //   console.log('err', err)
  // }
  // console.log('2', 2)
  // await ffmpeg.exec(['-i', 'http://1257120875.vod2.myqcloud.com/0ef121cdvodtransgzp1257120875/3055695e5285890780828799271/v.f230.m3u8', '-c', 'copy', 'output.mp4'])
  // console.log('3', 3)
  // const data = await ffmpeg.readFile('output.mp4')

  // download(data.buffer, 'output.mp4')
  // const { url } = await sendMessage<{ url: string }>('get-cctv-video-url', {}, 'background')

  // if (!url) {
  //   alert('获取视频地址失败')
  //   return
  // }

  // const res = await fetch(url).then(res => res.json())
  // const m3u8Url = res.data.hls_url

  // const video = ffmpeg({
  //   arguments: [
  //     // '-i', m3u8Url,
  //     '-i', 'http://1257120875.vod2.myqcloud.com/0ef121cdvodtransgzp1257120875/3055695e5285890780828799271/v.f230.m3u8',
  //     '-c', 'copy',
  //     'cctv-video.mp4',
  //   ],
  // })

  // const data = video.MEMFS[0]

  // console.log('videoBuffer', data)

  // m3u8 download
}
</script>

<template>
  <button @click="handleDownload">
    央视频下载
  </button>
</template>
