const axios = require("axios");

async function testApiSend() {
    try {
        const response = await axios.post("http://localhost:5000/api/admin/messages", {
            receiverId: 4,
            messageTitle: "API Test",
            messageContent: "Content from API test"
        }, {
            headers: {
                "Authorization": "Bearer YOUR_TOKEN_HERE" // I need a valid token
            }
        });
        console.log("Response:", response.data);
    } catch (err) {
        console.error("Error:", err.response?.data || err.message);
    }
}

// But wait, I don't have a token easily.
// I'll just check the backend logs for errors if I can.
