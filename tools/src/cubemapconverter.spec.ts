import fs from 'fs'
import path from 'path'
import { convertToDDS, convertImage } from './cubemapconverter'
import { DATA_ROOT } from './interfaces'

describe('CubeMap Converter', () => {
  it('should convert cubemap', async () => {
    const hdrFile = path.join(DATA_ROOT, 'hdr', 'abandoned_church_4k.hdr')
    const ddsOutputFile = path.join(DATA_ROOT, 'dds', 'abandoned_church_4k_256.dds')
    await convertToDDS(hdrFile, ddsOutputFile)
    expect(fs.existsSync(ddsOutputFile)).toBeTruthy()
  })

  it('should convert a image into 128, 256, 512 dds images', async () => {
    const image = {
      id: 'urban_street_04',
      name: 'Urban Street 04',
      hdriHeavenImageUrl: 'https://hdrihaven.com/hdri/?h=urban_street_04',
      hdr4kUrl: 'https://hdrihaven.com/files/hdris/urban_street_04_4k.hdr',
      thumbPath: 'thumb/urban_street_04.jpg',
      hdrPath: 'hdr/urban_street_04_4k.hdr',
      dds128Path: 'dds/urban_street_04_128.dds',
      dds256Path: 'dds/urban_street_04_256.dds',
      dds512Path: 'dds/urban_street_04_512.dds',
    }
    await convertImage(image)
  })
})
