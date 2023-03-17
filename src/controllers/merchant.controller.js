const merchantService = require('../services/merchant.service');
function merchantController() { }


merchantController.prototype.uploadProduct = async function (req, res) {
    try {
      if (!req.files || !req.files.file) {
        throw new Error('No file uploaded.');
      }
      const file = req.files.file;
      const product = await merchantService.uploadProduct(file);
      res.status(200).json({ product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while creating the product.' });
    }
  };

merchantController.prototype.getAllProducts = async function (req, res) {
    try {
        const products = await merchantService.getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching products.' });
    }
};

merchantController.prototype.getByDateOrIdOrSearchProduct = async function (req, res) {
    try {
        const { id, date, query } = req.query;
        const products = await merchantService.getByDateOrIdOrSearchProduct(id, date, query);
        if (!products) {
            res.status(500).json({ message: 'Product not found' });
        } else {
            res.status(200).json({ products });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the product.' });
    }
};

// merchantController.prototype.createProduct = async function (req, res) {
//     try {
//         const { product_name, product_description, product_cost, product_color, product_brand } = req.body;

//         const product = await merchantService.createProduct({
//             product_name,
//             product_description,
//             product_cost,
//             product_color,
//             product_brand,
//         });

//         res.status(200).json(product);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Unable to create product' });
//     }
// };

merchantController.prototype.updateProduct = async function (req, res) {
    const { id } = req.params;
    const { product_name, product_description, product_cost, product_color, product_brand } = req.body;

    try {
        const product = await merchantService.updateProduct(id, {
            product_name,
            product_description,
            product_cost,
            product_color,
            product_brand
        });

        if (!product) {
            return res.status(500).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unable to update product' });
    }
};

merchantController.prototype.deleteProduct = async function (req, res) {
    const { id } = req.params;

    try {
        const isDeleted = await merchantService.deleteProduct(id);

        if (!isDeleted) {
            return res.status(500).json({ message: 'Product not found' });
        }

        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to delete product' });
    }
};

module.exports = new merchantController();