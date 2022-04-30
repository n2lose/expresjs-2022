require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

const auth = require('./middlewares/authenticate.middleware');

const userRoutes = require('./routes/users.route');
const authRoutes = require('./routes/auth.route');
const productRoute = require('./routes/products.route')

const port = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SECRET_KEY));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/users', auth.requiredAuthenticate, userRoutes);
app.use('/error', (req, res) => { 
    res.render('error')
});
app.use('/auth', authRoutes);
app.use('/products', productRoute);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});