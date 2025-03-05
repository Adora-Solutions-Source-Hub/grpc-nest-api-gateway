/** @format */

import { Body, Controller, Inject } from '@nestjs/common';
// import { SendMailService } from './send-mail.service';
import { ApiTags } from '@nestjs/swagger';
import { SEND_MAIL_SERVICE_NAME, SendMailServiceClient } from './send-mail.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { DefaultPost } from 'src/base/controller/base.controller';

@Controller('send-mail')
@ApiTags('Send-Mail')
export class SendMailController {
  // private sendMailClient: SendMailServiceClient;
  // @Inject(SEND_MAIL_SERVICE_NAME)
  // private readonly client: ClientGrpc;
  // public onModuleInit(): void {
  //   this.sendMailClient = this.client.getService<SendMailServiceClient>(SEND_MAIL_SERVICE_NAME);
  // }
  // @DefaultPost('')
  // private async register(@Body() body: RegisterRequestDto) {
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
