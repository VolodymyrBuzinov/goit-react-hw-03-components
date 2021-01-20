// import PropTypes from 'prop-types';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery';
export default class ImageSearch extends Component {    
    state = {
        name: '',               
    }

    handleFormSubmit = name => {        
        this.setState({ name });
    };      
    
    render() {
        const { name } = this.state;
        return (
            <>
                <Searchbar onFormSubmit={this.handleFormSubmit} />
                <ImageGallery onNameChange={name} />
            </>
        )
        
    }
}