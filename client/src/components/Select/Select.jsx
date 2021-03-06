import React, { useState } from 'react';
import './Select.css';

const Select = ({ placeholder, options, onChange }) => {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  function openToggle() {
    setOpen(!open);
  }

  function onOptionPress(option) {
    setSelected(option);
    openToggle();
    if(onChange) onChange(option);
  }

  return (
    <div className="sel">
      <div
        className={selected ? 'select selected' : 'select empty'}
        onClick={openToggle}>
        {selected ? (
          <div className="selected" >
            <img className="selected--img" src={selected.icon} alt={selected.symbol} />
            <p className="selected--symbol">{selected.symbol}</p>
            <p className="selected--contract">[{selected.contract}]</p>
          </div>
        ) : <p>{placeholder}</p>}
      </div>
      {open && options && options.length > 0 && (
        <div className="sel__options">
          {options.map(option => {
            const { symbol, contract, icon } = option;
            return (
              <div key={option.contract} className="sel__options--option" onClick={() => onOptionPress(option)}>
                <img className="sel__options--option--img" src={icon} alt={symbol} />
                <p className="sel__options--option--symbol">{symbol}</p>
                <p className="sel__options--option--contract">[{contract}]</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
