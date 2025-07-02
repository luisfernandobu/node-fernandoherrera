import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";


export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ) {}

    private readonly handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }

        console.log(`${error}`);
        res.status(500).json('Internal server error');
    }

    registerUser = (req: Request, res: Response) => {
        const [ error, registerUserDto ] = RegisterUserDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.authService.registerUser(registerUserDto!)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res));
    }
    
    loginUser = (req: Request, res: Response) => {
        const [ error, loginUserDto ] = LoginUserDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        this.authService.loginUser(loginUserDto!)
            .then((user) => res.json(user))
            .catch((error) => this.handleError(error, res));
    }

    validateEmail = (req: Request, res: Response) => {
        res.json('validateEmail');
    }
}
