import {Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query, Headers} from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { DepartService } from '../service/depart.service';
import { Depart } from '../entities/depart.entity';
import {AutoAddField} from "../../../../decorator/AutoAddField.decorator";

const urlPrefix: string = '/system/department' ;

@ApiUseTags('部门控制器')
@Controller()
export class  DepartController {
	constructor(
		private readonly service: DepartService ,
	) {}

	@Get( urlPrefix + '/tree')
	@ApiResponse({ status: 200 , description : '成功' , type : Depart })
	@ApiOperation( { title: '获取部门列表'} )
	async get(
		@Res() res ,
		@Query() query: any
	) {
		return res.status( HttpStatus.OK ).send( await this.service.get( query ) ) ;
	}

	@Delete(  urlPrefix + '/:id')
	@ApiResponse({ status: 200 , description : '成功' })
	@ApiOperation( { title: '删除部门'} )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id ) ) ;
	}

	@Post( urlPrefix )
	@ApiResponse( { status: 200 , description: '成功' , type : Depart } )
	@ApiOperation( { title: '新增部门' } )
	@AutoAddField( ( res ,data , createUser ) => { return { createUser }})
	async post(
		@Res() res ,
		@Body() data ,
		@Headers('jwt-user-id') createUser
	) {
		const result = await this.service.post( data ) ;
		return res.status( HttpStatus.OK )
			.send( result );
	}

	@Put( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Depart })
	@ApiOperation( { title : '更新部门'})
	@AutoAddField( ( res ,data , modifyUser ) => { return { modifyUser }})
	async put(
		@Res() res ,
		@Body() data ,
		@Headers('jwt-user-id') modifyUser
	) {
		return res.status( HttpStatus.OK ).send( await this.service.put( data ) );
	}
}
