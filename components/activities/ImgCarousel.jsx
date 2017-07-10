import React, { Component } from 'react';
import Lightbox from 'react-images';
import PropTypes from 'prop-types';


class ImgCarousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.onImageClick = this.onImageClick.bind(this)
  }

  onImageClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation()
  }

  openLightbox (index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  gotoImage (index) {
    this.setState({
      currentImage: index,
    });
  }
  handleClickImage () {
    if (this.state.currentImage === this.props.images.length - 1) return;
    this.gotoNext();
  }


  renderGallery () {
    const { images } = this.props;
    if (!images) return;

    const gallery = images.map((obj, i) => {
      return (
        <a
          href={obj.src}
          className='img-wrapper'
          key={i}
          onClick={(e) => this.openLightbox(i, e)}
        >
          <img src={obj.src} className='img-source' />
        </a>
      );
    });

    return (
      <div className='imgGalleryContainer' onClick={(e) => this.onImageClick(e)}>
        {gallery}
      </div>
    );
  }


  render() {
      return (
        <div className="section" >
          {this.renderGallery()}
          <Lightbox
            currentImage={this.state.currentImage}
            images={this.props.images}
            onClickImage={this.handleClickImage}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevious}
            onClickThumbnail={this.gotoImage}
            showThumbnails={this.props.showThumbnails}
            onClickNext={this.gotoNext}
            onClose={this.closeLightbox}
          />
      </div>
      )
    }
}

ImgCarousel.displayName = 'ImgCarousel';
ImgCarousel.propTypes = {
  images: PropTypes.array,
  showThumbnails: PropTypes.bool,
};

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}


export default ImgCarousel
