import {
  Injectable,
  NotFoundException,
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
    const now = new Date().toISOString();
    const existingCase = this.findOne(id);
    const caseToSave = {...existingCase, ..._updateCaseDto, updatedAt: now};

    this.cases.set(existingCase.id, caseToSave);

    return caseToSave;
  }

  remove(_id: string): void {
    this.findOne(_id);
    this.cases.delete(_id);    
  }
}
