import routerx from 'express-promise-router';
import TareaController from '../controllers/TareaController';

const router = routerx();

router.post('/crear', TareaController.add);
router.get('/listar', TareaController.query);
router.post('/terminada', TareaController.terminada);
router.post('/deshacer', TareaController.deshacer);

export default router;