import PropTypes from 'prop-types';
import style from './Button.module.css'

export default function Button({incrementPage}) {
    return (
        <div className={style.buttonMoreContainer}>
            <button className={style.buttonMore} onClick={incrementPage}>Загрузить еще</button>
        </div>
    )
}

Button.propTypes = {
    incrementPage: PropTypes.func,
}