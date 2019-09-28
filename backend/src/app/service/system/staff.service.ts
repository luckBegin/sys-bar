import { Injectable } from "@angular/core";
import { API } from '../API';
import { HttpClient } from '@angular/common/http';
import { GET , POST , DELETE , PUT } from '../../../decorators/request.decorator';
import { MsgService } from '../msg/msg.service';
import {ENUM, RESPONSE} from '../../models';
import { Observable } from 'rxjs';

@Injectable({providedIn : 'root'})
export class StaffService{

	constructor(
		private http : HttpClient ,
		private msg : MsgService
	){}

	@GET(API.system.staff.staff)
	getList( params : any ): Observable< RESPONSE > | any {}

	@PUT(API.system.staff.staff)
	put(data: object): Observable< RESPONSE > | any {};

	@POST(API.system.staff.staff)
	post(data: object): Observable< RESPONSE > | any {};

	@DELETE(API.system.staff.staff)
	delete( data : any ){};

	getStaffById(id:number): Observable< RESPONSE > | any {};

	@POST(API.system.staff.login  , true , '登录失败 , 原因:')
	login( data: any): Observable< RESPONSE > | any {} ;
}
