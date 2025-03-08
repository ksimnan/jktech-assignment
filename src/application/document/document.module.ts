
import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentRepository } from '../../infrastructure/repository/document.repository';
import { DocumentMapper } from '../../infrastructure/mapper/document.mapper';
import { DocumentController } from '../../interface/document.controller';


@Module({
  controllers: [DocumentController],
  providers: [DocumentService, DocumentRepository,DocumentMapper],
})
export class DocumentModule {}
