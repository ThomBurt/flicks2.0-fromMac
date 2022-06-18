const express = require('express');
const routes = require('./controllers');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware, authCheckMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const cloudinary = require('cloudinary');


// cors
var cors = require('cors');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();



// Cors
app.use(cors());
// body parse middleware
app.use(bodyParser.json({ limit: '5mb' }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// turn on routes
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/movie', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/dinner', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/drink', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/welcome', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


//upload image to cloudinary
app.post('/uploadimages', (req, res) => {
  cloudinary.uploader.upload(
      req.body.image,
      (result) => {
          console.log(result);
          res.send({
              // url: result.url,
              url: result.secure_url,
              public_id: result.public_id
          });
      },
      {
          public_id: `${Date.now()}`, // public name
          resource_type: 'auto' // JPEG, PNG
      }
  );
});

// remove image
app.post('/removeimage', (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
      if (error) return res.json({ success: false, error });
      res.send('ok');
  });
});



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});


