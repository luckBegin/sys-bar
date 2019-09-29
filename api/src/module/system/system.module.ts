import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StaffController, StaffService, Staff } from './staff';
import { ShopController, ShopService, Shop } from './shop' ;
import { MenuController, MenuService, Menu } from './menu' ;
import { DepartController, DepartService, Depart } from './depart' ;
import { RoleController, RoleService, Role } from './role' ;
import { SysConfigController, Sys_config, SysConfigService } from './config';

const entities = [
	Staff,
	Shop,
	Menu,
	Depart,
	Role,
	Sys_config,
];

const controllers = [
	StaffController,
	ShopController,
	MenuController,
	DepartController,
	RoleController,
	SysConfigController,
];

const services = [
	StaffService,
	ShopService,
	MenuService,
	DepartService,
	RoleService,
	SysConfigService,
];

@Module({
	imports: [
		TypeOrmModule.forFeature(entities),
	],
	controllers: [
		...controllers,
	],
	providers: [
		...services,
	],
	exports: [
		...services,
	],
})
export class SystemModule {
}
