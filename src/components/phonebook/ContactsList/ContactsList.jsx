import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import style from './ContactList.module.css'


export default function ContactsList({ contacts, onContactDelete}) {    
    return (
        <>
            <ul className={style.list}>
                {contacts.map(contact => {                    
                    const { id , name, number } = contact;                    
                    return (
                        <li key={uuidv4()}>                            
                            <p>Name: {name}</p>
                            <p>Number: {number}</p>
                            <button className={style.deleteButton} type="button" onClick={() => onContactDelete(id)}>Delete contact</button>
                        </li>
                    )
                    })}
             </ul>
        </>
    )
}

ContactsList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }                        
     )
    ),
  onDeleteContact: PropTypes.func,
}