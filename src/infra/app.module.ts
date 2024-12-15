import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { envSchema } from './env';
import { HttpModule } from './http/http.module';
import { DatabaseModule } from '@faker-js/faker/.';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    DatabaseModule,
  ],
})
export class AppModule {}
