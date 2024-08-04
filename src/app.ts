import {syncDatabase} from  './middleware/pgconnect'
import bodyParser from"body-parser";
import UserRouter from './routes/userroute'
import express,{Application} from "express";
import dotenv from 'dotenv';
import interactionRoutes from './routes/interactionroute'
import sortroute from './routes/sort-filterRoute'
import cookieParser from 'cookie-parser';
const app:Application= express()

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); 

dotenv.config({
    path: "/privacy/.env",
  });;
app.use('/api', sortroute);
app.use('/api', UserRouter);  
app.use('/api', interactionRoutes);
syncDatabase()





const PORT:number=5000
app.listen(PORT,()=>{
    console.log( `app is running on http://localhost:${PORT}`) 
}) 