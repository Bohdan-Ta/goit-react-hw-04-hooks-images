import React from 'react';

import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  smallImg,
  largeImg,
  alt,
  openModal,
}) {
  return (
    <img
      onClick={() => openModal(largeImg, alt)}
      className={s.image}
      src={smallImg}
      alt={alt}
    />
  );
}
