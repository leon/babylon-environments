import { downloadAllScapedImages } from './hdriheaven'
import { convertAllToDDS } from './cubemapconverter'

const main = async () => {
  const images = await downloadAllScapedImages()

  // convert to dds
  await convertAllToDDS(images)
}

main().catch(console.error)
