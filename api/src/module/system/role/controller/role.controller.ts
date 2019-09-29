import {Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query, Headers} from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { RoleService } from '../service/role.service';
import { Role, RoleQueryParam } from '../entities/role.entity';
import {AutoAddField} from "../../../../decorator/AutoAddField.decorator";

const urlPrefix: string = '/system/role' ;

@ApiUseTags('角色控制器')
@Controller()
export class  RoleController {
	constructor(
		private readonly service: RoleService ,
	) {}

	@Get( urlPrefix )
	@ApiResponse({ status: 200 , description : '成功' , type : Role })
	@ApiOperation( { title: '获取角色列表'} )
	async get(
		@Res() res ,
		@Query() query: any
	) {
		const paras = new RoleQueryParam( query.shopId ) ;
		return res.status( HttpStatus.OK ).send( await this.service.get(
			query.currentPage ,
			query.pageSize ,
			paras
		)) ;
	}

	@Post( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Role} )
	@ApiOperation( { title : '新增角色' } )
	@AutoAddField( ( res ,data , createUser ) => { return { createUser }})
	async post(
		@Res() res ,
		@Body() data ,
		@Headers('jwt-user-id') createUser
	) {
		if (data.menuIds) {
				data.menuIds = data.menuIds.join(',') ;
		}
		return res.status( HttpStatus.OK ).send( await this.service.post(data)) ;
	}

	@Put( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Role } )
	@ApiOperation( { title : '修改角色' } )
	@AutoAddField( ( res ,data , modifyUser ) => { return { modifyUser }})
	async put(
		@Res() res ,
		@Body() data ,
		@Headers('jwt-user-id') modifyUser
	) {
		if (data.menuIds) {
			data.menuIds = data.menuIds.join(',') ;
		}
		return res.status( HttpStatus.OK ).send( await this.service.put(data)) ;
	}

	@Delete( urlPrefix + '/:id')
	@ApiResponse( { status : 200 , description : '成功'} )
	@ApiOperation( { title : '删除角色' } )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id )) ;
	}
}
