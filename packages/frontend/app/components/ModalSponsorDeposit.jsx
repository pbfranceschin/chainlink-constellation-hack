import React, { useState, useEffect } from 'react';
import NumericInput from './NumericInput';
import Button from './Button';

const ModalSponsorDeposit = ({ isOpen, onClose, targetTournament, currentUserSponsor, setCurrentUserSponsor }) => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [currentInputValue, setCurrentInputValue] = useState(0)
  
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  const handleSubmitDeposit = () => {
    setCurrentUserSponsor(currentInputValue)
    onClose()
  }
  const handleSubmitWithdraw = () => {
    setCurrentUserSponsor(-currentInputValue)
    onClose()
  }

  return (
    <div id="modal-overlay" className="fixed inset-0 bg-[#000] bg-opacity-60 flex justify-center items-center p-4 z-10" onClick={handleClose}>
      <div className="flex flex-col w-0.5full">
        <div className="flex flex-row">
          <button 
            onClick={() => setActiveTab('deposit')}
            className={`text-md rounded-t-lg px-4 py-2 ${activeTab === 'deposit' ? 'bg-white' : 'bg-gray-300'}`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`text-md rounded-t-lg px-4 py-2 ${activeTab === 'withdraw' ? 'bg-white' : 'bg-gray-300'}`}
          >
            Withdraw
          </button>
        </div>
        <div className="px-10 py-10 bg-white p-4 rounded-b-lg rounded-tr-lg relative">
          <button onClick={onClose} className="absolute -top-8 -right-8 rounded-full p-1 text-4xl text-white leading-4 font-semibold z-20">
            &times;
          </button>
          {activeTab === 'deposit' && 
            <div className="w-full flex flex-col gap-8">
              {currentUserSponsor > 0 
                ? <p>
                    You have a total sponsor amount of <span className="font-semibold">{currentUserSponsor} USDC</span> on the <span className="font-semibold">{targetTournament}</span> tournament. How much would you like to deposit?
                  </p>
                : <p>
                    Choose the amount to sponsor the <span className="font-semibold">{targetTournament}</span> tournament.
                  </p>
              }
              <NumericInput setCurrentInputValue={setCurrentInputValue}/>
              <Button label={'DEPOSIT VALUE'} handleOnClick={handleSubmitDeposit} />
            </div>
          }
          {activeTab === 'withdraw' && 
            <div className="w-full flex flex-col gap-8">
              {currentUserSponsor > 0 
                ? <p>
                    You have a total sponsor amount of <span className="font-semibold">{currentUserSponsor} USDC</span> on the <span className="font-semibold">{targetTournament}</span> tournament. How much would you like to withdraw?
                  </p>
                : <p>
                    You haven't sponsor this tournament yet.
                  </p>
              }
              <NumericInput setCurrentInputValue={setCurrentInputValue} initialValue={currentUserSponsor} isActive={currentUserSponsor > 0 ? true : false} />
              {currentUserSponsor > 0 &&
                <p>
                  Value to withdraw: <span className="font-semibold">{currentInputValue} USDC</span> <br />
                  Remaining sponsor amount: <span className="font-semibold">{Math.max(0, currentUserSponsor - currentInputValue)} USDC</span>
                </p>
              }
              <Button label={'WITHDRAW VALUE'} handleOnClick={handleSubmitWithdraw} isActive={currentUserSponsor > 0 ? true : false}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ModalSponsorDeposit;
