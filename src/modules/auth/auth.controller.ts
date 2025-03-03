import { Body, Controller, Inject, NotFoundException, OnModuleInit } from '@nestjs/common';
import { DefaultPost } from "src/base/controller/base.controller";
import { AUTH_SERVICE_NAME, AuthServiceClient } from './auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginRequestDto, RegisterRequestDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController implements OnModuleInit {
    private authClient: AuthServiceClient;

    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.authClient = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    @DefaultPost('register')
    private async register(@Body() body: RegisterRequestDto) {
        console.log("🚀 ~ AuthController ~ register ~ body:", body)
        try {
            const { data, status, error } = await this.authClient.register(body).toPromise();
            console.log("🚀 ~ AuthController ~ register ~ data, error, status:", data, status)
            return { data, status, message: error };
        } catch (err: any) {
            console.log("🚀 ~ AuthController ~ register ~ err:", err)
            return err
        }
    }

    @DefaultPost('login')
    private async login(@Body() body: LoginRequestDto) {
        console.log("🚀 ~ AuthController ~ login ~ body:", body)
        const { data, error, status } = await this.authClient.login(body).toPromise();
        console.log("🚀 ~ AuthController ~ login ~ auth:", data, error, status);
        if (!data?.accessToken) {
            throw new NotFoundException("User or Password is not exists!");
        }
        return data;
    }
}
