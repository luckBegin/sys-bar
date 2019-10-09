import { Entity, Column } from 'typeorm' ;
import { ApiModelProperty } from '@nestjs/swagger' ;
import { BasicEntity } from '../../../../share/entities' ;

@Entity()
export class Room_list extends BasicEntity {
	@Column()
	@ApiModelProperty({description: '店铺ID'})
	shopId: number ;

	@Column()
	@ApiModelProperty({description: '区域名称' })
	name: string ;

	@Column()
	@ApiModelProperty({description:'备注'})
	remark: string ;

	@Column()
	@ApiModelProperty( {description: '类型ID'})
	typeId: number ;

	@Column()
	@ApiModelProperty({ description: '区域ID'})
	areaId : number ;

	@Column()
	@ApiModelProperty({description:'状态 0: 空台 1:预定 2:待客 3:消费 4:清理 5:故障 6:上线 7:线上'})
	status: number ;

	@Column()
	@ApiModelProperty({description:'订单ID'})
	orderId: number ;

	@Column()
	@ApiModelProperty({description: '预定ID'})
	bookId: number ;

	@Column()
	@ApiModelProperty({ description:'故障原因'})
	reason: string ;
}

export interface  IQuery {
	shopId: number ;
	id: number ;
	typeId: number ;
	areaId: number;
	status: number ;
}

export class QueryParam implements IQuery{
	public shopId: number ;
	public id: number ;
	public typeId: number ;
	public areaId: number ;
	public status: number ;
	constructor( query: { [key: string]: any }) {
		if( query.shopId )
			this.shopId = query.shopId;
		if( query.id )
			this.id = query.id ;
		if( query.typeId )
			this.typeId = query.typeId ;
		if( query.areaId )
			this.areaId = query.areaId ;
		if( query.status )
			this.status = query.status ;
	}
}
