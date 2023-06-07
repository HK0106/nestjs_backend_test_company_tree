import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
  formatData(companyData, travelData) {
    const companyMap = new Map();

    // Check company data and set root company with default cost = 0 and list children = []
    companyData.forEach((company) => {
      company.cost = 0;
      company.children = [];
      companyMap.set(company.id, company);
    });

    // Calculate cost for each company by companyId in travelData
    travelData.forEach((travel) => {
      const company = companyMap.get(travel.companyId);
      if (company) {
        company.cost += parseFloat(travel.price);
      }
    });

    // Loop company to check which company is children
    const nestedCompanies = [];
    companyData.forEach((company) => {
      const parentCompany = companyMap.get(company.parentId);
      if (parentCompany) {
        parentCompany.children.push(company);
      } else {
        nestedCompanies.push(company);
      }
    });

    // Calculate the cost for each company and its children
    nestedCompanies.forEach((company) => {
      company.cost = this.calculateCompanyCost(company);
    });

    return nestedCompanies;
  }

  private calculateCompanyCost(company) {
    let cost = company.cost;
    company.children.forEach((child) => {
      cost += this.calculateCompanyCost(child);
    });
    company.cost = cost;
    return cost;
  }
}
