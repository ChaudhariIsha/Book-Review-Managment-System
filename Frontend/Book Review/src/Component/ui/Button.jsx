import React from 'react';

const Button = ({ children, onClick, variant, size, type }) => {
  const baseStyle = 'px-4 py-2 rounded focus:outline-none';
  const variantStyle = variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white';
  const sizeStyle = size === 'sm' ? 'text-sm' : 'text-lg';
  return (
    <button className={`${baseStyle} ${variantStyle} ${sizeStyle}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export { Button };
