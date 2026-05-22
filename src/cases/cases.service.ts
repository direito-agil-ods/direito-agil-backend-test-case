import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CaseRecord, CaseStatus } from './entities/case-record.entity';

@Injectable()
export class CasesService {
  private readonly cases = new Map<string, CaseRecord>();

  create(createCaseDto: CreateCaseDto): CaseRecord {
    const now = new Date().toISOString();
    const id = randomUUID();

    const caseRecord: CaseRecord = {
      id,
      title: createCaseDto.title,
      description: createCaseDto.description,
      status: createCaseDto.status ?? 'OPEN',
      createdAt: now,
      updatedAt: now,
    };

    this.cases.set(id, caseRecord);
    return caseRecord;
  }

  findAll(status?: CaseStatus): CaseRecord[] {
    const allCases = [...this.cases.values()];

    if (!status) {
      return allCases;
    }

    return allCases.filter((caseRecord) => caseRecord.status === status);
  }

  findOne(id: string): CaseRecord {
    const caseRecord = this.cases.get(id);

    if (!caseRecord) {
      throw new NotFoundException(`Case "${id}" was not found`);
    }

    return caseRecord;
  }

  update(id: string, _updateCaseDto: UpdateCaseDto): CaseRecord {
    // TODO (Task 3): implement update logic for title/description/status.
    // Required:
    // - Return 404 when case does not exist.
    // - Update only received fields.
    // - Update "updatedAt" timestamp.
    throw new NotImplementedException('Case update is not implemented yet');
  }

  remove(_id: string): void {
    // TODO (Task 3): implement delete logic.
    // Required:
    // - Return 404 when case does not exist.
    // - Remove the case from in-memory storage.
    throw new NotImplementedException('Case delete is not implemented yet');
  }
}
