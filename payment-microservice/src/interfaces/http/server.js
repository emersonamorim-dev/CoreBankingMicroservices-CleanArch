const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('../routes/paymentRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api', paymentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
