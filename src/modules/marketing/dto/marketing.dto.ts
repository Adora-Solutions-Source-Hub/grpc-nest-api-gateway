/** @format */

import { ApiProperty } from '@nestjs/swagger';
import { CreateBriefRequest } from '../marketing.pb';
import { Type } from 'class-transformer';

export class CreateCampaignDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  @Type(() => CreateBriefReq)
  brief: CreateBriefRequest;
}

export class CreateBriefReq {

  @ApiProperty()
  businessDomain: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  productName: string;

  @ApiProperty()
  marketLocation: string;

  @ApiProperty()
  projectDescription: string;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  brandName: string;

  @ApiProperty()
  campaignStart: string;

  @ApiProperty()
  campaignEnd: string;

  @ApiProperty()
  budget: string;

  @ApiProperty()
  targetAudience: string[];

  @ApiProperty()
  competitors: string[];

  @ApiProperty()
  differentiation: string[];

  @ApiProperty()
  pastCampaign: string[];

  @ApiProperty()
  additionalRequirements: string[];

  @ApiProperty()
  socialMediaLink: string;


}

