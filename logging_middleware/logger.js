const axios = require("axios");

const sendlogtoserver = async (stack, level, package, message) => {
    try {
        const payload = {
            stack: stack,
            level: level,
            package: package,
            message: message,
        };

        const config = {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJpbTE3MzdAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwMDY1NSwiaWF0IjoxNzc3Njk5NzU1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTcwZDg5NTAtYjE1Ny00Y2Q5LWE0MjEtMGQ0YTY5MWJkN2VjIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiaWtzaGEgbWFsaG90cmEiLCJzdWIiOiI0NWZjYzNhMi0yZDhjLTQzYWYtYjEzNS0wNjhlNjhmNDNiODYifSwiZW1haWwiOiJpbTE3MzdAc3JtaXN0LmVkdS5pbiIsIm5hbWUiOiJpa3NoYSBtYWxob3RyYSIsInJvbGxObyI6InJhMjMxMTAwMzAzMDI0MiIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjQ1ZmNjM2EyLTJkOGMtNDNhZi1iMTM1LTA2OGU2OGY0M2I4NiIsImNsaWVudFNlY3JldCI6IkpHeVBLVmhzRkRZc1dKY2sifQ.LQNTQtXFy9E5LV9NPXK6BUuTPaIevWtheXcvWgbAg0k",
            },
        };

        const api = "http://20.207.122.201/evaluation-service/logs"

        const result = await axios.post(api, payload, config);

        console.log("Log Success ID:", result.data.logId);
    } catch (err) {
        console.log("Error pushing log:", err.response?.data || err.message);
    }
};

module.exports = sendlogtoserver;