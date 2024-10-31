const axios = require("axios");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const { channel, message } = req.body;

  const apiToken = "Svbtm1d1uj_wVk05aarcqGA_hB9phPmF7iQyazLHA3k"; // токен бота

  if (!channel || !message) {
    console.log("Invalid input:", { channel, message });
    return res.status(400).json({ error: "Канал и сообщение обязательны." });
  }

  // const url = `${BASE_URL}${channel}/messages`;
  const url = `https://api.pachca.com/webhooks/01JBHCDSR8MK6Q5K11AEZ1MDQY`;
  console.log("Sending request to:", url);
  const headers = {
    Authorization: `Bearer ${apiToken}`,
    "Content-Type": "application/json",
  };

//   const payload = {
//     message: {
//       entity_type: "user",
//       entity_id: channel,
//       content: message,
//     },
//   };

  const payload = {
    message
  };

  try {
    const response = await axios.post(url, payload, { headers });
    if (response.status === 201) {
      return res.status(201).json({ message: "Сообщение отправлено успешно." });
    }
  } catch (error) {
    console.error(
      "Ошибка при отправке сообщения:",
      error.response ? error.response.data : error.message
    );
    return res.status(error.response ? error.response.status : 500).json({
      error: `Ошибка при отправке сообщения: ${error.message}`,
    });
  }
});

module.exports = router;
