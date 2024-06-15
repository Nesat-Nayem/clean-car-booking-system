import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello From Services Route!');
});

export const serviceRoutes = router;