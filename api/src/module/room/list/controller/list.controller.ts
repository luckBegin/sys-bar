import {Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query, Headers, Header} from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import {AutoAddField} from "../../../../decorator/AutoAddField.decorator";
import { RoomListService } from '../service/list.service';
import { QueryParam } from '../entities/list.entity';

const urlPrefix: string = '/room/list' ;
@ApiUseTags('房台列表配置控制器')
@Controller( urlPrefix )
export class  RoomListController {
	constructor(
		private readonly service: RoomListService
	) {}


	@Get(  )
	@ApiResponse({ status: 200 , description : '成功' , type : '' })
	@ApiOperation( { title: '获取类型列表'} )
	async get(
		@Res() res ,
		@Query() query: any ,
		@Headers('jwt-shop') shopId: number
	) {
		query.shopId = shopId ;
		const param = new QueryParam( query ) ;
		return res.status( HttpStatus.OK ).send( await this.service.query(
			query.currentPage ,
			query.pageSize ,
			param
		)) ;
	}

	@Get( 'all')
	@ApiResponse({ status: 200 , description : '成功' , type : '' })
	@ApiOperation( { title: '获取所有列表'} )
	async getAll(
		@Res() res ,
		@Query() query: any ,
		@Headers('jwt-shop') shopId: number
	) {
		query.shopId = shopId ;
		const param = new QueryParam( query ) ;
		return res.status( HttpStatus.OK ).send( await this.service.queryAll( param )) ;
	}

	@Post(  )
	@ApiResponse({ status: 200 , description : '成功' , type : '' })
	@ApiOperation( { title: '添加类型'} )
	@AutoAddField( ( res ,data , createUser ) => { return { createUser }})
	async post(
		@Res() res ,
		@Body() data: any ,
		@Headers('jwt-user-id') createUser: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.post( data ) ) ;
	}

	@Delete( '/:id')
	@ApiResponse( { status : 200 , description : '成功'} )
	@ApiOperation( { title : '删除类型' } )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id )) ;
	}

	@Put(  )
	@ApiResponse({ status: 200 , description : '成功' , type : '' })
	@ApiOperation( { title: '修改类型'} )
	@AutoAddField( ( res ,data , modifyUser ) => { return { modifyUser }})
	async put(
		@Res() res ,
		@Body() data: any ,
		@Headers('jwt-user-id') modifyUser: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.put( data ) ) ;
	}
}
