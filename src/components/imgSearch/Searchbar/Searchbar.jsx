import PropTypes from 'prop-types';
import { Component } from 'react';
import swal from 'sweetalert';
import style from './Searchbar.module.css'
export default class Searchbar extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func,
  }
  state = {
    name: '',
  }
  formSubmit = evt => {
    evt.preventDefault();
    if (this.state.name.trim() === '') { 
      swal({
  title: "Wow!",
  text: "You forgot to write something!",
  icon: "error",
});
      return;
    }
    this.props.onFormSubmit(this.state.name);     
      
  }
  
  inputChange = evt => {    
    this.setState({name: evt.target.value.toLowerCase()});
  }
  
  render() {   
    const { header, form, button, input } = style;
    return (
      <header className={header}>
  <form className={form} onSubmit={this.formSubmit}>
    <button type="submit" className={button}>
            <span>Search</span>
    </button>
    <input
      className={input}
      type="text"
      autoComplete="off"
      autoFocus
          placeholder="Search images and photos"
      onChange={this.inputChange}      
    />
  </form>
</header>
    )
  }    
}