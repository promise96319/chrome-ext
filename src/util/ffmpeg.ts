import { FFmpeg } from '@ffmpeg/ffmpeg'
import { log } from '~/util'

const ffmpeg = new FFmpeg()

export const loadFfmpeg = async () => {
  if (ffmpeg.loaded)
    return ffmpeg

  ffmpeg.on('log', ({ message }: any) => {
    // eslint-disable-next-line no-console
    console.log('[ffmpeg message]: ', message)
  })

  ffmpeg.on('progress', ({ progress }: any) => {
    // eslint-disable-next-line no-console
    console.log('[ffmpeg progress]: ', progress)
  })

  log('begin loading ffmpeg...')

  await ffmpeg.load({
    coreURL: chrome.runtime.getURL('vendor/ffmpeg-core.js'),
    workerURL: chrome.runtime.getURL('vendor/ffmpeg-core.worker.js'),
    wasmURL: chrome.runtime.getURL('vendor/ffmpeg-core.wasm'),

  })

  log('ffmpeg loaded！')

  return ffmpeg
}
