// import PropTypes from 'prop-types';
import style from './Modal.module.css'
export default function Modal({images}) {
    return (
        <>
            {images.map(image => {
                const { largeImageURL } = image;
                return <section className={style.backdrop}>
                <div className={style.backdropInner}>
                        <img src={largeImageURL} alt="backdropImage"/>
                </div>
            </section>
            })}            
        </>
    )
}