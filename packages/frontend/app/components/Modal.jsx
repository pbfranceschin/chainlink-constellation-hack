import React, { useState, useEffect } from 'react';
import NumericInput from './NumericInput';
import Button from './Button';

const Modal = ({onClose, currentUserAmount, handleDeposit, handleApprove, handleWithdraw, depositText, withdrawText, allowance, isLoading}) => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [currentInputValue, setCurrentInputValue] = useState(BigInt(0));
  
  const handleClose = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  const handleSubmitDeposit = () => {
    handleDeposit(currentInputValue)
    // onClose()
  }
  const handleSubmitWithdraw = () => {
    handleWithdraw(currentInputValue)
    // onClose()
  }
  
  // console.log('allowance', allowance, currentInputValue, BigInt(currentInputValue) >= allowance);
  // console.log('isLoading', isLoading);
  // console.log('currentUserAmount', currentUserAmount)
  console.log('currentInputValue', currentInputValue)

  return (
    <div id="modal-overlay" className="fixed inset-0 bg-[#000] bg-opacity-60 backdrop-filter backdrop-blur-sm flex justify-center items-center p-4 z-10 text-text1" onClick={handleClose}>
      <div className="flex flex-col w-0.4full">
        <div className="flex flex-row">
          <button 
            onClick={() => setActiveTab('deposit')}
            className={`text-md tracking-wide leading-8 rounded-t-2xl px-4 py-2 ${activeTab === 'deposit' ? 'bg-background3 font-semibold' : 'bg-background1'}`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`text-md tracking-wide leading-8 rounded-t-2xl px-4 py-2 ${activeTab === 'withdraw' ? 'bg-background3 font-semibold' : 'bg-background1'}`}
          >
            Withdraw
          </button>
        </div>
        <div className="px-10 py-10 leading-8 bg-background3 p-4 rounded-b-3xl rounded-tr-3xl relative text-xl">
          <button onClick={onClose} className="absolute -top-8 -right-8 rounded-full p-1 text-4xl text-text2 leading-4 font-semibold z-20">
            &times;
          </button>
          {activeTab === 'deposit' && 
            <div className={`w-full flex flex-col ${currentUserAmount > 0 ? 'gap-72px' : 'gap-8'}`}>
              {currentUserAmount > 0 
                ? depositText.textPositiveAmount
                : depositText.textZeroAmount
              }
              <NumericInput setCurrentInputValue={setCurrentInputValue}/>
              {isLoading
                ? <Button label={'LOADING...'} handleOnClick={handleSubmitDeposit} isActive={false}/>
                : (BigInt(currentInputValue) <= allowance && allowance > 0)
                  ? <Button label={'DEPOSIT VALUE'} handleOnClick={handleSubmitDeposit} />
                  : <Button label={'APPROVE'} handleOnClick={handleApprove} />
              }            
            </div>
          }
          {activeTab === 'withdraw' && 
            <div className="w-full flex flex-col gap-8">
              {currentUserAmount > 0 
                ? withdrawText.textPositiveAmount
                : withdrawText.textZeroAmount
              }
              <NumericInput setCurrentInputValue={setCurrentInputValue} initialValue={currentUserAmount} isActive={currentUserAmount > 0} />
              {currentUserAmount > 0 && currentInputValue &&
                <p className="text-lg text-text4">
                  Value to withdraw: <span className="font-semibold text-text2">{currentInputValue} USDC</span> <br />
                  Remaining amount after withdraw: <span className="font-semibold text-text2">{currentUserAmount - currentInputValue} USDC</span>
                </p>
              }
              {isLoading
                ? <Button label={'LOADING...'} handleOnClick={handleSubmitDeposit} isActive={false}/>
                : <Button label={'WITHDRAW VALUE'} handleOnClick={handleSubmitWithdraw} isActive={(currentUserAmount > 0 && currentInputValue <= currentUserAmount && currentInputValue > 0)}/>
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;
