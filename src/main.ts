import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerConfiguration } from '@/configurations/swagger.configuration';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('upload');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  SwaggerConfiguration.addSwagger(app);

  await app.listen(process.env.APP_PORT);
}
bootstrap()
  .then(() =>
    Logger.log(
      `Application started successfully! Listening on port ${process.env.APP_PORT}`,
    ),
  )
  .catch(Logger.error);
