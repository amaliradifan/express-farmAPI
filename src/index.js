const express = require('express');

const router = require('./routers');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api', router);

app.use(notFoundMiddleware);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});
