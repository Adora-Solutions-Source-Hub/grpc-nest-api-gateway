import { Inject, Injectable } from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthServiceClient, ValidateResponse } from './auth.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    private authClient: AuthServiceClient;

    @Inject(AUTH_SERVICE_NAME)
    private readonly grpcClient: ClientGrpc;

    public onModuleInit(): void {
        this.authClient = this.grpcClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    public async validate(token: string) {
        console.log("🚀 ~ AuthService ~ validate ~ token:", token)
        const payload = { token }
        const rs = await this.authClient.validate(payload).toPromise();
        console.log("🚀 ~ AuthService ~ validate ~ rs:", rs)
        return rs;
        // return firstValueFrom(rs.data);
    }
}
