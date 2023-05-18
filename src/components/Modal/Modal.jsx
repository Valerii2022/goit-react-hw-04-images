import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ImgModal } from './styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ url, openModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        openModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openModal]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      openModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ImgModal>
        <img src={url} alt="" />
      </ImgModal>
    </Overlay>,
    modalRoot
  );
};

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.openModal();
//     }
//   };

//   handleBackdropClick = event => {
//     if (event.currentTarget === event.target) {
//       this.props.openModal();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ImgModal>
//           <img src={this.props.url} alt="" />
//         </ImgModal>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

export default Modal;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
