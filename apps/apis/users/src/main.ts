import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { UsersMainModule } from './users.module';
import { UsersDatabaseClient } from 'libs/databases/src';
import { helmetConfig } from './shared/config/helmetConfig';
import { corsOptions } from './shared/config/corsConfig';
import { validationPipeOptions } from './shared/config/validationPipeConfig';

async function bootstrap() {
  const port = process.env.PORT_API_USERS || 3012;
  const app = await NestFactory.create(UsersMainModule, {
    cors: corsOptions,
  });
  const prismaService = app.get(UsersDatabaseClient);
  prismaService.enableShutdownHooks(app);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.setGlobalPrefix('api');
  await app.listen(port);
  app.use(helmet(helmetConfig));
  Logger.log(`Server running in port ${port}`, 'Boostrap');
}
bootstrap();
