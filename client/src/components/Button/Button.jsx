import React from 'react';
import './Button.css';

const Button = ({ label, width, onClick, bgColor }) => {
  return (
    <button 
      style={{ width: width ? `${width}px` : '100%', backgroundColor: bgColor || '#FFB1B1' }}
      onClick={onClick ? onClick : () => {}}>
      {label}
    </button>
  )
};

export default Button;
