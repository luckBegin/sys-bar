import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from './share/config';
import { SystemModule , RoomModule } from './module';
import { APP_GUARD } from '@nestjs/core';
import { LoginGurad, ShopIdGuard } from './guard';

const modules = [
	SystemModule ,
	RoomModule
];

@Module({
	imports: [...modules, TypeOrmModule.forRoot(CONFIG.dataBases as any)],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: LoginGurad,
		}, {
			provide: APP_GUARD,
			useClass: ShopIdGuard,
		},
	],
})
export class AppModule {
}
