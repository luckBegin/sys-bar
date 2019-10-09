import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {RoomAreaController , RoomAreaService , Room_area } from './area' ;
import { RoomTypeController , RoomTypeService , Room_type } from './type' ;
import { RoomListService , RoomListController ,Room_list } from './list' ;

import { SystemModule } from '../system';

const entities = [
	Room_area ,
	Room_type ,
	Room_list
];

const controllers = [
	RoomAreaController ,
	RoomTypeController ,
	RoomListController
];

const services = [
	RoomAreaService ,
	RoomTypeService ,
	RoomListService
];

@Module({
	imports: [
		TypeOrmModule.forFeature(entities),
		SystemModule
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
export class RoomModule {
}
