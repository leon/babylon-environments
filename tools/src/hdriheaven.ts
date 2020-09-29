import util from 'util'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
import { Image, DATA_ROOT } from './interfaces'
const streamPipeline = util.promisify(require('stream').pipeline)
const writeFile = util.promisify(fs.writeFile)

export interface HDRIHeavenImage {
  id: string
  name: string
  hdriHeavenImageUrl: string
  thumbUrl: string
  hdr4kUrl: string
}

export const scrapeHDRImages = async (): Promise<HDRIHeavenImage[]> => {
  const response = await fetch('https://hdrihaven.com/hdris/?c=all')
  const html: string = await response.text()
  const $ = cheerio.load(html)

  const aLinks = $('#item-grid').children('a')

  const images = aLinks
    .map((i, el) => {
      const link$ = $(el)

      const url = link$.attr('href')
      const id = url.replace('/hdri/?h=', '')
      const name = link$.find('.title-line > h3').text()
      const thumbUrl = `https://hdrihaven.com${link$.find('img.thumbnail').attr('data-src')}`
      const hdr4kUrl = `https://hdrihaven.com/files/hdris/${id}_4k.hdr`
      const image = {
        id,
        name,
        hdriHeavenImageUrl: `https://hdrihaven.com${url}`,
        thumbUrl,
        hdr4kUrl,
      }

      return image
    })
    .get()

  // save json data to data dir
  await saveJSON(images, path.join(DATA_ROOT, 'hdriheaven.json'))

  return images
}

export const download = async (url: string, destPath: string): Promise<void> => {
  if (fs.existsSync(destPath)) {
    console.log(`${destPath} already downloaded`)
    return
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`)
  }

  await streamPipeline(response.body, fs.createWriteStream(destPath))

  console.log(`download complete, ${url}`)
}

export const saveJSON = async (data: any, destPath: string) => {
  const jsonData = JSON.stringify(data, null, 2)
  await writeFile(destPath, jsonData)
}

export const downloadScrapedImage = async (scrapedImage: HDRIHeavenImage): Promise<Image> => {
  const image: Image = {
    id: scrapedImage.id,
    name: scrapedImage.name,
    hdriHeavenImageUrl: scrapedImage.hdriHeavenImageUrl,
    hdr4kUrl: scrapedImage.hdr4kUrl,
    thumbPath: `thumb/${scrapedImage.id}.jpg`,
    hdrPath: `hdr/${scrapedImage.id}_4k.hdr`,
    // create these paths here so they get stored in the json
    dds128Path: `dds/${scrapedImage.id}_128.dds`,
    dds256Path: `dds/${scrapedImage.id}_256.dds`,
    dds512Path: `dds/${scrapedImage.id}_512.dds`,
  }

  try {
    // download thumbnail
    await download(scrapedImage.thumbUrl, path.join(DATA_ROOT, image.thumbPath))

    // download 4k
    await download(scrapedImage.hdr4kUrl, path.join(DATA_ROOT, image.hdrPath))
  } catch (error) {
    console.error(`could not download: ${image.id}`, error)
    return null
  }

  return image
}

export const downloadAllScapedImages = async (): Promise<Image[]> => {
  let images = await scrapeHDRImages()
  let downloadedImages = []
  for (const image of images) {
    const downloadedImage = await downloadScrapedImage(image)
    if (downloadedImage) {
      downloadedImages.push(downloadedImage)
    }
  }

  // save json data to data dir
  await saveJSON(downloadedImages, path.join(DATA_ROOT, 'images.json'))

  return downloadedImages
}
