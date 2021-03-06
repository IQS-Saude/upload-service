import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfiguration {
  static addSwagger(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Servico de unidades')
      .setDescription('Serviço responsavel por guardar as unidades da IQS')
      .setVersion(process.env.npm_package_version)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`/upload/api`, app, document);
  }
}
