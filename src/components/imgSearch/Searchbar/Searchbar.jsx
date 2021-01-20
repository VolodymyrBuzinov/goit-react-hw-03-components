import PropTypes from 'prop-types';
import { Component } from 'react';
import swal from 'sweetalert';

export default class Searchbar extends Component {
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
    return (
      <header className="Searchbar">
  <form className="SearchForm" onSubmit={this.formSubmit}>
    <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label">Search</span>
    </button>
    <input
      className="SearchForm-input"
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