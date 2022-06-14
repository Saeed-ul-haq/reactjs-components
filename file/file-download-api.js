import { download } from 'libs/fetch'
import { getNamespace2 } from 'libs/utils/helpers'

export async function downloadFile(url, fileName, wsId) {
  const _path = `${PRODUCT_APP_URL_API}/meerafs/rest${url}?namespace=${getNamespace2(
    wsId,
  )}&workspace=${wsId}`
  let { blobURL } = await download(_path)
  var a = document.createElement('a')
  a.href = blobURL
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}



export async function download(url) {
  // We have to call fetch directly, as the shared utils in libs/fetch do not handle non-json responses
  const res = await fetchGeneric(url, { method: 'GET' })
  const blob = await res.blob()
  return {
    response: res,
    ok: res.ok,
    blobURL: URL.createObjectURL(blob),
    blob: blob,
  }
}