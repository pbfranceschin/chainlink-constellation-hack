import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div id="modal-overlay" className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-10" onClick={handleClose}>
      <div className="w-fit px-10 py-10 bg-white p-4 rounded-lg relative">
        <button onClick={onClose} className="absolute -top-8 -right-8 rounded-full p-1 text-4xl text-gray-200 leading-4 font-semibold z-20">
          &times;
        </button>
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet. <br />
        Lorem ipsum dolor sit amet. <br />
      </div>
    </div>
  );
};

export default Modal;
