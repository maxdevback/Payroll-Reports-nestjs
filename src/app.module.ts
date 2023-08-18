import { Module, MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PayrollModule } from './payroll/payroll.module';
import { User } from './user/entities/user.entity';
import { APP_PIPE } from '@nestjs/core';
import { Payroll } from './payroll/entities/payroll.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'test2',
      username: 'test',
      password: '1111',
      synchronize: true,
      entities: [User, Payroll],
    }),
    UserModule,
    PayrollModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['justKeyForDevelopment'],
        }),
      )
      .forRoutes('*');
  }
}
