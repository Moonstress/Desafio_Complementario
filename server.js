import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.engine('handlebars', handlebars.engine())


// app.set('view engine', 'handlebars')
// app.set('views', __dirname + '/views')


//_______________________________ handlebars

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
// console.log(__dirname)
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')

//_______________________________

app.get('/', (req, res)=>{
    res.render('index', {
        name: 'federico'
    })
})
app.get('/realtimeproduct', (req, res)=>{
    res.render('realTimeProduct')
})

httpServer.listen(PORT, ()=>{
    console.log('escuchando en el puerto '+PORT)
})

const mensajes = [
    // {user: 'fede', message: 'hola'}
]

io.on('connection', socket => {
    console.log('nuevo cliente conectado')

    socket.on('message', data => {
        // console.log(data)
        mensajes.push(data)
        io.emit('messageLogs', mensajes)
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })
})
