import PropTypes from 'prop-types';

import { TotalContactsText, TotalContactsNum } from './ContactAmount.styled';

export default function ContactAmount({ contactsAmount }) {
  return (
    <TotalContactsText>
      Contacts amount: <TotalContactsNum>{contactsAmount}</TotalContactsNum>
    </TotalContactsText>
  );
}

ContactAmount.propTypes = { contactsAmount: PropTypes.number.isRequired };
