/// <reference types="react-scripts" />

import React from 'react'

// extend react with new loading attribute
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy'
  }
}
