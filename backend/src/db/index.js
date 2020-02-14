const mongoose = require('mongoose');

const CONN_STRING = `mongodb+srv://dbUser:dbadmin@g5-sz0bc.mongodb.net/test?retryWrites=true&w=majority`
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const db = () => Promise.resolve(mongoose.connect(CONN_STRING, options))

db()
  .then(() => console.log('Mongo connected'))
  .catch(e => console.log('Mongo error', e.message));