import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MarketingModule } from './modules/marketing/marketing.module';

@Module({
  imports: [AuthModule, MarketingModule],
  providers: [AppService], // , { provide: APP_GUARD, useClass: RoleGuard }
})
export class AppModule { }
