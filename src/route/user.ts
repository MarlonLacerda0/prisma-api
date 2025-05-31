import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// ✅ Create - Criar usuário
router.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar usuário', details: error });
  }
});

// ✅ Read All - Listar todos os usuários
router.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// ✅ Read One - Buscar um usuário por ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erro na busca', details: error });
  }
});

// ✅ Update - Atualizar usuário
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar', details: error });
  }
});

// ✅ Delete - Deletar usuário
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar', details: error });
  }
});

export default router;
