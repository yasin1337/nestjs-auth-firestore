import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { TokenMiddleware } from './auth/middleware/token/token.middleware';
import { RjsModule } from './rjs/rjs.module';

@Module({
  imports: [CatModule, RjsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   consumer.apply(TokenMiddleware).forRoutes('*');
  }
}
