import React from 'react';
import s from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <div className={s.filter}>
    <label>
      Filter
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={s.filterInput}
      />
    </label>
  </div>
);

export default Filter;
