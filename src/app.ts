
import express, {Application, Request,Response} from 'express';
import router from './app/routes';
import notFound from './app/middlewares/notFound';

const app:Application = express();

// parsers
app.use(express.json());


// application routes

app.use('/api',router)

const entryRoute = (req:Request, res:Response)=>{
    const message = 'Surver is running...';
    res.send(message)
}

app.get('/', entryRoute)

//Not Found
app.use(notFound);

export default app;