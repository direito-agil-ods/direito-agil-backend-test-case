import { CaseStatus } from '../entities/case-record.entity';

export interface UpdateCaseDto {
  title?: string;
  description?: string;
  status?: CaseStatus;
}
