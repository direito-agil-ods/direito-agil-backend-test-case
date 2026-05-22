export type CaseStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED';

export interface CaseRecord {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
}
