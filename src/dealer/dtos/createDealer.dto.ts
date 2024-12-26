

export interface CreateDealerDto {
  name: string;
  enterpriseDocument: string;
  email: string;
  phone: string;
  isActive: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
}
