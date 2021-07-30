const router = require('express').Router();
const bannerRouter = require('./banner.router');
const categoryRouter = require('./category.router');
const pictureRouter = require('./picture.router');
const projectRouter = require('./project.router');
const styleRouter = require('./style.router');
const adminLoginRouter = require('./admin_login.router');

router.get('/', (req, res) => {
  res.json({ msg: 'Masuk pak Eko' });
});

router.use('/banners', bannerRouter);
router.use('/categories', categoryRouter);
router.use('/pictures', pictureRouter);
router.use('/projects', projectRouter);
router.use('/styles', styleRouter);
router.use('/login', adminLoginRouter);

module.exports = router;
