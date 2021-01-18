import { Component } from 'react';
import Section from '../phonebook/Section/Section'
import Input from './Input/Input'
import ContactsList from './ContactsList/ContactsList'
import Filter from './Filter/Filter'
import swal from 'sweetalert';
import { v4 as uuidv4 } from 'uuid';
import './phonebook.css'

export default class Phonebook extends Component {
    state = {
      contacts: [             
        ],
      filter: '',
        name: '',
      number: '',
      
    };
   componentDidUpdate(prevProps, prevState) {
     if (prevState.contacts !== this.state.contacts) {
       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
       this.setState({name: '', number: ''})
    }
  }
  componentDidMount() {    
    const localItems = localStorage.getItem('contacts');      
      const parcedLocalItems = JSON.parse(localItems);
      if (parcedLocalItems) {
      this.setState({ contacts: parcedLocalItems });
    }
    
  }
  onInputChange = evt => {    
    this.setState({ [evt.target.name]: evt.target.value });
    };    

  submitForm = evt => {
    evt.preventDefault();    
    if (this.state.contacts.find(({ name }) => name.toLowerCase() === this.state.name.toLowerCase())) {
      swal("Cant add!", "Contact already exist!", "error");
      return;
    } else {
      swal("Good job!", "You added contact!", "success");
    }
    const contacts = [
      ...this.state.contacts,
      { name: this.state.name, number: this.state.number, id: uuidv4()},
    ];
    this.setState({ contacts });
    };
    
  deleteContact = id => {      
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });     
    swal("Wow!", "You have delete a contact!", "success");
    } 

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleTasks = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };
  
  render() {  
    const { filter } = this.state;

    const visibleTasks = this.getVisibleTasks();
    return (<>
        <Section title='Phonebook'>
            <Input name={this.state.name}
          number={this.state.number}          
          onChangeInput={this.onInputChange}
          onSubmitForm={this.submitForm}/>    
        </Section>
      <Section title='Contacts'> 
        {visibleTasks.length > 0 && <Filter value={filter} onfindContact={this.changeFilter} />}
        {visibleTasks.length > 0 ? <ContactsList contacts={visibleTasks} onContactDelete={this.deleteContact} /> : <h2 className='contacts-title'>You need to add contacts first</h2>}            
      </Section>
      </>
    )    
  }
}