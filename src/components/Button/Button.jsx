import PropTypes from 'prop-types';
import { LoadMoreBtn } from './styled';

const Button = ({ handleSubmit }) => {
  return (
    <LoadMoreBtn onClick={() => handleSubmit()} type="button">
      Load more
    </LoadMoreBtn>
  );
};

export default Button;

Button.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
