import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MARKETING_PACKAGE_NAME, MARKETING_SERVICE_NAME } from './marketing.pb';
import { MarketingController } from './marketing.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: MARKETING_SERVICE_NAME,
                transport: Transport.GRPC,
                options: {
                    url: '0.0.0.0:50052',
                    package: MARKETING_PACKAGE_NAME,
                    protoPath: 'node_modules/grpc-nest-proto/proto/marketing.proto',
                },
            },
        ]),
    ],
    controllers: [MarketingController],
})
export class MarketingModule { }
