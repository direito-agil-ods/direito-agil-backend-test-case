import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CasesModule } from './cases/cases.module';
import { RequestMetricsMiddleware } from './common/middleware/request-metrics.middleware';

@Module({
  imports: [AuthModule, CasesModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMetricsMiddleware).forRoutes('*');
  }
}
