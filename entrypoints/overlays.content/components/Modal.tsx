import React, { useState, useEffect } from 'react';
import { GenerateIcon, REGenerateIcon, InserIcon } from './Icons';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState<string>("");
  const [isReqSend, setIsReqSend] = useState<boolean>(false);
  const [isRes, setIsRes] = useState<boolean>(false);
  const [req, setReq] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset states when the modal closes
      setInput("");
      setIsReqSend(false);
      setIsRes(false);
      setReq("");
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Prevent the focus event from bubbling up
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleGenerateRes = () => {
    if (input.trim() !== "") {
      setIsReqSend(true);
      setReq(input);
      setInput("");
      setLoading(true);
      setTimeout(() => {
        setIsRes(true);
        setLoading(false);
      }, 2000);
    }
  };

  const handleInsert = () => {
    //response text
    const responseText = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
    //messageInpput accessing
    const messageInput = document.querySelector('.msg-form__msg-content-container .msg-form__contenteditable p') as HTMLElement;
    //placeholder of linkedin message field 
    const messagePlaceholder = document.querySelector(".msg-form__msg-content-container .msg-form__placeholder") as HTMLElement;
    // send button which is disabled we can make it enable
    const sendButton = document.querySelector('.msg-form__send-button');
    //to remove the placeholder
    messagePlaceholder?.classList.remove('msg-form__placeholder')
    sendButton?.removeAttribute('disabled')
    if (!loading && messageInput) {
      messageInput.innerText = responseText;
      // Create a focus event
    const focusEvent = new Event('focus', { bubbles: true });
    
    // Dispatch the focus event
    messageInput.dispatchEvent(focusEvent);

    // Focus the message input explicitly (optional)
    messageInput.focus();
  
      
    }
    // Close the modal after inserting text
    onClose();
  };

  const response: string = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-lg shadow-[#575757a7] lg:w-[29vw] w-[50vw] sm:ml-[30rem] lg:-ml-20"
        onClick={(e) => e.stopPropagation()}
      >
        {isReqSend && (
          <div className='flex justify-end mb-5'>
            <p className='bg-[#DFE1E7] p-4 rounded-xl text-gray-500 w-8/12 text-[1.37rem]'>{req}</p>
          </div>
        )}
        {loading && (
          <div className='flex justify-start mb-5'>
            <Loading />
          </div>
        )}
        {isRes && (
          <div className='flex justify-start mb-5'>
            <p className='bg-[#DBEAFE] p-4 rounded-xl text-gray-500 w-10/12 text-[1.37rem]'>{response}</p>
          </div>
        )}

        <div>
          <input style={{borderRadius: "8px", height: "40px", border: "0", borderBlockColor: "red"}}
            value={input}
            onFocus={handleInputFocus}
            className=''
            onChange={handleInputChange}
            placeholder='Your prompt'
            type="text"
          />
        </div>

        <div className='flex justify-end mt-6'>
          {!isReqSend ? (
            <button onClick={handleGenerateRes}>
              <GenerateIcon />
            </button>
          ) : (
            <div className='flex'>
              <button onClick={handleInsert} className='mr-4'>
                <InserIcon />
              </button>
              <button disabled className='cursor-not-allowed'>
                <REGenerateIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Loading: React.FC = () => {
  return (
    <>
      <span className="relative flex h-3 w-3 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
      {/* Repeat loading dots for better effect */}
      <span className="relative flex h-3 w-3 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
      <span className="relative flex h-3 w-3 mr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>
    </>
  );
};

export default Modal;
