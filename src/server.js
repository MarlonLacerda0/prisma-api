"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./route/user"));
const post_1 = __importDefault(require("./route/post"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use('/users', user_1.default);
app.use('/posts', post_1.default);
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
//teste
