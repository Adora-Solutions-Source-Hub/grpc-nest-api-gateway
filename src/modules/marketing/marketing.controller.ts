import { Body, Controller, Inject, OnModuleInit, Req, UseGuards } from '@nestjs/common';
import { CreateCampaignResponse, MARKETING_SERVICE_NAME, MarketingServiceClient } from './marketing.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { DefaultPost } from 'src/base/controller/base.controller';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateCampaignDto } from './dto/marketing.dto';

@Controller('marketing')
export class MarketingController implements OnModuleInit {

    private marketingClient: MarketingServiceClient;

    @Inject(MARKETING_SERVICE_NAME)
    private readonly client: ClientGrpc;

    public onModuleInit(): void {
        this.marketingClient = this.client.getService<MarketingServiceClient>(MARKETING_SERVICE_NAME);
    }

    @DefaultPost("/campaign")
    @UseGuards(AuthGuard)
    private async createCampaign(@Req() req, @Body() body: CreateCampaignDto): Promise<Observable<CreateCampaignResponse>> {
        console.log("🚀 ~ MarketingController ~ createCampaign ~ body:", body, req.user)
        return this.marketingClient.createCampaign({ ...body, userId: req.user });
    }
}
