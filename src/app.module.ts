import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DealerService } from './dealer/dealer.service';
import { DealerController } from './dealer/dealer.controller';
import { DealerEntity } from './dealer/dealer.entity';
import { CityController } from './city/city.controller';
import { StateController } from './state/state.controller';
import { CityService } from './city/city.service';
import { StateService } from './state/state.service';
import { AddressService } from './address/address.service';
import { AddressController } from './address/address.controller';
import { CityEntity } from './city/city.entity';
import { StateEntity } from './state/state.entity';
import { AddressEntity } from './address/address.entity';
import { CountryController } from './country/country.controller';
import { CountryService } from './country/country.service';
import { CountryEntity } from './country/country.entity';
import { UserEntity } from './user/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guards/roles.guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    TypeOrmModule.forFeature([
      DealerEntity,
      CityEntity,
      StateEntity,
      AddressEntity,
      CountryEntity,
      UserEntity,
    ]),
    AuthModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
      }),
    }),
  ],
  controllers: [
    DealerController,
    CityController,
    StateController,
    AddressController,
    CountryController,
    UserController,
    AuthController,
  ],
  providers: [
    DealerService,
    CityService,
    StateService,
    AddressService,
    CountryService,
    UserService,
    AuthService,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
