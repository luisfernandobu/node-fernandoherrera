import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService,
    ) {}

    private readonly handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }

        console.log(`${error}`);
        res.status(500).json({ error: 'Internal server error' });
    }

    uploadFile = (req: Request, res: Response): void => {
        const type = req.params.type;
        const file = req.body.files[0] as UploadedFile;
        
        this.fileUploadService.uploadSingle(file, `uploads/${type}`)
            .then(uploaded => res.json(uploaded))
            .catch(error => this.handleError(error, res));
    }
    
    uploadMultipleFiles = (req: Request, res: Response): void => {
        const type = req.params.type;
        const files = req.body.files as UploadedFile[];
        
        this.fileUploadService.uploadMultiple(files, `uploads/${type}`)
            .then(uploaded => res.json(uploaded))
            .catch(error => this.handleError(error, res));
    }
}
