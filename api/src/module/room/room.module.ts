import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {RoomAreaController , RoomAreaService , Room_area } from './area' ;
import { RoomTypeController , RoomTypeService , Room_type } from './type' ;
import { SystemModule } from '../system';
const entities = [
	Room_area ,
	Room_type
];

const controllers = [
	RoomAreaController ,
	RoomTypeController
];

const services = [
	RoomAreaService ,
	RoomTypeService
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
