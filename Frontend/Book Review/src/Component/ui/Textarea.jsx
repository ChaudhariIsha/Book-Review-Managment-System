import React from 'react';

const Textarea = ({ name, value, onChange, placeholder, required }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-2 border rounded"
    />
  );
};

export { Textarea };
