import React, { useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import ContactAmount from 'components/ContactAmount';
import Notification from 'components/Notification';

import { useLocalStorage } from 'ServiceLocalStorage/serviceLocalStorage';

import { AppContainer, MainTitle, SecondTitle } from './App.styled';


export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = data => {
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const contact = { ...data, id: nanoid() };
    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContact = () => {
    const normalizedFilterQuery = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterQuery)
    );
  };

  const filteredContacts = getFilteredContact();
  const isContact = !contacts.length ? false : true;

  return (
    <AppContainer>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm formSubmitHandler={addContact} />
      <SecondTitle>Contacts</SecondTitle>
      <Filter onChangeFilter={onChangeFilter} value={filter} />
      <ContactAmount contactsAmount={contacts.length}></ContactAmount>
      {isContact ? (
        <ContactList
          contactList={filteredContacts}
          deleteContact={deleteContact}
        />
      ) : (
        <Notification
          message={'There are no contacts in your phonebook'}
        ></Notification>
      )}
    </AppContainer>
  );
}
