const express = require('express');
const axios = require('axios');
const { getPostTitles, getPostsWithUserId } = require('./dataOperations');
const app = express();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data.');
  }
});

app.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.term;
    if (!searchTerm) {
      return res.status(400).send('Search term is required.');
    }

    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?q=${searchTerm}`);
    const data = response.data;
    const matchingPosts = data.slice(0, 5);
    const titles = getPostTitles(matchingPosts);

    res.json(titles);
  } catch (error) {
    res.status(500).send('Error fetching data.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
