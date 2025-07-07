import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";


export class AuthService {

    constructor(
        private readonly emailService: EmailService,
    ) {}

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if (existUser) throw CustomError.badRequest('Email already exists');
        
        try {
            const user = new UserModel(registerUserDto);
            user.password = bcryptAdapter.hash(registerUserDto.password);
            await user.save();

            await this.sendEmailValidationLink(user.email);

            const { password, ...userEntity } = UserEntity.fromObject(user);

            const token = await JwtAdapter.generateToken({ id: userEntity.id });
            if (!token) throw CustomError.internalServer('Error creating JWT');

            return { 
                user: userEntity,
                token: token
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser(loginUserDto: LoginUserDto) {
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if (!user) throw CustomError.badRequest('Email and password incorrect');
        
        const passwordMatches = bcryptAdapter.compare(loginUserDto.password, user.password);
        if (!passwordMatches) throw CustomError.badRequest('Email and password incorrect');
        
        const { password, ...userEntity } = UserEntity.fromObject(user);

        const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });
        if (!token) throw CustomError.internalServer('Error creating JWT');
        
        return { 
            user: userEntity,
            token: token
        };
    }

    private async sendEmailValidationLink(email: string) {
        const token = await JwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internalServer('Error creating JWT');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = `
            <h1>Confirm your email!</h1>
            <p>Please, click on the following link to confirm your email address.</p>
            <a href="${link}">Click to confirm email</a>
        `;

        const options = {
            to: email,
            subject: 'Email confirmation',
            htmlBody: html
        }

        const isSent = await this.emailService.sendEmail(options);
        if (!isSent) throw CustomError.internalServer('Error sending email');

        return true;
    }

    public async validateEmail(token: string) {
        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.badRequest('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer('Error getting email from token');

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.internalServer('Email does not exist');

        user.emailValidated = true;
        await user.save();

        return true;
    }
}
