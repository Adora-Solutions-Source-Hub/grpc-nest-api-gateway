/** @format */

import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: number;
}

