import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Sections from '../Section/Section';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';

import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    showModal: false,
    searchValue: '',
    modalPicture: {
      src: '',
      alt: '',
    },
  };

  getNameImage = searchValue => {
    this.setState({ searchValue });
  };

  toggleModal = (src, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalPicture: {
        src,
        alt,
      },
    }));
  };

  render() {
    const { searchValue, showModal, modalPicture } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.getNameImage} />
        <Sections>
          <ImageGallery imageName={searchValue} openModal={this.toggleModal} />
        </Sections>
        {showModal && (
          <Modal onClose={this.toggleModal} modalPicture={modalPicture} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
