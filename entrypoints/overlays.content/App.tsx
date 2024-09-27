import React, { useState } from 'react';
import {AIIcon} from "./components/Icons";
import './style.css'
import Modal from "./components/Modal";
const App: React.FC = () => {
  function observeMessageInput() {
    const observer = new MutationObserver(() => {
      const messageInput = document.querySelector('.msg-form__msg-content-container .msg-form__contenteditable p') as HTMLElement;

      if (messageInput) {
        console.log('Message input found, from app component.', messageInput);
        
        observer.disconnect(); // Stop observing after rendering
      } else {
        console.log('Message input not found. Continuing to observe...');
      }
    });

    // Start observing the body for changes
    observer.observe(document.body, { childList: true, subtree: true });
  }
  observeMessageInput()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
    <div className="bg-black">
    <Modal isOpen={isModalOpen} onClose={toggleModal} />  
      </div>
   
      <div className='cursor-pointer' onClick={toggleModal}>
      <AIIcon />
      </div>
    </>
  );
}

export default App;
