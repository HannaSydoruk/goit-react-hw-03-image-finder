import { Component } from 'react';
import css from './App.module.css';
import * as Api from 'api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    images: null,
    status: 'idle',
    searchValue: '',
    currentPage: 1,
    error: null,
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
    });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSearchSubmit} />
        {this.state.status === 'pending' && <Loader />}
        {this.state.status === 'error' && (
          <p>Something went wrong. {this.state.error}</p>
        )}
        {this.state.status === 'success' && (
          <ImageGallery images={this.state.images} />
        )}
        {this.state.images?.length && (
          <Button onLoadMoreClick={this.onLoadMoreClick} />
        )}
      </div>
    );
  }
}
