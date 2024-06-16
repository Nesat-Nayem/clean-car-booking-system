import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { serviceRouter } from '../modules/service/service.routes';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/service',
    route: serviceRouter,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;