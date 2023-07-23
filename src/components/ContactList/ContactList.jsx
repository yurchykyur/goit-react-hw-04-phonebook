import PropTypes from 'prop-types';

import {
  ListElement,
  PhonebookList,
  ContactItemWrapper,
  ContactItemName,
  ContactItemNum,
  DeleteBtn,
} from './ContactList.styled';

export default function ContactList({ contactList, deleteContact }) {
  return (
    <>
      <PhonebookList>
        {contactList.map(({ id, number, name }) => {
          return (
            <ListElement key={id}>
              <ContactItemWrapper>
                <ContactItemName>{name}</ContactItemName>
                <ContactItemNum href={`tel:${number}`}>{number}</ContactItemNum>
                <DeleteBtn onClick={() => deleteContact(id)}>Delete</DeleteBtn>
              </ContactItemWrapper>
            </ListElement>
          );
        })}
      </PhonebookList>
    </>
  );
}

ContactList.propTypes = {
  contactList: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
