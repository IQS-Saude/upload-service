import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from '@/services/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { BaseController } from '@/controllers/base.controller';
import { ResponseSuccess } from '@/dtos/response/response.interface';
import { UploadResponse } from '@/dtos/response/upload.response';

@ApiTags('UploadController')
@Controller()
export class UploadController extends BaseController {
  constructor(private readonly uploadService: UploadService) {
    super();
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imagem: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    required: true,
  })
  @Post('/imagem-perfil')
  @UseInterceptors(FileInterceptor('imagem'))
  async uploadImagemPerfil(
    @UploadedFile() imagem: Express.Multer.File,
  ): Promise<ResponseSuccess<UploadResponse>> {
    const url = await this.uploadService.uploadFile(
      `imagems-perfil/${this.gerarNomeArquivo(imagem.originalname)}`,
      imagem.buffer,
      imagem.mimetype,
    );

    return this.success({ url });
  }

  private gerarNomeArquivo(fileName: string): string {
    const fileNameSplitado = fileName.split('.');
    const extensao = fileNameSplitado[fileNameSplitado.length - 1];

    return `${randomUUID()}.${extensao}`;
  }
}
