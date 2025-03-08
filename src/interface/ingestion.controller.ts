import { Controller, Post, Get, Query, Body, HttpException, HttpStatus } from '@nestjs/common';
import { IngestionService } from '../application/ingestion/ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post('trigger')
  async triggerIngestion(@Body('documentId') documentId: string): Promise<any> {
    if (!documentId) {
      throw new HttpException('documentId is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const response = await this.ingestionService.triggerIngestion(documentId);
      return response;
    } catch (error:any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('status')
  async getIngestionStatus(@Query('documentId') documentId: string): Promise<any> {
    if (!documentId) {
      throw new HttpException('documentId is required', HttpStatus.BAD_REQUEST);
    }

    try {
      const response = await this.ingestionService.getIngestionStatus(documentId);
      return response;
    } catch (error:any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
