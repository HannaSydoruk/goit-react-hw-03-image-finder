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
    images: [],
    largeImage: '',
    status: 'idle',
    searchValue: '',
    currentPage: 1,
    error: null,
    showModal: false,
    total: 0,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  componentDidUpdate = async (_, prevState) => {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.currentPage !== this.state.currentPage
    ) {
      try {
        this.setState({ status: 'pending' });
        const data = await Api.getImages(
          this.state.searchValue,
          this.state.currentPage
        );
        const images = data.hits.map(hit => {
          return {
            id: hit.id,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          };
        });
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'success',
          total: data.total,
        }));
      } catch (error) {
        this.setState({ error: error.message, status: 'error' });
      }
    }
  };

  onSearchSubmit = async formData => {
    if (formData.searchValue.toLowerCase() === this.state.searchValue) {
      return alert('The query is the same. Change your query.');
    }
    this.setState({
      searchValue: formData.searchValue.toLowerCase(),
      images: [],
      currentPage: 1,
    });
  };

  onLoadMoreClick = async e => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
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
        {this.state.images?.length >= 12 &&
          this.state.images?.length < this.state.total && (
            <Button onLoadMoreClick={this.onLoadMoreClick} />
          )}
        {this.state.showModal && (
          <Modal url={this.state.largeImage} onClose={this.toggleModal} />
        )}
      </div>
    );
  }
}
