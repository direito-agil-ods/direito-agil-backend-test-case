import { CaseStatus } from '../entities/case-record.entity';

export interface CreateCaseDto {
  title: string;
  description: string;
  status?: CaseStatus;
}
