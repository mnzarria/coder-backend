import { productsModel } from "../db/models/products.model.js";
class ProductManager {
  // async getAllProducts() {
  //   try {
  //     const products = await productsModel.find().lean();
  //     return products;
  //   } catch (error) {
  //     console.log(`Error en getAll: ${error.message}`);
  //   }
  // }

  async getProducts(limit, page, sort, query) {
    try {
      const search = query
        ? {
            stock: { $gt: 0 },
            $or: [
              { category: { $regex: query, $options: "i" } },
              { title: { $regex: query, $options: "i" } },
            ],
          }
        : { stock: { $gt: 0 } };

      if (sort === "asc") {
        sort = { price: 1 };
      } else if (sort === "desc") {
        sort = { price: -1 };
      }

      const options = {
        page: page || 1,
        limit: limit || 10,
        sort: sort,
        lean: true,
      };

      const products = await productsModel.paginate(search, options);
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    try {
      const product = await productsModel.findById(id);
      return product;
    } catch (error) {
      console.log(`Error en getProductById: ${error.message}`);
      console.log(id)
    }
  }

  async addProduct(product) {
    try {
      const newProduct = new productsModel(product);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.log(`Error en addProduct: ${error.message}`);
    }
  }

  async updateProductById(id, update) {
    try {
      const updatedProduct = await productsModel.findOneAndUpdate(id, update, {
        new: true,
      });
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(id) {
    try {
      const product = await productsModel.findByIdAndDelete(id);
      return product;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManager;
