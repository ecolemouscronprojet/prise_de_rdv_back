const express = require('express');
const router = express.Router();

const controller = require('../controllers/office-availability');

router.get('/office-availability', controller.getAll);
router.get('/office-availability/:id', controller.get);
router.post('/office-availability', controller.add);
router.put('/office-availability/:id', controller.edit);
router.delete('/office-availability/:id', controller.remove);

module.exports = router;