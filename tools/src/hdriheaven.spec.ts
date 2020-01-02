import fs from 'fs'
import { scrapeHDRImages, download, downloadScrapedImage } from './hdriheaven'

describe('HDRI Heaven', () => {
  it('should fetch all hdris', async () => {
    const images = await scrapeHDRImages()
    expect(images).toBeDefined()
    expect(images.length).toBeGreaterThan(0)
    expect(images).toMatchSnapshot()
  })

  it('should download something', async () => {
    const url = 'https://hdrihaven.com/files/hdri_images/thumbnails/urban_street_04.jpg'
    const tmpFile = 'tmp/file.jpg'
    try {
      await fs.mkdirSync('tmp')
    } catch {}
    try {
      await fs.unlinkSync(tmpFile)
    } catch {}

    await download(url, tmpFile)

    expect(fs.existsSync(tmpFile)).toBeTruthy()
  })

  it('should download everything for a hdri image', async () => {
    const image = {
      id: 'urban_street_04',
      name: 'Urban Street 04',
      hdriHeavenImageUrl: 'https://hdrihaven.com/hdri/?h=urban_street_04',
      thumbUrl: 'https://hdrihaven.com/files/hdri_images/thumbnails/urban_street_04.jpg',
      hdr4kUrl: 'https://hdrihaven.com/files/hdris/urban_street_04_4k.hdr',
    }

    try {
      await downloadScrapedImage(image)
    } catch (error) {
      console.error(`failed to download ${image.id}`, error)
    }
  })
})
