import express from "express";
import morgan from "morgan";
import { Router } from "express";
import cors from "cors"
import bodyParser = require("body-parser");

interface ServerOptions{
    port:number;
    routes:Router
}

export class Server{
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor({port,routes}:ServerOptions){
        this.port=port;
        this.routes=routes

    }

    async start(){
        //midlewares

       /* this.app.use(
        cors({
            origin: `${envs.FRONT_URL}`, // URL del frontend
              credentials: true, // Habilita el envio de cookies
        this.  );*/
          
          this.app.use(morgan("tiny"));
          this.app.use(express.json());
          this.app.use(bodyParser.urlencoded({ extended: false }));
          this.app.use(bodyParser.json());


            //* Routes
        this.app.use("/api",this.routes);


             this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
          });
        
    }
}