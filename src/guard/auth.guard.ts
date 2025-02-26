import { Injectable, CanActivate, ExecutionContext, HttpStatus, UnauthorizedException, Inject } from '@nestjs/common';
import { ValidateResponse } from 'src/modules/auth/auth.pb';
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

        const userId = await this.authService.validate(token);
        console.log("🚀 ~ AuthGuard ~ canActivate ~ userId:", userId)

        req.user = userId;

        if (!userId) {
            //   throw new UnauthorizedException();
            return false;
        }

        return true;
    }
}