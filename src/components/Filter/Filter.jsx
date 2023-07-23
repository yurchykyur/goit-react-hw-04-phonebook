import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { FilterWrapper, FilterInputLabel, FilterInput } from './Filter.styled';

export default function Filter({ value, onChangeFilter }) {
  const inputId = nanoid();
  return (
    <FilterWrapper>
      <FilterInputLabel htmlFor={inputId}>
        Find contacts by name:
        <FilterInput
          type="text"
          value={value}
          id={inputId}
          onChange={e => onChangeFilter(e)}
        />
      </FilterInputLabel>
    </FilterWrapper>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};