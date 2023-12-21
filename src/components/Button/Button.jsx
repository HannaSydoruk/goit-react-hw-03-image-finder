import { Component } from 'react';
import css from './Button.module.css';

export default class Button extends Component {
  render() {
    const onLoadMoreClick = this.props.onLoadMoreClick;
    return (
      <button
        type="button"
        className={css['load-more-btn']}
        onClick={onLoadMoreClick}
      >
        Load more
      </button>
    );
  }
}
