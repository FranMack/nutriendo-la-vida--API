import { envs } from "./config";
import { MongoDataBase } from "./data/Mongo/mongo-database";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDataBase.conect({ mongoUrl: envs.MONGO_URL });

  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });
  server.start();
}
