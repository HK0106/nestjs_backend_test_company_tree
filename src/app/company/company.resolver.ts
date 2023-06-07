import { Resolver, Query } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import axios from 'axios';
import {
  API_COMPANY_DATA,
  API_TRAVEL_DATA,
} from '../../common/constant/externalApiPath';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query(() => [Company])
  async getNestedCompanies(): Promise<Company[]> {
    //Get CompanyData
    const companyDataResponse = await axios.get(API_COMPANY_DATA);
    const companyData = companyDataResponse.data;
    const travelDataResponse = await axios.get(API_TRAVEL_DATA);
    const travelData = travelDataResponse.data;

    return this.companyService.formatData(companyData, travelData);
  }
}
