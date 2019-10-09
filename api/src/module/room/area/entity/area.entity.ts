import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;

@Entity()
export class Room_area extends BasicEntity {
	@Column()
	@ApiModelProperty({description: '店铺ID'})
	shopId: number ;

	@Column()
	@ApiModelProperty({description: '区域名称' })
	name: string ;

	@Column()
	@ApiModelProperty({description:'备注'})
	remark: string ;
}

export interface  IQuery {
	shopId: number ;
	id: number ;
}

export class QueryParam implements IQuery{
	public shopId: number ;
	public id: number ;
	constructor( query: { [key: string]: any }) {
		if( query.shopId )
			this.shopId = query.shopId;
		if( query.id )
			this.id = query.id ;
	}
}
