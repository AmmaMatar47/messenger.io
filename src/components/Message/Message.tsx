import styles from './Message.module.scss';

import { MessageInfo } from '../../contexts/MessagesContext';

const Message = ({ message }: { message: MessageInfo<'received' | 'sended'> }) => {
  return (
    <li
      className={`${styles.messageItem} ${
        message.type === 'received' ? styles.remoteMessenger : styles.localMessenger
      }`}
    >
      <p className={styles.messageText}>{message.message}</p>
    </li>
  );
};

export default Message;
