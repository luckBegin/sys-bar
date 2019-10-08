import {Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query, Headers, Header} from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import {AutoAddField} from "../../../../decorator/AutoAddField.decorator";
import { RoomAreaService } from '../service/area.service';

const urlPrefix: string = '/room/area' ;
@ApiUseTags('房台类型配置控制器')
@Controller( urlPrefix )
export class  RoomAreaController {
	constructor(
		private readonly service: RoomAreaService
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
		return res.status( HttpStatus.OK ).send( await this.service.query( query ) ) ;
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
