"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTadapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envs_1 = require("./envs");
const SECRET = envs_1.envs.JWT_SECRET;
class JWTadapter {
    static generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: '24h' });
    }
    static validateJWT(token) {
        try {
            return jsonwebtoken_1.default.verify(token, SECRET);
        }
        catch (error) {
            console.error('Invalid JWT token:', error);
            return null;
        }
    }
}
exports.JWTadapter = JWTadapter;
