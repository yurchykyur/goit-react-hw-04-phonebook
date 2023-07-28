import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import ContactAmount from 'components/ContactAmount';
import Notification from 'components/Notification';

// import initialBaseContacts from 'Data/initialBaseContacts';

import { AppContainer, MainTitle, SecondTitle } from './App.styled';

const LS_KEY = 'user_phonebook';

export default function App() {
  const [contacts, setContacts] = useState(() => reviseLocalStorage());
  const [filter, setFilter] = useState('');

  function reviseLocalStorage() {
    const savedLocaleStorage = window.localStorage.getItem(LS_KEY);
    if (savedLocaleStorage) {
      return [...JSON.parse(savedLocaleStorage)];
    }
    return [];
  }

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    if (contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const contact = { ...data, id: nanoid() };
    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
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
