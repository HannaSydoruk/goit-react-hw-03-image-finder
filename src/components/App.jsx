import { Component } from 'react';
import css from './App.module.css';
import * as Api from 'api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    images: null,
    largeImage: '',
    status: 'idle',
    searchValue: '',
    currentPage: 1,
    error: null,
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onSearchSubmit = async formData => {
    try {
      this.setState({ status: 'pending' });
      const data = await Api.getImages(formData.searchValue);
      const images = data.hits.map(hit => {
        return {
          id: hit.id,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        };
      });
      this.setState({
        images: images,
        searchValue: formData.searchValue,
        currentPage: 1,
        status: 'success',
      });
    } catch (error) {
      this.setState({ error: error.message, status: 'error' });
    }
  };

  onLoadMoreClick = async e => {
    try {
      this.setState({ status: 'pending' });
      const data = await Api.getImages(
        this.state.searchValue,
        this.state.currentPage + 1
      );
      const images = data.hits.map(hit => {
        return {
          id: hit.id,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        };
      });
      this.setState({
        images: [...this.state.images, ...images],
        currentPage: this.state.currentPage + 1,
        status: 'success',
      });
    } catch (error) {
      this.setState({ error: error.message, status: 'error' });
    }
  };

  onImageSelected = image => {
    this.setState({ largeImage: image, showModal: true });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSearchSubmit} />
        {this.state.status === 'error' && (
          <p>Something went wrong. {this.state.error}</p>
        )}
        {(this.state.status === 'success' ||
          this.state.status === 'pending') && (
          <ImageGallery
            images={this.state.images}
            onImageSelected={this.onImageSelected}
          />
        )}
        {this.state.status === 'pending' && <Loader />}
        {this.state.images?.length && (
          <Button onLoadMoreClick={this.onLoadMoreClick} />
        )}
        {this.state.showModal && (
          <Modal url={this.state.largeImage} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}
