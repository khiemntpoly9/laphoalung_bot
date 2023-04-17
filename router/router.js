const express = require('express');
const router = express.Router();

const mailController = require('../controllers/mainController');
// const userController = require('../controllers/userController');
// const cateController = require('../controllers/cateController');
// const productController = require('../controllers/productController');
// const brandController = require('../controllers/brandController');
// const mailController = require('../mail/mailApp');

// Middleware
// const authToken = require('../middleware/authenticateToken');
// const userToken = require('../middleware/getForUserToken');
// const authenticateToken = require('../middleware/authenticateToken');
// Áp dụng middleware để xác thực tính hợp lệ của token cho tất cả các tài nguyên bảo vệ
// router.use(authToken);

router.get('/', (req, res) => {
	res.send('Server đang chạy trên Port 3000!');
});

router.get('/webhook', mailController.getWebhook);
router.post('/webhook', mailController.postWebhook);

// Định nghĩa route Product
// router.post('/product/create', authToken.manageRole, productController.createProduct);
// router.post('/product/create', productController.createProduct);
// router.put('/product/update', productController.updateProduct);
// router.delete('/product/del', productController.deleteProduct);
// router.get('/products', productController.getAllProduct);
// router.get('/product', productController.getProductById);
// router.get('/product/catechild', productController.getProdByCateChildId);
// router.get('/product/cate', productController.getProdByCateId);
// router.get('/products-price', productController.filterProductPrice);
// router.get('/search-product', productController.searchProduct);

// Định nghĩa route Category
// router.post('/category/create', cateController.createCate);
// router.get('/categorys', cateController.getAllCate);
// router.get('/category', cateController.getCateById);
// router.put('/category/update', cateController.updateCate);
// router.delete('/category/del', cateController.deleteCate);

// Định nghĩa route User
// router.post('/auth', authToken.authLogin);
// router.post('/logout', authToken.authLogout);
// router.post('/checkuser', authenticateToken.checkUserRole);
// User, Role
// router.get('/users', authToken.adminRole, userController.getAllUsers);
// router.get('/user', userToken.getInfoUser, userController.getUserById);
// router.get('/user-manage', userController.getUserByIdManage);
// router.get('/listrole', userController.getRoleDetail);
// router.post('/createuser', authToken.createUser);
// router.post('/forgotpass', authToken.checkUser, userController.forgotpass);
// router.post('/checkcode', userController.checkCodeForgot);
// router.post('/changepassnew', userController.changeNewPass);
// router.put('/updateuser', userController.updateUser);
// router.put('/changepass', userController.changePassword);
// router.put('/changerole', userController.changeRole);
// router.delete('/deleteuser', userController.deleteUser);
// Brand
// router.get('/brands', brandController.getAllBrand);

// Test mail
// router.get('/mail', mailController.createAccount);

// API Bảo Vệ
// const baoveController = require('../controllers/baoveController');
// router.get('/getall-item', baoveController.getAllItem);
// router.get('/detail-item', baoveController.detailItem);
// router.post('/create-item', baoveController.createItem);
// router.put('/update-item', baoveController.updateItem);
// router.delete('/delete-item', baoveController.deleteItem);

module.exports = router;