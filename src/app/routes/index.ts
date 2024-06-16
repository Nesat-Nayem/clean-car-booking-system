import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.routes';
import { serviceRouter } from '../modules/service/service.routes';
import { slotRouter } from '../modules/slot/slot.routes';
import { bookingRouter } from '../modules/booking/booking.routes';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/services',
    route: serviceRouter,
  },
  {
    path: '/slots',
    route: slotRouter,
  } ,
  {
    path: '/bookings',
    route: bookingRouter,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;