import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { useLocalStorage } from 'ServiceLocalStorage/serviceLocalStorage';

import {
  FormWrapper,
  ContactSubmitForm,
  FormInputLabel,
  FormInput,
  FormSubmitBtn,
} from './ContactForm.styled';

export default function ContactForm({ formSubmitHandler }) {
  const [name, setName] = useLocalStorage('name', '');
  const [number, setNumber] = useLocalStorage('number', '');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    formSubmitHandler({ name, number });
    reset();
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <FormWrapper>
      <ContactSubmitForm onSubmit={handleFormSubmit}>
        <FormInputLabel htmlFor={nameInputId}>
          Name
          <FormInput
            type="text"
            name="name"
            placeholder="John Wick"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            id={nameInputId}
            value={name}
          />
        </FormInputLabel>

        <FormInputLabel htmlFor={numberInputId}>
          Phone number
          <FormInput
            type="tel"
            name="number"
            placeholder="+380501234567"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            id={numberInputId}
            value={number}
          />
        </FormInputLabel>
        <FormSubmitBtn type="submit">Add contact</FormSubmitBtn>
      </ContactSubmitForm>
    </FormWrapper>
  );
}

ContactForm.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
};
