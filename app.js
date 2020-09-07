import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//require('dotenv').config();

import { db } from './models/index.js';

//importa Router

import { gradeRouter } from './routes/gradeRouter.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    //vou ter que mexer neste ponto, talvez:
    origin: process.env.CORS_URL,
    //origin: 'http://localhost:8080',
  })
);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

//incluso uso de gradeRouter

app.use(gradeRouter);

app.listen(process.env.PORT || 8081, () => {});
