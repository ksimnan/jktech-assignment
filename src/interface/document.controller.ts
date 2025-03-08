import { Controller, Post, Get, Patch, Delete, Param, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Document } from '../domain/document/document';
import { DocumentService } from '../application/document/document.service';


@ApiTags('documents') // Group for Swagger
@Controller('douments')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new Document' })
  @ApiResponse({ status: 201, description: 'The Document has been successfully created.', type: Document })
  async addDocument(@Body() documentDetail: Document): Promise<Document> {
    return this.documentService.addDocument(documentDetail);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find Document by ID' })
  @ApiResponse({ status: 200, description: 'The Document data', type: Document })
  async findDocumentById(@Param('id') id: string): Promise<Document> {
    return this.documentService.findDocumentById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Document by ID' })
  @ApiResponse({ status: 200, description: 'The Document has been successfully updated.', type: Boolean })
  async updateDocumentById(@Param('id') id: string, @Body() DocumentDetail: Document): Promise<boolean> {
    return this.documentService.updateDocumentById(id, DocumentDetail);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Document by ID' })
  @ApiResponse({ status: 200, description: 'The Document has been successfully deleted.', type: Boolean })
  async deleteDocumentById(@Param('id') id: string): Promise<boolean> {
    return this.documentService.deleteDocumentById(id);
  }
}
