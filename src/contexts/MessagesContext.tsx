// Hooks
import { createContext, useContext, useEffect, useState } from 'react';

///////////////////////////////////////////////////////////////
// Types
export interface MessageInfo<T> {
  message: string;
  date: Date;
  type: T;
}

interface MessagesContextValue {
  // Local side values
  sendedMessages: MessageInfo<'sended'>[];
  setSendedMessages: React.Dispatch<React.SetStateAction<MessageInfo<'sended'>[]>>;
  localIsTyping: boolean;
  setLocalIsTyping: React.Dispatch<React.SetStateAction<boolean>>;

  // Remote side values
  receivedMessages: MessageInfo<'received'>[];
  setReceivedMessages: React.Dispatch<React.SetStateAction<MessageInfo<'received'>[]>>;
  remoteIsTyping: boolean;
  setRemoteIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

const PROGRAMMING_QUOTE_URL = 'https://programming-quotes-api.azurewebsites.net/api/quotes/random';

const MessagesContext = createContext<MessagesContextValue | null>(null);

const MessagesProvider = ({ children }: { children: JSX.Element }) => {
  // States
  const [sendedMessages, setSendedMessages] = useState<MessageInfo<'sended'>[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<MessageInfo<'received'>[]>([]);
  const [localIsTyping, setLocalIsTyping] = useState(false);
  const [remoteIsTyping, setRemoteIsTyping] = useState(false);

  useEffect(() => {
    if (!sendedMessages.length) return;

    const fetchRandomText = async () => {
      try {
        setRemoteIsTyping(true);
        const res = await fetch(PROGRAMMING_QUOTE_URL);
        const data = await res.json();

        setReceivedMessages(messages => [
          ...messages,
          {
            message: data.text,
            date: new Date(),
            type: 'received',
          },
        ]);
        setRemoteIsTyping(false);
      } catch (error) {
        console.log(error);
      } finally {
        setRemoteIsTyping(false);
      }
    };
    fetchRandomText();
  }, [sendedMessages]);

  return (
    <MessagesContext.Provider
      value={{
        sendedMessages,
        setSendedMessages,
        localIsTyping,
        setLocalIsTyping,

        receivedMessages,
        setReceivedMessages,
        remoteIsTyping,
        setRemoteIsTyping,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined || context === null)
    throw new Error(`MessagesContext is being used outside of it's range.`);
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { MessagesProvider, useMessages };
