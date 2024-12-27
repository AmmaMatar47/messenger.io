import styles from './App.module.scss';
import ChatWindow from './components/ChatWindow/ChatWindow';
import MessageInput from './components/MessageInput/MessageInput';
import { MessagesProvider } from './contexts/MessagesContext';

function App() {
  return (
    <div className={styles.messengerContainer}>
      <MessagesProvider>
        <>
          <ChatWindow />
          <MessageInput />
        </>
      </MessagesProvider>
    </div>
  );
}

export default App;
