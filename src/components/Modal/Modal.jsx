import css from './Modal.module.css';
import { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  handleEscapeKey = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const url = this.props.url;
    return (
      <div className={css.overlay} onClick={this.onOverlayClick}>
        <div className={css.modal}>
          <img src={url} alt="" />
        </div>
      </div>
    );
  }
}
