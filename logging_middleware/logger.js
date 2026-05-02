require('dotenv').config();
const axios = require("axios");
const token = process.env.TOKEN;

const sendlogtoserver = async (stack, level, packagename, message) => {
    try {
        const payload = {
            stack: stack,
            level: level,
            package: packagename,
            message: message,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const api = "http://20.207.122.201/evaluation-service/logs"

        const result = await axios.post(api, payload, config);
        return result.data;

    } catch (err) {
        return {
            error: err.response?.data || "log failed"
        };
    }
};

module.exports = sendlogtoserver;