/** @format */

import { Controller } from '@nestjs/common';
// import { SendMailService } from './send-mail.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('send-mail')
@ApiTags('Send Mail')
export class SendMailController {
  // private authClient: AuthServiceClient;
  // @Inject(AUTH_SERVICE_NAME)
  // private readonly client: ClientGrpc;
  // public onModuleInit(): void {
  //   this.authClient = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  // }
  // @DefaultPost('register')
  // private async register(@Body() body: RegisterRequestDto) {
  //   console.log('🚀 ~ AuthController ~ register ~ body:', body);
  //   try {
  //     const { data, status, error } = await this.authClient.register(body).toPromise();
  //     console.log('🚀 ~ AuthController ~ register ~ data, error, status:', data, status);
  //     return { data, status, message: error };
  //   } catch (err: any) {
  //     console.log('🚀 ~ AuthController ~ register ~ err:', err);
  //     return err;
  //   }
  // }
}
