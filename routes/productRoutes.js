
const express = require("express")
const router = express.Router()
const productController = require("../controllers/productContoller")

router.post('/add-product/:firmId', productController.addProduct)
router.get('/:firmId/products', productController.getAllProductsByFirm) 

router.get('/uploads/:imageName', (req,res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg')
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
})

router.delete('/:productId', productController.deleteProductById)


module.exports = router;