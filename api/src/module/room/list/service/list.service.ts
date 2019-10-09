import { Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm' ;
import { Room_list  , IQuery } from '../entities/list.entity' ;
import {ResponseModel, Response} from "../../../../share/response";
import { ShopService } from '../../../system/shop';
import { QueryBuilderService } from '../../../../share/service';
import { RoomTypeService } from '../../type';
import { RoomAreaService } from '../../area';

@Injectable()
export class RoomListService {

	constructor(
		@InjectRepository( Room_list )
		private readonly config: Repository< Room_list > ,
		private readonly shopSer: ShopService ,
		private readonly typeSer: RoomTypeService ,
		private readonly areaSer: RoomAreaService
	) {}

	public async query( page: number = 1 , size: number = 10 , query: any ): Promise< any > {
		const data = await QueryBuilderService.query({ page, size }, query, this.config , this.shopSer) ;
		if( data.success ) {
			const typeInfo = (await this.typeSer.query( query )).data ;
			const areaInfo = (await this.areaSer.query( query )).data ;
			data.data.forEach( (item) => {
				item.typeInfo = typeInfo.find( subItem => item.typeId === subItem.id ) ;
				item.areaInfo = areaInfo.find( subItem => item.areaId === subItem.id ) ;
			});
		}
		return data ;
	}

	public async queryAll( query: IQuery ): Promise< ResponseModel > {
		try {
			const data = await QueryBuilderService.queryAll(query, this.config, this.shopSer) ;
			if( data.success ) {
				const typeInfo = (await this.typeSer.query( query )).data ;
				const areaInfo = (await this.areaSer.query( query )).data ;

				data.data.forEach( item => {
					item.typeInfo = typeInfo.forEach( subItem => item.typeId === subItem.id ) ;
					item.areaInfo = areaInfo.forEach( subItem => item.areaId === subItem.id ) ;
				});
			}

			return data ;
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
