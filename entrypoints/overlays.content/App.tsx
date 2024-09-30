import React, { useState } from 'react';
import {AIIcon} from "./components/Icons";
import Modal from "./components/Modal";
import './style.css'
const App: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  useEffect(() => {
    const messageInput = document.querySelector('.msg-thread .msg-form__msg-content-container--scrollable') as HTMLElement;

    if (messageInput) {
      const observer = new MutationObserver(() => {
        const focused = messageInput.getAttribute('data-artdeco-is-focused') === 'true';
        console.log('Focus attribute status:', focused ? 'focused' : 'not focused');

        setIsFocused(focused);
      });

      observer.observe(messageInput, { attributes: true });

      return () => observer.disconnect(); // Cleanup observer on unmount
    }
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
    <div className="bg-black">
    <Modal isOpen={isModalOpen} onClose={toggleModal} />  
      </div>
   
      <div className='cursor-pointer ' onClick={toggleModal}>
      <AIIcon />
      </div>
    </>
  );
}

export default App;
