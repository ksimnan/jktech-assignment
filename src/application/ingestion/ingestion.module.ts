
import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestionController } from '../../interface/ingestion.controller';


@Module({
  controllers: [IngestionController],
  providers: [IngestionService],
})
export class IngestionModule {}
