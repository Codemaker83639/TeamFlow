import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetReportQueryDto, TimeRange } from './dto/get-report-query.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @Get()
  getReports(@Req() request: Request) {
    const query = request.query;

    const queryDto: GetReportQueryDto = {
      timeRange: (query.timeRange as TimeRange) || TimeRange.WEEKLY,
      userId: query.userId as string,
      teamId: query.teamId as string,
    };

    // --- ESPÍA #1 ---
    console.log('\n--- CONTROLLER ---');
    console.log('Raw request.query recibido:', query);
    console.log('DTO construido para enviar al servicio:', queryDto);
    console.log('------------------\n');
    // -----------------

    return this.reportsService.generateReport(queryDto);
  }
}

