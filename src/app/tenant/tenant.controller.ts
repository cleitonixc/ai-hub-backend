import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantEntity } from 'src/entities/tenant.entity';
import { ReturnTenantDto } from './dtos/returnTenant.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tenants')
@ApiBearerAuth('access-token')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @ApiOperation({
    summary: 'Create new tenant',
    description: 'Creates a new tenant in the system'
  })
  @ApiResponse({
    status: 201,
    description: 'Tenant created successfully',
    type: ReturnTenantDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided'
  })
  @ApiResponse({
    status: 403,
    description: 'No permission to create tenant'
  })
  @Post()
  async createTenant(@Body() tenant: TenantEntity): Promise<ReturnTenantDto> {
    const tenantCreated = await this.tenantService.createTenant(tenant);
    return new ReturnTenantDto(tenantCreated);
  }

  @ApiOperation({
    summary: 'Get tenant by ID',
    description: 'Returns a tenant by its ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant found successfully',
    type: ReturnTenantDto
  })
  @ApiResponse({
    status: 404,
    description: 'Tenant not found'
  })
  @Get(':id')
  async getTenantById(@Param('id') id: number): Promise<ReturnTenantDto> {
    const tenant = await this.tenantService.getTenantById(id);
    return new ReturnTenantDto(tenant);
  }

  @ApiOperation({
    summary: 'Update tenant',
    description: 'Updates an existing tenant'
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant updated successfully',
    type: ReturnTenantDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided'
  })
  @ApiResponse({
    status: 404,
    description: 'Tenant not found'
  })
  @Put(':id')
  async updateTenant(@Param('id') id: number, @Body() tenant: TenantEntity): Promise<ReturnTenantDto> {
    const tenantUpdated = await this.tenantService.updateTenant(id, tenant);
    return new ReturnTenantDto(tenantUpdated);
  }

  @ApiOperation({
    summary: 'Delete tenant',
    description: 'Deletes a tenant from the system'
  })
  @ApiResponse({
    status: 200,
    description: 'Tenant deleted successfully'
  })
  @ApiResponse({
    status: 404,
    description: 'Tenant not found'
  })
  @Delete(':id')
  async deleteTenant(@Param('id') id: number): Promise<void> {
    await this.tenantService.deleteTenant(id);
  }

  @ApiOperation({
    summary: 'List all tenants',
    description: 'Returns a list of all registered tenants'
  })
  @ApiResponse({
    status: 200,
    description: 'List of tenants returned successfully',
    type: [ReturnTenantDto]
  })
  @ApiResponse({
    status: 403,
    description: 'No permission to list tenants'
  })
  @Get()
  async getTenants(): Promise<ReturnTenantDto[]> {
    const tenants = await this.tenantService.getTenants();
    return tenants.map((tenant) => new ReturnTenantDto(tenant));
  }
}
