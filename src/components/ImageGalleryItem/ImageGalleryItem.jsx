import PropTypes from 'prop-types';
import { GalleryItem, ItemImg } from './styled';

const ImageGalleryItem = ({ id, onClick, src, alt }) => {
  return (
    <GalleryItem id={id} onClick={onClick}>
      <ItemImg src={src} alt={alt} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
