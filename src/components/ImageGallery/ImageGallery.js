import PropTypes from 'prop-types';
import { Gallery } from './styled';
import Modal from '../Modal';
import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    url: '',
    openModal: false,
  };

  addModalUrl = e => {
    const modalUrl = this.props.cards.filter(card => {
      return Number(card.id) === Number(e.currentTarget.id);
    });
    this.setState({
      url: modalUrl[0].largeImageURL,
      openModal: true,
    });
  };

  handleOpenModal = () => {
    this.setState({
      openModal: false,
    });
  };

  render() {
    return (
      <>
        <Gallery>
          {this.props.cards.map(({ id, webformatURL, tags }) => {
            return (
              <ImageGalleryItem
                id={id}
                key={id}
                onClick={this.addModalUrl}
                src={webformatURL}
                alt={tags}
              />
            );
          })}
        </Gallery>
        {this.state.openModal && (
          <Modal url={this.state.url} openModal={this.handleOpenModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
};
