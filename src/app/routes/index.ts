import { Router } from 'express';
import { serviceRoutes } from '../modules/service/service.routes';
import { bookingRoutes } from '../modules/booking/booking.routes';

const router = Router();
const moduleRoutes = [
  {
    path: '/services',
    route: serviceRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;