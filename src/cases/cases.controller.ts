import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CasesService } from './cases.service';
import { CaseStatus } from './entities/case-record.entity';

@Controller('cases')
@UseGuards(AuthGuard)
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDto) {
    return this.casesService.create(createCaseDto);
  }

  @Get()
  findAll(@Query('status') status?: CaseStatus) {
    return this.casesService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto) {
    return this.casesService.update(id, updateCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.casesService.remove(id);
    return { message: 'Case removed successfully' };
  }
}
