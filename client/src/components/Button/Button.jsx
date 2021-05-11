import React from 'react';
import './Button.css';

const Button = ({ label, width, onClick }) => {
  return (
    <button 
      style={{ width: width ? `${width}px` : '100%' }}
      onClick={onClick ? onClick : () => {}}>
      {label}
    </button>
  )
};

export default Button;
