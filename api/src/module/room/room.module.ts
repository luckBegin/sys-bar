import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {RoomAreaController , RoomAreaService , Room_area } from './area' ;

const entities = [
	Room_area
];

const controllers = [
	RoomAreaController
];

const services = [
	RoomAreaService
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
export class RoomModule {
}
