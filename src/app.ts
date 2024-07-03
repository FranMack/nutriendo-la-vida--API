import {Server} from "./presentation/server"
import { envs } from "./config"
import { AppRoutes } from "./presentation/routes"
import { MongoDataBase } from "./data/Mongo/mongo-database"

(()=>{
    main()
})()

async function main(){

    await MongoDataBase.conect({mongoUrl:envs.MONGO_URL})

    const server =new Server({port:envs.PORT,routes:AppRoutes.routes})
    server.start()
    
    console.log("Hola MUNDO")}