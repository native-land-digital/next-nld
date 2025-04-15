import React from 'react';
import { createClientMessage } from 'react-chatbot-kit';

const ActionProvider = ({ setState, state, children }) => {

  const getAIResponse = async (message, api_nations) => {

    // Putting together messages for API
    const originalMessages = [...state.messages, createClientMessage(message)];
    const messagesToSend = JSON.parse(JSON.stringify(originalMessages))
    messagesToSend.shift();
    messagesToSend.shift();

    // Creating loading interface and placeholder message
    let streamingMessage = {
      id : Math.random() * 1000,
      message : '',
      loading : true,
      type : 'bot'
    }
    setState((prev) => ({
      ...prev,
      messages: [...originalMessages, streamingMessage],
    }));

    const response = await fetch(`/api/ai`, {
      method : "POST",
      body : JSON.stringify({
        messages : messagesToSend,
        api_nations : api_nations
      })
    })

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let streamingText = '';
    streamingMessage.loading = false;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              let text = line.slice(3, line.length - 1);
              text = text.replace(/\\n/g, "\n");
              streamingText += text;
              streamingMessage.message = streamingText

              setState((prev) => ({
                ...prev,
                messages: [...originalMessages, streamingMessage],
              }));
            } catch (e) {
              // Sometimes the data might not be JSON
              console.log(e)
              console.log('Raw data:', line.slice(6));
            }
          }
        }
      }
    } catch (error) {
      console.error('Error reading stream:', error);
    } finally {
      // setIsLoading(false);
    }

  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            getAIResponse
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
