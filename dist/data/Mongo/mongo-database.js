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
exports.MongoDataBase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDataBase {
    static conect(_a) {
        return __awaiter(this, arguments, void 0, function* ({ mongoUrl }) {
            try {
                yield mongoose_1.default.connect(mongoUrl);
                console.log("Mongo conected");
                return;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.MongoDataBase = MongoDataBase;
