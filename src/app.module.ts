import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadService } from '@/services/upload.service';
import { UploadController } from '@/controllers/upload.controller';

@Module({
  controllers: [UploadController],
  imports: [ConfigModule.forRoot()],
  providers: [UploadService],
})
export class AppModule {}
