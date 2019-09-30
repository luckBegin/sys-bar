import {Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query, Headers, Header} from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import {SysConfigService} from "..";
import {AutoAddField} from "../../../../decorator/AutoAddField.decorator";

const urlPrefix: string = '/system/config' ;
@ApiUseTags('系统配置控制器')
@Controller()
export class  SysConfigController {
	constructor(
		private readonly service: SysConfigService
	) {}
	
	@Get( urlPrefix )
	@ApiResponse({ status: 200 , description : '成功' , type : '' })
	@ApiOperation( { title: '获取系统配置'} )
	async get(
		@Res() res ,
		@Query() query: any ,
		@Headers('jwt-shop') shopId: number
	) {
		query.shopId = shopId ;
		return res.status( HttpStatus.OK ).send( await this.service.query( query ) ) ;
	}
	
	@Post( urlPrefix )
	@ApiResponse({ status: 200 , description : '成功' , type : '' })
	@ApiOperation( { title: '添加系统配置'} )
	@AutoAddField( ( res ,data , createUser ) => { return { createUser }})
	async post(
		@Res() res ,
		@Body() data: any ,
		@Headers('jwt-user-id') createUser: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.post( data ) ) ;
	}
	
	@Delete( urlPrefix + '/:id')
	@ApiResponse( { status : 200 , description : '成功'} )
	@ApiOperation( { title : '删除系统配置' } )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id )) ;
	}
	
	@Put( urlPrefix )
	@ApiResponse({ status: 200 , description : '成功' , type : '' })
	@ApiOperation( { title: '添加系统配置'} )
	@AutoAddField( ( res ,data , modifyUser ) => { return { modifyUser }})
	async put(
		@Res() res ,
		@Body() data: any ,
		@Headers('jwt-user-id') modifyUser: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.put( data ) ) ;
	}
}
