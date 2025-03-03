import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    @Inject(AuthService)
    public readonly authService: AuthService;

    public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
        const req: any = ctx.switchToHttp().getRequest();
        const authorization: string = req.headers['authorization'];
        console.log("🚀 ~ AuthGuard ~ canActivate ~ authorization:", authorization)

        if (!authorization) {
            throw new UnauthorizedException();
        }

        const bearer: string[] = authorization.split(' ');

        if (!bearer || bearer.length < 2) {
            throw new UnauthorizedException();
        }

        const token: string = bearer[1];
        console.log("🚀 ~ AuthGuard ~ canActivate ~ token:", token)

        const { data, status } = await this.authService.validate(token);
        console.log("🚀 ~ AuthGuard ~ canActivate ~ userId:", data)

        req.user = data;

        if (!data || status !== 200) {
            //   throw new UnauthorizedException();
            return false;
        }

        return true;
    }
}