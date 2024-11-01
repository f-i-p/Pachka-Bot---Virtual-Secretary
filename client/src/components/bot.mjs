// import axios from "axios";

// const sendMessage = async () => {
//   const webhookUrl =
//     "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY"; // Вставьте свой URL
//   const messageData = {
//     message: {
//       entity_type: "discussion", // или 'user' для личного сообщения
//       entity_id: 14766770, // ID беседы или пользователя
//       content: "Привет, это сообщение от Бони!", // текст сообщения
//     },
//   };

//   try {
//     const response = await axios.post(webhookUrl, messageData);
//     console.log("Сообщение отправлено:", response.data);
//   } catch (error) {
//     console.error("Ошибка при отправке сообщения:", error);
//   }
// };

// sendMessage();
// const axios = require('axios')

// const sendUserMessage = async (content) => {
//     const webhookUrl =
//         'https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY'
//     const messageData = {
//         message: {
//             content,
//             files: [],
//         },
//     }

//     try {
//         const response = await axios.post(webhookUrl, messageData)
//         console.log('Сообщение отправлено:', response.data)
//     } catch (error) {
//         console.error('Ошибка при отправке сообщения:', error)
//     }
// }

// module.exports = sendUserMessage


import axios from 'axios'; // Using import to bring in axios

const sendUserMessage = async (content) => {
    const webhookUrl = 'https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY';
    const messageData = {
        message: {
            content,
            files: [],
        },
    };

    try {
        const response = await axios.post(webhookUrl, messageData);
        console.log('Сообщение отправлено:', response.data);
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
    }
};

export default sendUserMessage; // Using export to export the function