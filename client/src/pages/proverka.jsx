import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance, { setAccessToken } from '../axiosInstance';

const Proverka = () => {
    const [channel, setChannel] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
  
    const sendMessage = async (channel, message) => {
        if (!channel || !message) {
            setResponseMessage('Channel and message are required.');
            return;
        }

    try {
        const responce =  await axiosInstance.post(
            '/proverka', // Adjust to your server URL
            {channel, message },
            { headers: { 'Content-Type': 'application/json' } }
        );
        setResponseMessage(responce.data.message);
        
    } catch (error) {
        setResponseMessage(`Error: ${error.response?.data?.error,  error.message}`);
        console.error('Error sending message:', error);
    }
};

    return (
      <div>
        <h1>Отправка сообщения в Пачку</h1>
        <input
          type="text"
          placeholder="Канал"
          value={Number(channel)}
          onChange={(e) => setChannel(e.target.value)}
        />
        <textarea
          placeholder="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => sendMessage(channel, message)}>Отправить</button>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    );
  };

export default Proverka;
