const express = require('express'); // Upewnij się, że to jest pierwsza linia
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/rss', async (req, res) => {
    const url = 'https://news.google.com/rss?hl=pl&gl=PL&ceid=PL:pl';
    try {
        const response = await axios.get(url);
        res.set('Content-Type', 'text/xml');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching the RSS feed:', error);
        res.status(500).send('Error fetching the RSS feed');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
