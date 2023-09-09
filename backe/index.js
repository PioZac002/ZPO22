import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT, mongoDBURL } from './config.js';
import { connectToMongo } from './database.js';
import router from './router.js';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname + 'public')));
app.use(express.json());
app.use(router);

connectToMongo();

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('POLSKA GUROM');
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
