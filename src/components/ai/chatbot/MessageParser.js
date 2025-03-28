import React, { useState } from 'react';

const MessageParser = ({ children, actions }) => {

  const [ currentMessages, setCurrentMessages ] = useState([])

  const parse = (message) => {
    actions.getAIResponse(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
