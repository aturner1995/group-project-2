const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const session = require('express-session');
const app = express();
const routes = require('./controllers')
const fileUpload = require("express-fileupload")

const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
// Session store implementation for the express-session middleware in Node.js
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Create instance of express handlebars with custom helpers passed to all templates
const hbs = exphbs.create({});
// Create the session and associate to the storage above
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
// Express middleware
app.use(session(sess));
app.use(fileUpload())
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'profilepicuploads')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


