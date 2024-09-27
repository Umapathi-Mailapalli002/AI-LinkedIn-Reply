import React, { useState } from 'react';
import Icon from "./components/Icon";
import './style.css'
import Modal from "./components/Modal";
const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
    <div className="bg-black">
    <Modal isOpen={isModalOpen} onClose={toggleModal} />    </div>
   
      <div className='cursor-pointer' onClick={toggleModal}>
      <Icon />
      </div>
    </>
  );
}

export default App;
