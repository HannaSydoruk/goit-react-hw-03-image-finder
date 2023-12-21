import { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    const images = this.props.images;
    return (
      <ul className={css.gallery}>
        {images?.map(image => (
          <ImageGalleryItem
            key={image.id}
            url={image.smallImage}
            largeImageURL={image.largeImage}
            onImageSelected={this.props.onImageSelected}
          />
        ))}
      </ul>
    );
  }
}
