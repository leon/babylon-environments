import { promisify } from 'util'
import path from 'path'
import fs from 'fs'
import child_process from 'child_process'
import { Image, DATA_ROOT } from './interfaces'
const exec = promisify(child_process.exec)

const CMFT_PATH = process.env.CMFT_PATH || '/usr/local/opt/cmft'

/**
 * Converts a hdr image into a DDS which can then be converted to the babylonjs .env format
 *
 * @param hdrPath the full path to the HDR image
 * @param destPath the destination path of the dds image without the extension
 * @param resolution the resolution of the resulting dds file
 */
export const convertToDDS = async (hdrPath: string, destPath: string, resolution: '128' | '256' | '512' = '256'): Promise<void> => {
  if (fs.existsSync(destPath)) {
    console.log(`${destPath} already converted`)
    return
  }

  try {
    const result = await exec(`
      ${CMFT_PATH} \
      --input "${hdrPath}" \
      --dstFaceSize ${resolution} \
      --output0params dds,rgba16f,cubemap \
      --generateMipChain true \
      --output0 "${destPath.replace('.dds', '')}"
    `)

    console.log(result.stdout)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Converts a HDR image into multiple resolutions for optimized download
 * @param image the image DTO to convert
 */
export const convertImage = async (image: Image) => {
  await convertToDDS(path.join(DATA_ROOT, image.hdrPath), path.join(DATA_ROOT, image.dds128Path), '128')
  await convertToDDS(path.join(DATA_ROOT, image.hdrPath), path.join(DATA_ROOT, image.dds256Path), '256')
  await convertToDDS(path.join(DATA_ROOT, image.hdrPath), path.join(DATA_ROOT, image.dds512Path), '512')
}

export const convertAllToDDS = async (images: Image[]) => {
  for (const image of images) {
    await convertImage(image)
  }
}
