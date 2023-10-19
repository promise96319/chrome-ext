import { fetchFile } from '@ffmpeg/util'
import { loadFfmpeg } from './ffmpeg'
import { corsFetch as fetch } from './fetch'
import { log } from '~/util'

export const getOrigin = (url: string) => {
  return new URL(url).origin
}

export const getM3u8Url = async (url: string) => {
  const m3u8 = await fetch(url)
  const origin = getOrigin(url)
  const m3u8Path = m3u8.split('\n').reverse().find(item => item.endsWith('.m3u8'))
  return m3u8Path ? `${origin}${m3u8Path}` : ''
}

export const getTsList = async (m3u8Url: string) => {
  const tsFile = await fetch(m3u8Url)
  const urlPath = m3u8Url.split('/').slice(0, -1).join('/')
  return tsFile.split('\n').filter(file => file.endsWith('.ts')).map(file => `${urlPath}/${file}`)
}

export const transformM3u8oMp4 = async (url: string, fileName = 'output.mp4') => {
  const m3u8Url = await getM3u8Url(url)
  const tsList = await getTsList(m3u8Url)
  const ffmpeg = await loadFfmpeg()

  const inputPaths = []
  for (const file of tsList) {
    const content = await fetchFile(file)
    const filename = file.split('/').pop() as string
    ffmpeg.writeFile(filename, content)
    inputPaths.push(filename)
  }

  log('begin transforming...')
  await ffmpeg.exec(['-i', `concat:${inputPaths.join('|')}`, '-c', 'copy', fileName])
  log('transform completed！')

  const fileData = await ffmpeg.readFile(fileName)
  const data = new Uint8Array(fileData as ArrayBuffer)

  return URL.createObjectURL(
    new Blob([data.buffer], { type: 'video/mp4' }),
  )
}
