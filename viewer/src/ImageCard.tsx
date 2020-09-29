import React from 'react'
import { Image } from './Data'
import styles from './ImageCard.module.css'

interface ImageCardProps {
  image: Image
}
export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={`${process.env.PUBLIC_URL}/data/${image.thumbPath}`}
        width="320"
        height="240"
        alt={image.name}
        loading="lazy"
      />
      <h4 className={styles.title}>
        <a href={image.hdriHeavenImageUrl}>{image.name}</a>
      </h4>
      <div className={styles.actions}>
        <a href={`${process.env.PUBLIC_URL}/data/${image.dds128Path}`} download>
          DDS 128
        </a>
        <a href={`${process.env.PUBLIC_URL}/data/${image.dds256Path}`} download>
          DDS 256
        </a>
        <a href={`${process.env.PUBLIC_URL}/data/${image.dds512Path}`} download>
          DDS 512
        </a>
      </div>
    </div>
  )
}
