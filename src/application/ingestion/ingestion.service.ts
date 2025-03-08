import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IngestionService {
  async triggerIngestion(documentId: string): Promise<any> {
    try {
      const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:5000';
      const response = await axios.post(`${pythonBackendUrl}/ingestion`, { documentId });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to trigger ingestion`);
    }
  }

  async getIngestionStatus(documentId: string): Promise<any> {
    try {
      const pythonBackendUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:5000';
      const response = await axios.get(`${pythonBackendUrl}/ingestion/status`, {
        params: { documentId },
      });
      return response.data;
    }catch (error) {
      throw new Error(`Failed to fetch ingestion status`);
    }
  }
}
