import PropTypes from 'prop-types';
import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import Button from '../Button/Button';
import Fetch from '../Fetch/Fetch'
import Modal from '../Modal/Modal'
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import swal from 'sweetalert';


export default class ImageGallery extends Component {
    static propTypes = {
        onNameChange: PropTypes.string,        
    }
    state = {
        images: [],
        page: 1,
        showModal: false,
        status: 'Idle',
        largeImageURL: '',
    }
    

    componentDidUpdate(prevProps, prevState) {          
        const prevName = prevProps.onNameChange;
        const nextName = this.props.onNameChange;        
        if (prevName !== nextName) {
            Fetch(nextName).then(data => {
                if (data.hits.length === 0) {
                    swal({
  title: "OMG!",
  text: "No results found!",
  icon: "error",
});
                }
                if (data.hits.length > 0) {                    
                    this.setState({ images: data.hits, status: 'Resolved' });                    
                }
            }).catch(error => this.setState({ status: 'Rejected' })).finally(() => {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                });
            });    
        }
      
        if (prevState.page !== this.state.page) {
            this.setState({ status: 'Pending' });
            Fetch(nextName, this.state.page).then(data => {
                this.setState(prev => ({
                    images: [...prev.images, ...data.hits],
                    status: 'Resolved',
                }));
            }).catch(error => this.setState({ status: 'Rejected' })).finally(() => {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                });
            });    
    }
    }
    
    onIncrementPage = (evt) => {         
        this.setState({ page: this.state.page + 1 });        
    }
    handleImageClick = image => {            
        this.setState({largeImageURL: image, showModal: true});
    }
    handleBackdropCLick = evt => {
        if (evt.target.tagName === 'SECTION') {
            this.setState({ showModal: false });
            return;
        }
        if (this.state.showModal === true) {
            document.addEventListener('keydown', evt => {
                if (evt.code === 'Escape') {
                    this.setState({ showModal: false });
                    return;
                }
            })
        }
        if (this.state.showModal === false) {
            document.removeEventListener('keydown');
        }
    }
    render() {
        const { largeImageURL, images, showModal, status } = this.state;
        return (
            <>
            <ul className={styles.galleryList}>
               <ImageGalleryItem images={images} byClick={this.handleImageClick} />  
                </ul>
                {status === 'Pending' && (
                    <div className={styles.loaderContainer}>
          <Loader type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
                            timeout={3000} />
                        </div>
                )}
        {(images.length > 0 || status === 'Resolved') && (
          <Button incrementPage={this.onIncrementPage} /> 
        )}                
                {showModal && <Modal image={largeImageURL} onBackdropClick={this.handleBackdropCLick}/>}
               
            </>
        );
    }
}