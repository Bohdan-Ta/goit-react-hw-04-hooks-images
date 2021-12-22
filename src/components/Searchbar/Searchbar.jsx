import { Component } from 'react';
import PropTypes from 'prop-types';

import { BsFillBinocularsFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handleOnChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { value } = this.state;

    if (value.trim() === '') {
      return toast.info('Please input name image......');
    }

    onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.handleOnSubmit}>
          <input
            className={s.searchFormInput}
            onChange={this.handleOnChange}
            value={value}
            type="text"
            autoComplete="off"
            placeholder="Search images ......."
          />
          <button type="submit" className={s.searchFormButton}>
            <BsFillBinocularsFill
              style={{ width: '30', fill: '#3f51b5', height: '30' }}
            />
          </button>
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
