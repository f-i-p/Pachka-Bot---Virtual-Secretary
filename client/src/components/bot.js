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
import axios from "axios";

const sendUserMessage = async () => {
  const webhookUrl =
    "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY"; // Вставьте свой URL
  const messageData = {
    message: {
      content:
        "Вот попробуйте написать правильно это с первого раза: Будущий, Полощи, Прийти, Грейпфрут, Мозаика, Бюллетень, Дуршлаг, Винегрет.",
      files: [],
    },
  };

  try {
    const response = await axios.post(webhookUrl, messageData);
    console.log("Сообщение отправлено:", response.data);
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
  }
};

sendUserMessage();
