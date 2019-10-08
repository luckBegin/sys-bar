import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;

@Entity()
export class Room_area extends BasicEntity {
	@Column()
	@ApiModelProperty({description: '店铺ID'})
	shopID: number ;

	@Column()
	@ApiModelProperty({description: '区域名称' })
	name: string ;
}

export interface  IQuery {
	shopId: number ;
	id: number ;
}

export class Query implements IQuery{
	public shopId: number ;
	public id: number ;
	constructor( query: { [key: string]: any }) {
		if( query.shopId )
			this.shopId = query.shopId;
	}
}
