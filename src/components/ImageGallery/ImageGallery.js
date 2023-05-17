import PropTypes from 'prop-types';
import { Gallery } from './styled';
import Modal from '../Modal';
import { useState } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ cards }) => {
  const [url, setUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const addModalUrl = e => {
    const modalUrl = cards.filter(card => {
      return Number(card.id) === Number(e.currentTarget.id);
    });
    setUrl(modalUrl[0].largeImageURL);
    setOpenModal(true);
  };

  const handleOpenModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Gallery>
        {cards.map(({ id, webformatURL, tags }) => {
          return (
            <ImageGalleryItem
              id={id}
              key={id}
              onClick={addModalUrl}
              src={webformatURL}
              alt={tags}
            />
          );
        })}
      </Gallery>
      {openModal && <Modal url={url} openModal={handleOpenModal} />}
    </>
  );
};

// class ImageGallery extends Component {
//   state = {
//     url: '',
//     openModal: false,
//   };

//   addModalUrl = e => {
//     const modalUrl = this.props.cards.filter(card => {
//       return Number(card.id) === Number(e.currentTarget.id);
//     });
//     this.setState({
//       url: modalUrl[0].largeImageURL,
//       openModal: true,
//     });
//   };

//   handleOpenModal = () => {
//     this.setState({
//       openModal: false,
//     });
//   };

//   render() {
//     return (
//       <>
//         <Gallery>
//           {this.props.cards.map(({ id, webformatURL, tags }) => {
//             return (
//               <ImageGalleryItem
//                 id={id}
//                 key={id}
//                 onClick={this.addModalUrl}
//                 src={webformatURL}
//                 alt={tags}
//               />
//             );
//           })}
//         </Gallery>
//         {this.state.openModal && (
//           <Modal url={this.state.url} openModal={this.handleOpenModal} />
//         )}
//       </>
//     );
//   }
// }

export default ImageGallery;

ImageGallery.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
};
