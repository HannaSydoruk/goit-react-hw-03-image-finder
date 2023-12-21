import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  onImgClickHandler = e => {
    this.props.onImageSelected(this.props.largeImageURL);
  };

  render() {
    const url = this.props.url;

    return (
      <li className={css['gallery-item']}>
        <img
          className={css['gallery-item-image']}
          src={url}
          alt=""
          onClick={this.onImgClickHandler}
        />
      </li>
    );
  }
}
