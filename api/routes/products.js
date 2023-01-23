const express = require('express');
const router = express.Router();
const multer = require('multer'); //image upload package
const auth = require('../auth/auth');

const ProductsController = require('../controllers/products')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }   
});

//file filter for image upload
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage: storage, fileFilter: fileFilter,  limits: {
    fileSize: 1024*1024*5
}});

router.get('/', ProductsController.products_get_all);

router.post('/', auth, upload.single('productImage'), ProductsController.products_post);

router.get('/:productId', ProductsController.products_get_single);

router.patch('/:productId', auth, ProductsController.products_update);

router.delete('/:productId', auth, ProductsController.products_delete);

module.exports = router; //allows router to be used globally in other files