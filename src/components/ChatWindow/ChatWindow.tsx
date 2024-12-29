// Styles
import styles from './ChatWindow.module.scss';
import messageStyles from '../Message/Message.module.scss';
// Hooks
import { useEffect, useRef } from 'react';
import { useMessages } from '../../contexts/MessagesContext';
// Components
import Message from './../Message/Message';

const ChatWindow = () => {
  const { sendedMessages, receivedMessages, localIsTyping, remoteIsTyping } = useMessages();
  const chat = [...sendedMessages, ...receivedMessages].sort(
    // Sorting chat array based on date
    (a, b) => a.date.getTime() - b.date.getTime()
  );
  const chatWindowEl = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    chatWindowEl.current?.scrollTo({ top: chatWindowEl.current.scrollHeight, behavior: 'smooth' });
  }, [sendedMessages, receivedMessages, localIsTyping, remoteIsTyping]);

  return (
    <ul className={`${styles.chatWindow} chat-container`} ref={chatWindowEl}>
      {/* Display messages list */}
      {chat.map(message => (
        <Message message={message} key={message.date.getTime()}></Message>
      ))}

      {/* Display if is currently is typing for the local / remote */}
      {localIsTyping && (
        <li className={`${messageStyles.messageItem} ${messageStyles.localMessenger}`}>
          <p className={messageStyles.messageText}>Typing...</p>
        </li>
      )}
      {remoteIsTyping && (
        <li className={`${messageStyles.messageItem} ${messageStyles.remoteMessenger}`}>
          <p className={messageStyles.messageText}>Typing...</p>
        </li>
      )}
    </ul>
  );
};

export default ChatWindow;
