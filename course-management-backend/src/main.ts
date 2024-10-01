import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'http://localhost:3000', // Your Next.js frontend URL
      credentials: true, // Optional, set to true if you need to send cookies or authorization headers
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',  // Allow requests from the Next.js frontend
    credentials: true,  // Allow credentials (cookies)
  });
  await app.listen(5000);
}
bootstrap();
