import { Test, TestingModule } from '@nestjs/testing';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import axios from 'axios';

jest.mock('axios');

describe('CompanyResolver', () => {
  let companyResolver: CompanyResolver;
  let companyService: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyResolver, CompanyService],
    }).compile();

    companyResolver = module.get<CompanyResolver>(CompanyResolver);
    companyService = module.get<CompanyService>(CompanyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return nested companies with correct data', async () => {
    // Mock the axios.get method to return sample data
    const sampleCompanyData = [
      {
        id: 'uuid-1',
        createdAt: '2021-02-26T00:55:36.632Z',
        name: 'Webprovise Corp',
        parentId: '0',
      },
      {
        id: 'uuid-2',
        createdAt: '2021-02-25T10:35:32.978Z',
        name: 'Stamm LLC',
        parentId: 'uuid-1',
      },
    ];

    const sampleTravelData = [
      {
        id: 'uuid-t1',
        createdAt: '2020-08-27T00:22:26.927Z',
        employeeName: 'Garry Schuppe',
        departure: 'Saint Kitts and Nevis',
        destination: 'Pitcairn Islands',
        price: '362.00',
        companyId: 'uuid-1',
      },
      {
        id: 'uuid-t2',
        createdAt: '2020-11-08T22:44:37.483Z',
        employeeName: 'Alison Kohler Sr.',
        departure: 'Guatemala',
        destination: 'Belgium',
        price: '835.00',
        companyId: 'uuid-2',
      },
    ];

    const companyDataResponse = {
      data: sampleCompanyData,
    };

    const travelDataResponse = {
      data: sampleTravelData,
    };

    (axios.get as jest.Mock).mockResolvedValueOnce(companyDataResponse);
    (axios.get as jest.Mock).mockResolvedValueOnce(travelDataResponse);

    // Call the resolver method
    const result = await companyResolver.getNestedCompanies();
    expect(result).toEqual([
      {
        id: 'uuid-1',
        createdAt: '2021-02-26T00:55:36.632Z',
        name: 'Webprovise Corp',
        parentId: '0',
        cost: 1197,
        children: [
          {
            id: 'uuid-2',
            createdAt: '2021-02-25T10:35:32.978Z',
            name: 'Stamm LLC',
            parentId: 'uuid-1',
            cost: 835,
            children: [],
          },
        ],
      },
    ]);
  });
});
