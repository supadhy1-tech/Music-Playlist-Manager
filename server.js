const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helmet = require('helmet');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
require('dotenv').config();

// Load sequelize config (make sure ./config/database.js exports sequelize properly)
const { sequelize } = require('./config/database');

// Import routes
const routes = require('./routes');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // If you have static files

// Session middleware — make sure this comes BEFORE routes
const sessionSecret = process.env.SESSION_SECRET || 'SuperSecret123!';

app.use(
  session({
    secret: sessionSecret, // ensure this is always defined
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: new SequelizeStore({ db: sequelize }),
  })
);

// Handlebars setup (optional if you're using views)
const hbs = exphbs.create({
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use(routes);
// Handle 404
app.use((req, res) => {
  res.status(404).render('404',{
    layout:false
  });
});


// Sync sequelize and start server
sequelize.sync({ force:false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
