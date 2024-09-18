"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
const config_1 = require("../config");
class Server {
    constructor({ port, routes }) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.routes = routes;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            //midlewares
            this.app.use((0, cors_1.default)({
                origin: `${config_1.envs.FRONT_URL}`, // URL del frontend
                credentials: true, // Habilita el envio de cookies
            }));
            this.app.use((0, morgan_1.default)("tiny"));
            this.app.use(express_1.default.json());
            this.app.use(bodyParser.urlencoded({ extended: false }));
            this.app.use(bodyParser.json());
            //* Routes
            this.app.use("/api", this.routes);
            this.app.listen(this.port, () => {
                console.log(`Server running on port ${this.port}`);
            });
        });
    }
}
exports.Server = Server;
