import React, {useState} from 'react';
import { GenerateIcon } from './Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("")

  if (!isOpen) return null;

  const handleGenerateRes = () => {
    
  }
const fetchData = async() => {
  try {
    const res = await fetch("public\data\response.json");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const result = await res.json();
    console.log("response of data",result)
  } catch (error) {
    console.log("error on fetching data", error)
  }
}
fetchData();
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-lg shadow-[#575757a7] lg:w-[29vw] w-[50vw] sm:ml-[30rem] lg:-ml-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-end mb-5 '>
        <p className='bg-[#DFE1E7] p-4 rounded-xl text-gray-500 w-8/12 text-[1.37rem]'>{input}</p>
      </div>
        <div className='flex justify-start mb-5 '>
        <p className='bg-[#DBEAFE] p-4 rounded-xl text-gray-500 w-10/12 text-[1.37rem]'>Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.</p>
      </div>
        <div className=''>
          <input  className='rounded-md hover:outline-0 shadow-transparent' placeholder='Your prompt' type="text" />
        </div>

        <div className='flex justify-end mt-6'>
          <button onClick={handleGenerateRes} className="">
            <GenerateIcon />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal;
