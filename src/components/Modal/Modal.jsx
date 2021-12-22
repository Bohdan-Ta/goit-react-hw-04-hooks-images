import { Component } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector(`#modal-root`);

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendleKeyDown);
  }

  hendleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props.modalPicture;
    return createPortal(
      <div className={s.overlay} onClick={this.hendleBackdropClick}>
        <div className={s.modal}>
          <img src={src} alt={alt}></img>
        </div>
      </div>,
      modalRoot,
    );
  }
}
