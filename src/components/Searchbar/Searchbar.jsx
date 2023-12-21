import { Component } from 'react';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.onSubmit({
      searchValue: e.currentTarget.elements.searchValue.value,
    });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.onSubmitHandler} className={css.form}>
          <button type="submit" className={css.button}></button>

          <input
            className={css.input}
            type="text"
            name="searchValue"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
