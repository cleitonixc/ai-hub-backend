import { Module } from '@nestjs/common';
import { UserModule } from './app/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressCityController } from './app/address_city/addressCity.controller';
import { AddressStateController } from './app/address_state/addressState.controller';
import { AddressCityService } from './app/address_city/addressCity.service';
import { AddressStateService } from './app/address_state/addressState.service';
import { AddressService } from './app/address/address.service';
import { AddressController } from './app/address/address.controller';
import { AddressCityEntity } from './entities/addressCity.entity';
import { AddressStateEntity } from './entities/addressState.entity';
import { AddressEntity } from './entities/address.entity';
import { AddressCountryController } from './app/address_country/addressCountry.controller';
import { AddressCountryService } from './app/address_country/addressCountry.service';
import { AddressCountryEntity } from './entities/addressCountry.entity';
import { UserEntity } from './entities/user.entity';
import { UserController } from './app/user/user.controller';
import { UserService } from './app/user/user.service';
import { AuthModule } from './app/auth/auth.module';
import { AuthController } from './app/auth/auth.controller';
import { AuthService } from './app/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guards/roles.guards';
import { APP_GUARD } from '@nestjs/core';
import { TenantEntity } from './entities/tenant.entity';
import { AddressStreetEntity } from './entities/addressStreet.entity';
import { AddressLocationEntity } from './entities/addressLocation.entity';
import { AddressBuildingEntity } from './entities/addressBuilding.entity';
import { TenantService } from './app/tenant/tenant.service';
import { TenantController } from './app/tenant/tenant.controller';
import { TenantModule } from './app/tenant/tenant.module';
import { PersonPhoneModule } from './app/person_phone/person_phone.module';
import { PersonEmailModule } from './app/person_email/person_email.module';
import { PersonDocumentModule } from './app/person_document/person_document.module';
import { PersonController } from './app/person/person.controller';
import { PersonService } from './app/person/person.service';
import { PersonModule } from './app/person/person.module';
import { PersonPhoneController } from './app/person_phone/person_phone.controller';
import { PersonPhoneService } from './app/person_phone/person_phone.service';
import { PersonPhoneEntity } from './entities/personPhone.entity';
import { PersonEntity } from './entities/person.entity';

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
      AddressCityEntity,
      AddressStateEntity,
      AddressEntity,
      AddressCountryEntity,
      UserEntity,
      TenantEntity,
      AddressStreetEntity,
      AddressLocationEntity,
      AddressBuildingEntity,
      AddressCityEntity,
      AddressStateEntity,
      AddressCountryEntity,
      PersonPhoneEntity,
      PersonEntity,
    ]),
    AuthModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
      }),
    }),
      TenantModule,
      PersonPhoneModule,
      PersonEmailModule,
      PersonDocumentModule,
      PersonModule,
      PersonPhoneModule
  ],
  controllers: [
    AddressCityController,
    AddressStateController,
    AddressController,
    AddressCountryController,
    UserController,
    AuthController,
    TenantController,
    PersonController,
    PersonPhoneController
  ],
  providers: [
    AddressCityService,
    AddressStateService,
    AddressService,
    AddressCountryService,
    UserService,
    AuthService,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    TenantService,
    PersonService,
    PersonPhoneService
  ],
})
export class AppModule {}
