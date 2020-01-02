import path from 'path'

export const DATA_ROOT = path.resolve(__dirname, '../../build/data')

export interface Image {
  id: string
  name: string
  hdriHeavenImageUrl: string
  hdr4kUrl?: string
  thumbPath?: string
  hdrPath?: string
  dds128Path?: string
  dds256Path?: string
  dds512Path?: string
}
