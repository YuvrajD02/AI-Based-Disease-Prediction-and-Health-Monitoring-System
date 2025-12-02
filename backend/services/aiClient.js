const axios = require("axios");

async function callAiService(symptoms) {
  const url = process.env.AI_SERVICE_URL;
  const res = await axios.post(url, { symptoms });
  return res.data;
}

module.exports = { callAiService };
