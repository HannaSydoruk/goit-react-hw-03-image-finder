import { Component } from 'react';
import css from './Loader.module.css';
import { Audio } from 'react-loader-spinner';

export default class Loader extends Component {
  render() {
    return (
      <div className={css.wrapper}>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }
}
