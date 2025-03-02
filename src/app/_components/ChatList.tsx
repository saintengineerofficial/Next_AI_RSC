import React from "react";
import { UIState } from "../action";

type ChatListProps = {
  messages: UIState[];
};

const ChatList = ({ messages }: ChatListProps) => {
  if (!messages.length) return null;

  return (
    <div className='relative mx-auto max-w-2xl px-4'>
      {messages.map(message => {
        return (
          <div key={message.id} className='pb-4'>
            {message.display}
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
