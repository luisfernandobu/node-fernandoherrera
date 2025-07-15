import { Request, Response } from "express";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { ProductService } from "../services";

export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {}

    private readonly handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }

        console.log(`${error}`);
        res.status(500).json('Internal server error');
    }

    createProduct = (req: Request, res: Response): void => {
        const [ error, createProductDto ] = CreateProductDto.create({
            ...req.body,
            user: req.body.user.id
        });

        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.productService.createProduct(createProductDto!)
            .then(product => res.status(201).json(product))
            .catch(error => this.handleError(error, res));
    }
    
    getProducts = (req: Request, res: Response): void => {
        const { page = 1, limit = 10 } = req.query;
        const [ error, paginationDto ] = PaginationDto.create(+page, +limit);
        
        if (error) {
            res.status(400).json({ error })
        }

        this.productService.getProducts(paginationDto!)
            .then(products => res.json(products))
            .catch(error => this.handleError(error, res));
    }
}
