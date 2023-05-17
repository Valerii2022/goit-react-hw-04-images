import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Header, Form, SearchFormBtn, SearchFormInput } from './styled';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

class Searchbar extends Component {
  state = {
    query: '',
    pageNumber: 1,
  };

  addQueryName = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.query);
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmitForm}>
          <SearchFormBtn type="submit" disabled={!this.state.query}>
            <SearchIcon width="30" height="30" />
          </SearchFormBtn>

          <SearchFormInput
            value={this.state.query}
            onChange={this.addQueryName}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
