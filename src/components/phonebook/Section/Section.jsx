import PropTypes from 'prop-types';
import style from './Section.module.css'

export default function Section({title, children }) {
return (
  <>
        <section className={style.whoo}><h1>{title}</h1></section>{children}
  </>
);
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};