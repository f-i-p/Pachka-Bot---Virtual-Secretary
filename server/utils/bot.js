import axios from "axios";

const sendUserMessage = async () => {
  const webhookUrl =
    "https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY";
  const messageData = {
    message: {
      content,
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