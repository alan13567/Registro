import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';

//Coenxión a la base de datos MongoDB
mongoose.Promise = global.Promise;
const dbURL = 'mongodb://localhost:27017/ToDoList_MEVN'
mongoose.connect(dbURL, { useCreateIndex: true, useNewUrlParser: true }).then(mongoose => console.log("Conectado a la BD en el puerto 27017")).catch(err => console.log(err));

const app = express();

app.use(morgan('dev'));
app.use(cors());

//PERMITIR PETICIONES JSON A TRAVÉS DE POST
app.use(express.json());
app.use(express.urlencoded({ extendes: true }));
//Indicamos cual es la carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

//Cuando vayamos a /api, que gestione el router
app.use('/api', router);

//Indicamos puerto
app.set('port', process.env.PORT | 3000);

//Abrimos server
app.listen(app.get('port'), () => {
    console.log('server ejecutandose en el puerto ' + app.get('port'));
});