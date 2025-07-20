import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services";
import { FileUploadMiddleware, TypeMiddleware } from "../middlewares";

export class FileUploadRoutes {

    static get routes(): Router {
        const router = Router();

        const fileUploadService = new FileUploadService();
        const fileUploadController = new FileUploadController(fileUploadService);

        router.use(FileUploadMiddleware.containFiles);
        router.use(TypeMiddleware.validTypes(['users', 'products', 'categories']));
        
        router.post('/single/:type', fileUploadController.uploadFile);
        router.post('/multiple/:type', fileUploadController.uploadMultipleFiles);

        return router;
    }
}
