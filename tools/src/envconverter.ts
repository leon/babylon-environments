import fs from 'fs'
import { promisify } from 'util'
import { EnvironmentTextureTools, CubeTexture, NullEngine, Scene } from 'babylonjs'
const writeFile = promisify(fs.writeFile)
globalThis.XMLHttpRequest = require('xhr2')

export const convertDDSToENV = async (ddsPath: string, envPath: string): Promise<void> => {
  try {
    const engine = new NullEngine()
    const scene = new Scene(engine)
    const environmentTexture: CubeTexture = CubeTexture.CreateFromPrefilteredData(ddsPath, scene)

    const envTextureBuffer = await EnvironmentTextureTools.CreateEnvTextureAsync(environmentTexture)
    await writeFile(envPath, envTextureBuffer)
  } catch (error) {
    console.error(error)
  }
}
