import routerx from 'express-promise-router';
import usuarioRouter from './usuario';
import tareaRouter from './tarea';

const router = routerx();

router.use('/usuario', usuarioRouter);
router.use('/tarea', tareaRouter);

export default router;