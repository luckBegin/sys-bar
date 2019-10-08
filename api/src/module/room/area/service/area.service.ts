import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm' ;
import { Room_area , Query , IQuery } from '../entity/area.entity' ;
import {ResponseModel, Response} from "../../../../share/response";

@Injectable()
export class RoomAreaService {

	constructor(
		@InjectRepository( Room_area )
		private readonly config: Repository< Room_area >
	) {}

	private async findByCondition( condition: { [key: string]: any }): Promise< Room_area[] > {
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
			const entity = this.config.create( data )
			await this.config.insert( entity ) ;
			return Response.success() ;
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
