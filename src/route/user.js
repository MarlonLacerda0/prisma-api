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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// ✅ Create - Criar usuário
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const user = yield prisma.user.create({
            data: { name, email },
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário', details: error });
    }
}));
// ✅ Read All - Listar todos os usuários
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json(users);
}));
// ✅ Read One - Buscar um usuário por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findUnique({
            where: { id: Number(id) },
        });
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro na busca', details: error });
    }
}));
// ✅ Update - Atualizar usuário
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = yield prisma.user.update({
            where: { id: Number(id) },
            data: { name, email },
        });
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar', details: error });
    }
}));
// ✅ Delete - Deletar usuário
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.user.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao deletar', details: error });
    }
}));
exports.default = router;
