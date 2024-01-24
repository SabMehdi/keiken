const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const { OpenAI } = require('openai');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('GPT-Gate Backend is runnifffng');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api', authRoutes);


app.post('/chat', async (req, res) => {
  const { message } = req.body;
  console.log('Received request:', req.body); // Log the request body

  try {
    /* const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          "role": "user",
          "content": message // Use the 'message' from the request body as the user's input
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
 */
    res.json({ message: 'Static response' });
    console.log(res);
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({
      message: 'Error processing your request',
      error: error.message
    });
  }
});
