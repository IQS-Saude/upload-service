import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly client: S3;
  private readonly bucketParams: { Bucket: string };

  constructor(private readonly config: ConfigService) {
    this.client = new S3({
      endpoint: config.get('SPACES_ENDPOINT'),
      region: 'us-east-1',
      credentials: {
        accessKeyId: config.get('SPACES_KEY'),
        secretAccessKey: config.get('SPACES_SECRET'),
      },
    });

    this.bucketParams = { Bucket: config.get('SPACES_BUCKET') };
  }

  public async uploadFile(
    path: string,
    content: Buffer,
    contentType: string,
  ): Promise<string> {
    await this.client.send(
      new PutObjectCommand({
        ...this.bucketParams,
        Key: path,
        Body: content,
        ContentType: contentType,
        ACL: 'public-read',
      }),
    );

    return this.gerarUrl(path);
  }

  private gerarUrl(key: string) {
    return `${this.config.get('SPACES_ENDPOINT')}/${this.config.get(
      'SPACES_BUCKET',
    )}/${key}`;
  }
}
