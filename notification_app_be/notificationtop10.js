require("dotenv").config();
const axios = require("axios");

const token = process.env.TOKEN;

const getTopNotifications = async () => {
  try {
    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    const notifications = response.data.notifications;

    const priority = {
      Placement: 3,
      Result: 2,
      Event: 1
    };

    notifications.sort((a, b) => {
      const p1 = priority[a.type] || 0;
      const p2 = priority[b.type] || 0;

      if (p1 !== p2) return p2 - p1;

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const top10 = notifications.slice(0, 10);

    console.log("\nTop 10 Notifications:\n");

    top10.forEach((item, index) => {
      console.log(
        `${index + 1}. [${item.type}] ${item.message} (${item.createdAt})`
      );
    });

  } catch (error) {
    console.log("Error fetching notifications:", error.message);
  }
};

getTopNotifications();