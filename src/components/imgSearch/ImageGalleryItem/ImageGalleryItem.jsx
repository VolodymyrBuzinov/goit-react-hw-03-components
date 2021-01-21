import PropTypes, { object } from 'prop-types';
import styles from './ImageGalleryItem.module.css'

export default function ImageGalleryItem({ images, byClick }) {    
    return (
        <>
            {images.map(image => {
                const { id, webformatURL, largeImageURL} = image;
                return <li className={styles.galleryItem} key={id}>
                    <img src={webformatURL} alt="" onClick={() => byClick(largeImageURL)}/>
                </li>
            })}
        </>
    )
}


ImageGalleryItem.propTypes = {
    images: PropTypes.arrayOf(object).isRequired,
    byClick: PropTypes.func
}