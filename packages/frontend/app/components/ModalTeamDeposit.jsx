import React, { useState, useEffect } from 'react';

const ModalTeamDeposit = ({ isOpen, onClose, targetTeam, currentUserDeposit, setCurrentUserDeposit }) => {
  const [activeTab, setActiveTab] = useState('deposit');

  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

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
        <div className="w-fit px-10 py-10 bg-white p-4 rounded-b-lg rounded-tr-lg relative">
          <button onClick={onClose} className="absolute -top-8 -right-8 rounded-full p-1 text-4xl text-white leading-4 font-semibold z-20">
            &times;
          </button>
          <div className="w-full flex flex-col">
            {currentUserDeposit > 0 
              ? <p>
                  You have a current bet of <span className="font-semibold">{currentUserDeposit} USDC</span> on <span className="font-semibold">{targetTeam}</span>. How much would you like to deposit?
                </p>
              : <p>
                  How much would you like to deposit? 
                </p>
            }
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ModalTeamDeposit;
