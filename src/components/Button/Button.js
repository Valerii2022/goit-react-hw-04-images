import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { LoadMoreBtn } from './styled';

class Button extends Component {
  handleBtnClick = () => {
    this.props.handleSubmit();
  };

  render() {
    return (
      <LoadMoreBtn onClick={this.handleBtnClick} type="button">
        Load more
      </LoadMoreBtn>
    );
  }
}

export default Button;

Button.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
