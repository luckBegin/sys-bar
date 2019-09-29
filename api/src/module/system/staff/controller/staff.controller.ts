import { Get, Controller, Res, HttpStatus, Post, Body, Delete, Param, Put, Query , Headers } from '@nestjs/common';
import { ApiResponse , ApiUseTags , ApiOperation } from '@nestjs/swagger' ;
import { StaffService } from '../service/staff.service';
import { Staff, StaffQueryParam } from '../entities/staff.entity';
import { Response } from '../../../../share' ;
import * as md5 from 'md5' ;
import {AutoAddField} from "../../../../decorator/AutoAddField.decorator";
const urlPrefix: string = '/system/staff' ;

@ApiUseTags('管理员控制器')
@Controller()
export class  StaffController {
	constructor(
		private readonly service: StaffService ,
	) {}

	@Get( urlPrefix )
	@ApiResponse({ status: 200 , description : '成功' , type : Staff })
	@ApiOperation( { title: '获取管理员列表'} )
	async get(
		@Res() res ,
		@Query() query: any
	) {
		const paras = new StaffQueryParam(
			query.name ,
			query.phoneNumber ,
			query.username ,
			query.status
		);
		return res.status( HttpStatus.OK ).send( await this.service.get(
			query.currentPage ,
			query.pageSize ,
			paras,
			query.shopId
		)) ;
	}

	@Post( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Staff })
	@ApiOperation( { title : '新增管理员' } )
	@AutoAddField( ( res ,data , createUser ) => { return { createUser }})
	async post(
		@Res() res ,
		@Body() data ,
		@Headers('jwt-user-id') createUser
	) {
		if (data.roleIds) {
			data.roleIds = data.roleIds.join(',') ;
		}

		if (data.departIds) {
			data.departIds = data.departIds.join(',') ;
		}

		if ( data.password ) {
			data.password = md5(data.password) ;
		}

		if (data.shopId) {
			data.shopId = data.shopId.join(',') ;
		}

		return res.status( HttpStatus.OK ).send( await this.service.post(data)) ;
	}

	@Put( urlPrefix )
	@ApiResponse( { status : 200 , description : '成功' , type: Staff })
	@ApiOperation( { title : '修改管理员' } )
	@AutoAddField( ( res ,data , modifyUser ) => { return { modifyUser }})
	async put(
		@Res() res ,
		@Body() data ,
		@Headers('jwt-user-id') modifyUser
	) {
		if (data.roleIds) {
			data.roleIds = data.roleIds.join(',') ;
		}

		if (data.departIds) {
			data.departIds = data.departIds.join(',') ;
		}

		if ( data.password ) {
			data.password = md5(data.password) ;
		}

		if (data.shopId) {
			data.shopId = data.shopId.join(',') ;
		}

		return res.status( HttpStatus.OK ).send( await this.service.put(data)) ;
	}

	@Post( urlPrefix + '/login')
	@ApiResponse( { status: 200 , description: '成功' })
	@ApiOperation( { title: '登录' })
	async login(
		@Res() res ,
		@Body() data
	) {
		
		if (!data.username || !data.password) {
			return res.status( HttpStatus.OK).send( Response.error( {message : '请输入用户名和密码'} )) ;
		} else {
			data.password = md5(data.password) ;
			return res.status( HttpStatus.OK).send( await this.service.login(data) ) ;
		}
	}
	
	@Get( urlPrefix + '/login')
	@ApiResponse( { status: 200 , description: '成功' })
	@ApiOperation( { title: '微信扫码登录' })
	async wxLogin(
		@Res() res ,
		@Query() query
	) {
		return res.status( HttpStatus.OK).send( await this.service.qrCodeLogin( query.code ) ) ;
	}
	
	@Get( urlPrefix + '/byUid')
	@ApiResponse( { status: 200 , description: '成功' })
	@ApiOperation( { title: '根据UID获取管理员信息' })
	async byUid(
		@Res() res ,
		@Query() query
	) {
		const uid = query.uid ;
		return res.status( HttpStatus.OK).send( await this.service.byUid( uid ) ) ;
	}
	
	@Delete( urlPrefix + '/:id')
	@ApiResponse( { status : 200 , description : '成功'} )
	@ApiOperation( { title : '删除管理员' } )
	async delete(
		@Res() res ,
		@Param('id') id: number
	) {
		return res.status( HttpStatus.OK ).send( await this.service.delete( id )) ;
	}
	
	@Put( urlPrefix + '/changePass' )
	@ApiResponse( { status : 200 , description : '成功' , type: Staff })
	@ApiOperation( { title : '修改密码' } )
	@AutoAddField( ( res ,data , modifyUser ) => { return { modifyUser }})
	async changePass(
		@Res() res ,
		@Body() data ,
		@Headers('jwt-user-id') modifyUser
	) {
		data.new = md5( data.new ) ;
		return res.status( HttpStatus.OK ).send( await this.service.changePass(data)) ;
	}
}
