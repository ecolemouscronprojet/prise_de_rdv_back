const express = require('express');
const router = express.Router();

const controller = require('../controllers/office');

router.get('/office', controller.getAll);
router.get('/office/:id', controller.get);
router.post('/office', controller.add);
router.put('/office/:id', controller.edit);
router.delete('/office/:id', controller.remove);

module.exports = router;