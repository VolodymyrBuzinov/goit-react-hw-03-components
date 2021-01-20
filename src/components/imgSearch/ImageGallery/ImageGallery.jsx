// import PropTypes from 'prop-types';
import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import Button from '../Button/Button';
import Fetch from '../Fetch/Fetch'
import Modal from '../Modal/Modal'
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default class ImageGallery extends Component {
    state = {
        images: [],
        page: 1,
        showModal: false,
        status: 'idle',
    }
    

    componentDidUpdate(prevProps, prevState) {          
        const prevName = prevProps.onNameChange;
        const nextName = this.props.onNameChange;        
        if (prevName !== nextName) {
            Fetch(nextName).then(data => {                
                if (data.hits.length > 0) {                    
                    this.setState({ images: data.hits });
                }
            })
        }
      
        if (prevState.page !== this.state.page) {
            Fetch(nextName, this.state.page).then(data => {
                this.setState(prev => ({
                    images: [...prev.images, ...data.hits],
                }));
            }).finally(() => {
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
    handleImageClick = evt => { 
        console.log(evt.target);
        this.setState({ showModal: true });        
    }
    render() {       
        return (
            <ul className={styles.galleryList}>
                <ImageGalleryItem images={this.state.images} byClick={this.handleImageClick}/>
                <Button incrementPage={this.onIncrementPage} />          
                              
                {/* <Loader type="Puff"
        color="#00BFFF"
        height={50}
        width={50}
        timeout={3000}/> */}
            </ul>
        );
    }
}