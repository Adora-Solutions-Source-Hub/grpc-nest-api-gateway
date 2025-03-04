import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { SendMailModule } from './modules/send-mail/send-mail.module';

@Module({
  imports: [AuthModule, MarketingModule, SendMailModule],
  providers: [AppService], // , { provide: APP_GUARD, useClass: RoleGuard }
})
export class AppModule { }
