import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from '../address.service';
import { Repository } from 'typeorm';
import { AddressEntity } from '../address.entity';
import { AddressStateService } from '../../address_state/addressState.service';
import { AddressCityService } from '../../address_city/addressCity.service';
import { CreateAddressDto } from '../dtos/createAddress.dto';
import { addressEntityMock } from '../__mocks__/address.mock';
import { NotFoundException } from '@nestjs/common';

describe('AddressService', () => {
  let service: AddressService;
  let mockAddressRepository: Partial<Repository<AddressEntity>>;
  let mockAddressStateService: Partial<AddressStateService>;
  let mockAddressCityService: Partial<AddressCityService>;

  beforeEach(async () => {
    mockAddressRepository = {
      find: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };
    mockAddressStateService = {
      findStateById: jest.fn(),
    };
    mockAddressCityService = {
      findCityByIdAndStateId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        { 
          provide: 'AddressEntityRepository', 
          useValue: mockAddressRepository 
        },
        { 
          provide: AddressStateService, 
          useValue: mockAddressStateService 
        },
        { 
          provide: AddressCityService, 
          useValue: mockAddressCityService 
        }
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  describe('findAll', () => {
    it('should return all addresses with relations', async () => {
      // Arrange
      const mockAddresses = [
        { 
          id: 1, 
          city: { 
            state: { id: 1, name: 'Test State' } 
          } 
        }
      ] as AddressEntity[];
      (mockAddressRepository.find as jest.Mock).mockResolvedValue(mockAddresses);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(mockAddresses);
      expect(mockAddressRepository.find).toHaveBeenCalledWith({
        relations: {
          city: {
            state: true
          }
        }
      });
    });
  });

  describe('createAddress', () => {
    it('should successfully create an address', async () => {
      // Arrange
      const createAddressDto: CreateAddressDto = {
        stateId: 1,
        cityId: 1,
        street: '123 Test St',
        zipCode: '12345',
        number: '',
        complement: '',
        userId: ''
      };
      const userId = 1;
      
      (mockAddressStateService.findStateById as jest.Mock).mockResolvedValue({});
      (mockAddressCityService.findCityByIdAndStateId as jest.Mock).mockResolvedValue({});
      (mockAddressRepository.save as jest.Mock).mockImplementation(address => address);

      // Act
      const result = await service.createAddress(createAddressDto, userId);

      // Assert
      expect(mockAddressStateService.findStateById).toHaveBeenCalledWith(createAddressDto.stateId);
      expect(mockAddressCityService.findCityByIdAndStateId).toHaveBeenCalledWith(
        createAddressDto.cityId, 
        createAddressDto.stateId
      );
      expect(result).toEqual({
        ...createAddressDto,
        userId
      });
    });

    it('should throw error if state does not exist', async () => {
      // Arrange
      const createAddressDto: CreateAddressDto = {
        state: '1',
        city: '1',
        street: '123 Test St',
        postalCode: '12345',
        number: '',
        complement: '',
        userId: ''
      };
      const userId = 1;
      
      (mockAddressStateService.findStateById as jest.Mock).mockRejectedValue(new Error('State not found'));

      // Act & Assert
      await expect(service.createAddress(createAddressDto, userId))
        .rejects.toThrow('State not found');
    });
  });

  describe('getAddressById', () => {
    it('should return address with relations', async () => {
      // Arrange
      const addressId = 1;
      const mockAddress = { 
        id: addressId, 
        city: { 
          state: { id: 1, name: 'Test State' } 
        } 
      } as AddressEntity;
      (mockAddressRepository.findOne as jest.Mock).mockResolvedValue(mockAddress);

      // Act
      const result = await service.getAddressById(addressId);

      // Assert
      expect(result).toEqual(mockAddress);
      expect(mockAddressRepository.findOne).toHaveBeenCalledWith({
        where: { id: addressId },
        relations: {
          city: {
            state: true
          }
        }
      });
    });

    it('should return null if address does not exist', async () => {
      // Arrange
      const addressId = 999;
      (mockAddressRepository.findOne as jest.Mock).mockResolvedValue(null);

      // Act
      const result = await service.getAddressById(addressId);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('getAddressesByUserId', () => {
    it('should return address with relations', async () => {
      // Arrange
      const userId = '1';
      const mockAddress = addressEntityMock;
      (mockAddressRepository.find as jest.Mock).mockResolvedValue([mockAddress]);

      // Act
      const result = await service.getAddressesByUserId(userId);

      // Assert
      expect(result).toEqual([mockAddress]);
      expect(mockAddressRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        relations: {
          city: {
            state: true
          }
        }
      });
    });

    it('should throw error if address does not exist', async () => {
      // Arrange
      const userId = '999';
      (mockAddressRepository.findOne as jest.Mock).mockResolvedValue(null);

      // Act & Assert
      await expect(service.getAddressesByUserId(userId))
        .rejects.toThrow(NotFoundException);
    });
  });
});
