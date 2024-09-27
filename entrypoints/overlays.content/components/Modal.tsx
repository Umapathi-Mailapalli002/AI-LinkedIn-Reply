import React from 'react';
import { GenerateIcon } from './Icons';
import '../style.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-lg shadow-[#575757a7] lg:w-[28vw] w-[50vw] sm:ml-[30rem] lg:-ml-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=''>
          <input style={{border: "none !important"}} className='rounded-md hover:outline-0 shadow-transparent' placeholder='Your prompt' type="text" />
        </div>

        <div className='flex justify-end mt-8'>
          <button onClick={onClose} className="">
            <GenerateIcon />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
