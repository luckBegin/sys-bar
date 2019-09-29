import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG } from './share/config';
import { SystemModule } from './module';

const modules = [
	SystemModule,
];

@Module({
	imports: [...modules, TypeOrmModule.forRoot(CONFIG.dataBases as any)],
	controllers: [],
})
export class AppModule {
}
