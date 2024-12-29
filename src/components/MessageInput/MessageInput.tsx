// Styles
import styles from './MessageInput.module.scss';
// Hooks
import { useState, useEffect } from 'react';
import { useMessages } from '../../contexts/MessagesContext';

const MessageInput = () => {
  const [messageInput, setMessageInput] = useState('');
  const { setSendedMessages, setLocalIsTyping, localIsTyping } = useMessages();

  // To still have 'Typing...' in the chat box after stop typing for a specific time
  useEffect(() => {
    const isTypingLatency = setTimeout(() => {
      setLocalIsTyping(false);
    }, 1000);

    return () => clearTimeout(isTypingLatency);
  }, [localIsTyping, setLocalIsTyping, messageInput]);

  return (
    <form
      className={styles.form}
      onSubmit={e => {
        e.preventDefault();
        setMessageInput('');
        setSendedMessages(messages => [
          ...messages,
          { message: messageInput, date: new Date(), type: 'sended' },
        ]);
        setLocalIsTyping(false);
      }}
    >
      <input
        type='text'
        placeholder='Send a Message'
        value={messageInput}
        onChange={e => {
          const inputValue = e.target.value;

          setMessageInput(inputValue);
          // To remove 'Typing...' if the input field is empty
          if (inputValue) setLocalIsTyping(true);
          else setLocalIsTyping(false);
        }}
        className={styles.messageInputField}
      />
      <button className={styles.sendBtn} disabled={!messageInput}>
        &rarr;
      </button>
    </form>
  );
};

export default MessageInput;
