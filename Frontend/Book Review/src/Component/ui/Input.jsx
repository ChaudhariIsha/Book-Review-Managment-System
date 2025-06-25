import React from 'react';

const Input = ({ name, value, onChange, placeholder, required }) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-2 border rounded"
    />
  );
};

export { Input };
