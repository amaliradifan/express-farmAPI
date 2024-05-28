const express = require('express');

const router = require('./routers');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('API Ini dah bisa dipake');
});

app.use(notFoundMiddleware);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});
