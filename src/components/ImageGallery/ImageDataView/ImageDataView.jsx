import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../../Button';

import s from './ImageDataView.module.css';

export default function ImageDataView({ imagesArray, openModal, loadMore }) {
  return (
    <>
      <ul className={s.gallery}>
        {imagesArray.map(({ id, webformatURL, largeImageURL, tags }) => (
          <li key={id} className={s.galleryItem}>
            <ImageGalleryItem
              smallImg={webformatURL}
              largeImg={largeImageURL}
              alt={tags}
              openModal={openModal}
            />
          </li>
        ))}
      </ul>
      {imagesArray.length !== 0 && <Button loadMore={loadMore} />}
    </>
  );
}

ImageDataView.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};
