import React, { useState } from 'react';

const NumericInput = ({ setCurrentInputValue, initialValue='', isActive=true }) => {
  const [value, setValue] = useState(initialValue ? () => {setCurrentInputValue(initialValue); return parseFloat(initialValue)} : '');

  const handleOnChange = (targetValue) => {
    if (targetValue === '') {
      setValue('');
      setCurrentInputValue(BigInt(0));
    } else {
      setValue(BigInt(targetValue));
      const numericValue = BigInt(targetValue) > BigInt(0) ? BigInt(targetValue) : BigInt(0);
      setCurrentInputValue(numericValue);
    }
  }

  return (
    <div className={`py-5 px-4 w-0.7full bg-background1 flex items-end place-self-center place-content-between rounded-lg overflow-hidden ${isActive ? 'text-text2 focus-within:border focus-within:border-text2 hover:border hover:border-text2' : 'bg-background4 border-background4 text-text4'}`}>
      {/* Numeric Input */}
      <input
        type="number"
        step="0.1"
        className={`w-full px-2 text-4xl focus:outline-none placeholder:text-text3 ${isActive ? 'bg-background1' : 'bg-background4'}`}
        onChange={e => handleOnChange(e.target.value)}
        min="0"
        placeholder="0"
        readOnly={!isActive}
        value={value}
      />

      {/* Currency Label */}
      <span className={`text-sm text-text2 px-1 pb-2px ${isActive ? '' : 'text-text3'}`}>
        USDC
      </span>
    </div>
  );
};

export default NumericInput;
