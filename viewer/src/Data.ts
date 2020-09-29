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

export const getImages = async (): Promise<Image[]> => {
  const result = await fetch('data/images.json')
  return result.json()
}
