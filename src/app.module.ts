import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // để dùng ConfigService ở mọi nơi mà không cần import lại
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: `mongodb+srv://${configService.get('DB_USERNAME')}:${configService.get('DB_PASSWORD')}@cluster0.kbwnj1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
        database: 'database',
        entities: [User],
        logging: true,
        autoLoadEntities: true,
        synchronize: true, // Chỉ dùng trong development
      }),
    }),

    UsersModule,
    ReportsModule,
    AuthModule,
  ],
})
export class AppModule {}
