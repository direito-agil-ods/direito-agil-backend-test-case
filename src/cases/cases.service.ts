import { Injectable, NotFoundException } from '@nestjs/common';
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

  update(id: string, updateCaseDto: UpdateCaseDto): CaseRecord {
    const caseRecord = this.cases.get(id);

    if (!caseRecord) {
      throw new NotFoundException(`Case "${id}" was not found`);
    }

    const now = new Date().toISOString();

    const updatedCase: CaseRecord = {
      ...caseRecord,
      title: updateCaseDto.title ?? caseRecord.title,
      description: updateCaseDto.description ?? caseRecord.description,
      status: updateCaseDto.status ?? caseRecord.status,
      updatedAt: now,
    };

    this.cases.set(id, updatedCase);
    return updatedCase;
  }

  remove(id: string): void {
    if (!this.cases.has(id)) {
      throw new NotFoundException(`Case "${id}" was not found`);
    }

    this.cases.delete(id);
  }
}
