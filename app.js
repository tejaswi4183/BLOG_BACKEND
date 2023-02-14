const express = require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


//express app
const app = express();

//import Routes
const authRoute=require('./routes/auth');
const postRoute = require('./routes/posts');

//coonect to mongodb
const dbURI ='mongodb+srv://netninja:test1234@cluster0.dkkurey.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));


app.use(express.json());
// register view engine
app.set('view engine', 'ejs');
// register view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//Route Middlewares
app.use('/api/user',authRoute);

app.use('/api/posts', postRoute);

// app.set('views', 'myviews');if we give ejs files in another folder like myviews

// middleware & static files

app.use((req, res, next) => {
res.locals.path = req.path;
next();
});

//routes
app.get('/', (req, res) => {
// res.send('<p>home page</p>');
//res.sendFile('./views/index.html', { root: __dirname });
res.redirect('/blogs');
});

app.get('/about', (req, res) => {
// res.send('<p>about page</p>');
//res.sendFile('./views/about.html', { root: __dirname });
res.render('about',{title:'About'});
});

// redirects
//app.get('/about-us', (req, res) => {
 // res.redirect('/about');
//});

//blog routes
// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
res.status(404).render('404', { title: '404' });
});