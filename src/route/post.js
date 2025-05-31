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
// ✅ Create - Criar post
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, published, authorId } = req.body;
    try {
        const post = yield prisma.post.create({
            data: { title, content, published, authorId },
        });
        res.status(201).json(post);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar post', details: error });
    }
}));
// ✅ Read All - Listar todos os posts
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield prisma.post.findMany();
    res.json(posts);
}));
// ✅ Read One - Buscar um post por ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield prisma.post.findUnique({
            where: { id: Number(id) },
        });
        if (!post) {
            res.status(404).json({ error: 'Post não encontrado' });
            return;
        }
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro na busca', details: error });
    }
}));
// ✅ Update - Atualizar post
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, published, authorId } = req.body;
    try {
        const post = yield prisma.post.update({
            where: { id: Number(id) },
            data: { title, content, published, authorId },
        });
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar', details: error });
    }
}));
// ✅ Delete - Deletar post
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.post.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Post deletado com sucesso' });
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao deletar', details: error });
    }
}));
exports.default = router;
