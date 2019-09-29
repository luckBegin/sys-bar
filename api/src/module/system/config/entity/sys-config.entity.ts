import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;
import {root} from "rxjs/internal-compatibility";

@Entity()
export class Sys_config extends BasicEntity {
	@Column()
	@ApiModelProperty({ description: '店铺ID'})
	shopId: number ;
	
	@Column()
	@ApiModelProperty({ description: '父级配置ID'})
	parentId: number ;
	
	@Column()
	@ApiModelProperty({ description: '配置类型'})
	type: string ;
	
	@Column()
	@ApiModelProperty({ description: '配置名'})
	key: string ;
	
	@Column()
	@ApiModelProperty({ description: '配置值'})
	value: string;
	
	@Column()
	@ApiModelProperty({ description: '额外属性'})
	remark: string;
}

export interface  IQuery {
	shopId: number ;
	parentId: number ;
	type: string ;
	key: string ;
}
export class Query implements IQuery{
	public shopId: number ;
	public parentId: number ;
	public type: string ;
	public key: string ;
	
	constructor( query: { [key: string]: any }) {
		if( query.shopId )
			this.shopId = query.shopId;
		
		if( query.parentId )
			this.parentId = query.parentId ;
		
		if( query.type )
			this.type = query.type ;
		
		if( query.key )
			this.key = query.key ;
	}
}
