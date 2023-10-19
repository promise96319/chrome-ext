import { sendMessage } from 'webext-bridge/content-script'

type ResponseType = string | Record<string, any> | ArrayBuffer

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const corsFetch = <T extends ResponseType = string>(url: string, params?: any) => sendMessage<T>('cors-fetch', { url, ...params })

export const fetchBlob = async (url: string) => {
  const data = await corsFetch<ArrayBuffer>(url, { type: 'buffer' })

  return new Uint8Array(data)
}
