import { ProductModel } from "../../data";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";

export class ProductService {

    async createProduct(createProductDto: CreateProductDto) {
        const productExists = await ProductModel.findOne({ name: createProductDto.name });
        if (productExists) throw CustomError.badRequest('Product already exists');

        try {
            const product = new ProductModel({
                ...createProductDto
            });

            await product.save();

            return product;
        } catch (error) {
            console.log(`Error creating product: ${error}`);
            throw CustomError.internalServer('Internal server error');
        }
    }

    async getProducts(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;

        try {
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .populate('user')
                    .populate('category')
            ]);

            return {
                page: page,
                limit: limit,
                total: total,
                next: ((total/limit) > page) ? `/api/products?page=${ (page + 1) }&limit=${ limit }` : null,
                prev: (page > 1) ? `/api/products?page=${ (page - 1) }&limit=${ limit }` : null,
                products: products
            }
        } catch (error) {
            console.log(`Error getting products: ${error}`);
            throw CustomError.internalServer('Internal server error');
        }
    }
}
