import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm' ;
import { Room_type , QueryParam , IQuery } from '../entity/type.entity' ;
import {ResponseModel, Response} from "../../../../share/response";
import { QueryBuilderService } from '../../../../share/service';
import { ShopService } from '../../../system/shop';

@Injectable()
export class RoomTypeService {

	constructor(
		@InjectRepository( Room_type )
		private readonly config: Repository< Room_type > ,
		private readonly shopSer: ShopService
	) {}

	public async query( query: IQuery ): Promise< ResponseModel > {
		try {
			return await QueryBuilderService.queryAll( new QueryParam( query ), this.config, this.shopSer) ;
		} catch (e) {
			return Response.error({message: e }) ;
		}
	}

	public async post(  data: IQuery ) : Promise < ResponseModel > {
		try {
			const entity = this.config.create( data );
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
