import { Body, Controller, Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { CreateMarketingRequest, CreateMarketingResponse, MARKETING_SERVICE_NAME, MarketingServiceClient } from './marketing.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { DefaultPost } from 'src/base/controller/base.controller';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('marketing')
export class MarketingController implements OnModuleInit {

    private svc: MarketingServiceClient;

    @Inject(MARKETING_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.svc = this.client.getService<MarketingServiceClient>(MARKETING_SERVICE_NAME);
    }


    @DefaultPost("")
    @UseGuards(AuthGuard)
    private async createMarketing(@Body() body: CreateMarketingRequest): Promise<Observable<CreateMarketingResponse>> {
        return this.svc.createMarketing(body);
    }
}
