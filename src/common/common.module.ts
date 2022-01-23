import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
// import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // apply a middleware:
    // consumer.apply(LoggingMiddleware).forRoutes('*'); // just path
    // .exclude('coffees') // to exclude routes
    // .forRoutes({ path: 'coffees', method: RequestMethod.GET }); // specify request method + path
  }
}
