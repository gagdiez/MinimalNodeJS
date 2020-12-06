// setup the package variables
const express    = require('express');
const fetch      = require('node-fetch');
const bodyParser = require('body-parser');
const cors       = require('cors');

// initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// If they try to access /specific answer differently
app.get('/specific', (req, res) => {
  res.sendFile(__dirname + '/www/specific.html')
});

// When any route (besides /specific) is accesed, we return index.html
app.get('/*', (req, res) => {
  // index.html explains how the server works
  res.sendFile(__dirname + '/www/index.html')
});

// When the method PUT is called in root, we process it
app.put('/', (req, res) => {
  // our API expects the body to include a name and last name
  const NAME = req.body['name'];
  const LASTNAME = req.body['lastname'];
  
  // Do something with the parameters
  
  // Return a json object as response
  res.send({message: `Nice to meet you ${NAME} ${LASTNAME}`})
});

// Start the app
app.listen(process.env.PORT, () => console.log('server started'));
