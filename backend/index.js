import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import pessoasView from './Views/pessoasView.js';

import sgMail from "@sendgrid/mail"


dotenv.config();

const app = express();


app.use(cors())

mongoose.connect(process.env.MONGOOSE_KEY)
.then(() => {
    console.log("Conectado ao banco de dados.");
    app.use(bodyParser.json({extended: false}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.json({extended: false}));
    
    app.use('/pessoas', pessoasView)
    
    app.listen(process.env.PORT, () => {
        console.log(`O programa está escutando na porta ${process.env.PORT}`);
    })
})
.catch(err => {
    console.log("Erro ao conectar com a base de dados", err);
    process.exit(1);
})