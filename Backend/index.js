const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const app = express();
app.use(
  cors({
    origin: [
      'https://bodol-space.vercel.app',
      'http://localhost:3000',
      'http://www.bodol.space',
    ],
    credentials: true,
  })
);
mongoose
  .connect(process.env.MONGO_ATLAS_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const cookieParser = require('cookie-parser');
const userRouter = require('./Routes/userRoutes');
const postRouter = require('./Routes/postRoutes');
const replyRouter = require('./Routes/replyRoute');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('running...');
});

app.use(userRouter);
app.use(postRouter);
app.use(replyRouter);

app.listen(port, () => {
  console.log(`App is listening at port:${port}`);
});
