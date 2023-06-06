require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { generateHobby, getHobbies, saveHobby } = require('./controllers/controllers.js')


const app = express();
app.use(morgan('dev'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, '../client/dist')));


const router = express.Router();
app.use(router);

router.post('/hobby', generateHobby)
router.get('/hobby/:uid', getHobbies)
router.post('/saveHobby', saveHobby)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});

