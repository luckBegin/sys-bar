import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm' ;
import { Sys_config , Query , IQuery } from '../entity/sys-config.entity' ;
import {ResponseModel , Response} from "../../../../share/response";

@Injectable()
export class SysConfigService {
	
	constructor(
		@InjectRepository( Sys_config )
		private readonly config: Repository< Sys_config >
	) {}
	
	private async findByCondition( condition: { [key: string]: any }): Promise< Sys_config[] > {
		const query = new Query( condition ) ;
		return await this.config.find( query ) ;
	}
	
	public async query( query: IQuery ): Promise< ResponseModel > {
		try {
			const data = await this.findByCondition( query ) ;
			return Response.success( { data })
		} catch (e) {
			return Response.error({message: e }) ;
		}
	}
	
	public async post(  data: IQuery ) : Promise < ResponseModel > {
		try {
			const key = data.key ;
			const column = await this.findByCondition( { key }) ;
			if( column.length <= 0 ) {
				const entity = this.config.create( data ) ;
				await this.config.insert( entity ) ;
				return Response.success() ;
			} else {
				return Response.error({message:'该项配置,请勿配置'}) ;
			}
		}  catch (e) {
			return Response.error({ message: e }) ;
		}
	};
	
	public async delete( id: number ): Promise< ResponseModel > {
		try {
			await this.config.delete( id ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message:e }) ;
		}
	}
	
	public async put( data: IQuery ): Promise< ResponseModel > {
		try {
			await this.config.save( data ) ;
			return Response.success() ;
		} catch (e) {
			return Response.error({message:e}) ;
		}
	}
}
