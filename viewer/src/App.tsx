import React, { useState, useEffect } from 'react'
import { ImageCard } from './ImageCard'
import { Image, getImages } from './Data'
import styles from './App.module.css'

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const fetchedImages = await getImages()
      setImages(fetchedImages)
    }
    fetchData()
  }, [])

  return (
    <div>
      <div className={styles.intro}>
        <h1>Babylon Environments</h1>
        <p>
          <a href="https://www.babylonjs.com/">Babylon</a> can use equi-rectangular hdr images as a source for{' '}
          <a href="https://doc.babylonjs.com/how_to/use_hdr_environment">Image Based Lighting (IBL)</a>.
        </p>
        <p>
          One of the best sources for hdri images on the internet is <a href="https://hdrihaven.com/hdris/">hdrihaven.com</a>. But the
          problem is you need custom software to convert the <strong>.hdr</strong> images into a format babylon can handle. So to make this
          easier for you I created this homepage which hosts already converted <strong>.dds</strong> files for you.
        </p>
        <p>
          The <strong>.hdr</strong> files get downscaled into three different sizes. depending on what your download / performance / quality
          budgets are you will have to test the different files until you are satisfied.
        </p>
      </div>
      <div className="images-list">
        {images.map(image => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  )
}

export default App
