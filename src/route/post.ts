import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// ✅ Create - Criar post
router.post('/', async (req: Request, res: Response) => {
  const { title, content, published, authorId } = req.body;

  try {
    const post = await prisma.post.create({
      data: { title, content, published, authorId },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar post', details: error });
  }
});

// ✅ Read All - Listar todos os posts
router.get('/', async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

// ✅ Read One - Buscar um post por ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      res.status(404).json({ error: 'Post não encontrado' });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Erro na busca', details: error });
  }
});

// ✅ Update - Atualizar post
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, published, authorId } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, published, authorId },
    });

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar', details: error });
  }
});

// ✅ Delete - Deletar post
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Post deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar', details: error });
  }
});

export default router;
