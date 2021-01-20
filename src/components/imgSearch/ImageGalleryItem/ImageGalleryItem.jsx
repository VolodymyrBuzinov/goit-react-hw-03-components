// import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css'

export default function ImageGalleryItem({ images, byClick }) {    
    return (
        <>
            {images.map(image => {
                const { id, webformatURL} = image;
                return <li className={styles.galleryItem} key={id}>
                    <img src={webformatURL} alt="" onClick={byClick}/>
                </li>
            })}
        </>
    )
}