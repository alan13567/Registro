import routerx from 'express-promise-router';
import usuarioController from '../controllers/UsuarioController';

const router = routerx();

router.post('/login', usuarioController.login);
router.post('/registro', usuarioController.registro);

export default router;