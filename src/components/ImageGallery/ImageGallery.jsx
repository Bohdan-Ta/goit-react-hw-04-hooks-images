import { Component } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { fetchAPI } from '../../servises/getApi';
import ImageDataView from './ImageDataView';
import Spinner from '../Loader';

import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    imagesArray: [],
    page: 1,
    status: Status.IDLE,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({ imagesArray: [] });
    }

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      try {
        const { hits, totalHits } = await fetchAPI(nextName, nextPage);

        if (hits.length === 0 && totalHits === 0) {
          return toast.info('Try to input next name... ');
        }
        if (hits.length === 0 && totalHits !== 0) {
          return toast.info('Nothing more found');
        }

        this.setState(({ imagesArray }) => ({
          imagesArray: [...imagesArray, ...hits],
          status: Status.RESOLVED,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  }

  updatePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { imagesArray, status } = this.state;
    const { openModal } = this.props;

    return (
      <>
        {status === 'idle' && (
          <h1 className={s.title}>What do you want to see?</h1>
        )}

        {status === 'pending' && <Spinner />}

        {(status === 'resolved' || status === 'pending') && (
          <ImageDataView
            imagesArray={imagesArray}
            openModal={openModal}
            loadMore={this.updatePage}
          />
        )}

        {status === 'rejected' &&
          toast.error('We are sorry but something went wrong')}
      </>
    );
  }
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
