import React, { useState } from 'react';

const NumericInput = ({ setCurrentInputValue, initialValue='', isActive=true }) => {
  const [value, setValue] = useState(initialValue ? () => {setCurrentInputValue(initialValue); return parseFloat(initialValue)} : '');

  const handleOnChange = (targetValue) => {
    if (targetValue === '') {
      setValue('');
      setCurrentInputValue(0);
    } else {
      setValue(targetValue);
      const numericValue = Math.max(0, Number(targetValue));
      setCurrentInputValue(numericValue);
    }
  }

  return (
    <div className={`py-5 px-4 w-0.7full flex items-end place-self-center place-content-between border border-gray-300 rounded-lg overflow-hidden ${isActive ? 'focus-within:ring focus-within:ring-blue-500 hover:border-blue-500 ' : 'border-gray-200'}`}>
      {/* Numeric Input */}
      <input
        type="number"
        step="0.1"
        className="w-full px-2 text-4xl focus:outline-none"
        onChange={e => handleOnChange(e.target.value)}
        min="0"
        placeholder="0"
        readOnly={!isActive}
        value={value}
      />

      {/* Currency Label */}
      <span className={`text-sm text-gray-500 px-1 pb-2px ${isActive ? '' : 'text-gray-300'}`}>
        USDC
      </span>
    </div>
  );
};

export default NumericInput;
