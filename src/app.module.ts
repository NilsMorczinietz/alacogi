import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { dataSourceOptions } from './data-source';
import { AlarmModule } from './modules/alarm/alarm.module';
import { AuthModule } from './modules/auth/auth.module';
import { DiveraModule } from './modules/divera/divera.module';
import { EventsModule } from './modules/events/events.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): PostgresConnectionOptions =>
        ({
          ...dataSourceOptions,
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: configService.get('NODE_ENV') !== 'production',
          migrationsRun: configService.get('NODE_ENV') === 'production',
        }) as PostgresConnectionOptions,
    }),
    UserModule,
    AuthModule,
    AlarmModule,
    DiveraModule,
    EventsModule,
  ],
})
export class AppModule {}
