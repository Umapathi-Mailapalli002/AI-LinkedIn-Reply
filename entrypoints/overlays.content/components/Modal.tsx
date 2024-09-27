import React from 'react';
import { GenerateIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <input className='border-[#a29c9c72] border-none outline-none w-80' type="text" />
        <div className='flex justify-end mt-8'>
        <button onClick={onClose} className="">
          <GenerateIcon/>
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
