const axios = require("axios");

const BASE = "http://20.207.122.201/evaluation-service";

const fetchGivenData = async (type, token) => {
  const url = BASE + "/" + type;

  const res = await axios.get(url, {
    headers: { Authorization: "Bearer " + token }
  });

  return res.data;
};

module.exports = fetchGivenData;