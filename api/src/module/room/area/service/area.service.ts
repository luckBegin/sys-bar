import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IQuery, QueryParam, Room_area } from '../entity/area.entity';
import { Response, ResponseModel } from '../../../../share/response';
import { ShopService } from '../../../system/shop';
import { QueryBuilderService } from '../../../../share/service';

@Injectable()
export class RoomAreaService {

	constructor(
		@InjectRepository( Room_area )
		private readonly config: Repository< Room_area > ,
		private readonly shopSer: ShopService
	) {}

	private cache: ResponseModel = null ;
	public async query( query: IQuery ): Promise< ResponseModel > {
		try {
			if( !this.cache ) {
				this.cache = await QueryBuilderService.queryAll(new QueryParam(query), this.config, this.shopSer) ;
			}
			return this.cache ;
		} catch (e) {
			return Response.error({message: e }) ;
		}
	}

	public async post(  data: IQuery ) : Promise < ResponseModel > {
		try {
			const entity = this.config.create( data ) ;
			await this.config.insert( entity ) ;
			this.cache = null ;
			return Response.success() ;
		}  catch (e) {
			return Response.error({ message: e }) ;
		}
	};

	public async delete( id: number ): Promise< ResponseModel > {
		try {
			await this.config.delete( id ) ;
			this.cache = null ;
			return Response.success() ;
		} catch (e) {
			return Response.error( { message:e }) ;
		}
	}

	public async put( data: IQuery ): Promise< ResponseModel > {
		try {
			await this.config.save( data ) ;
			this.cache = null ;
			return Response.success() ;
		} catch (e) {
			return Response.error({message:e}) ;
		}
	}
}
