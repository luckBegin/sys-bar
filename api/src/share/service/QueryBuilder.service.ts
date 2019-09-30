import {Repository, SelectQueryBuilder} from 'typeorm' ;
import {BasicTreeEntity} from '../entities';
import {Response, ResponseModel} from '../response' ;

class QueryBuilder {
	public async query(
		page: { size: number, page: number }, query: any,
		target: Repository<any>, shopSer?: any, columns?: string,
		extraWhere?: { key: string, value: object }[]
	): Promise< ResponseModel > {
		const builder = this.whereBuilder(target, query);
		let result = null;
		let total = null;
		
		if (extraWhere) {
			extraWhere.forEach(item => {
				builder.andWhere(item.key, item.value);
			})
		}
		
		builder.take(page.size).skip((page.page - 1) * page.size);
		
		try {
			if (columns) {
				builder.select(columns);
				total = await builder.getCount();
				result = await builder.getRawMany();
			} else {
				[result, total] = await builder.getManyAndCount();
			}
			
			if (query.shopId && shopSer) {
				for (let i = 0, j = result.length; i < j; i++) {
					const shopInfo = await shopSer.findByIds([query.shopId]);
					result[i].shopInfo = shopInfo[0];
				}
			}
			
			const Page = Response.page(page.size, total, Math.ceil(total / page.size));
			return Response.success({data: result, page: Page});
		} catch (e) {
			return Response.error({message: e});
		}
	}
	
	public whereBuilder(
		repository: Repository<any>,
		whereCondition: { [key: string]: any } | Array<{ [key: string]: any, symbol: '=' | '>' | '<' | '>=' | '<=' }>
	): SelectQueryBuilder<BasicTreeEntity> {
		const builder = repository.createQueryBuilder();
		if (whereCondition instanceof Array) {
			return this.arrObjWhereBuilder(
				builder,
				whereCondition as Array<{ [key: string]: any, symbol: '=' | '>' | '<' | '>=' | '<=' }>
			);
		}
		
		if (whereCondition instanceof Object) {
			return this.objWhereBuilder(builder, whereCondition);
		}
	}
	
	private objWhereBuilder(
		builder: SelectQueryBuilder<BasicTreeEntity>,
		whereCondition: { [key: string]: any }
	): SelectQueryBuilder<BasicTreeEntity> {
		Object.keys(whereCondition).forEach(item => {
			if (whereCondition[item]) {
				const obj = {};
				obj[item] = whereCondition[item];
				builder.andWhere(` ${item} = :${item}`, obj);
			}
		});
		return builder;
	};
	
	private arrObjWhereBuilder(
		builder: SelectQueryBuilder<BasicTreeEntity>,
		whereCondition: Array<{ [key: string]: any, symbol: '=' | '>' | '<' | '>=' | '<=' }>
	): SelectQueryBuilder<BasicTreeEntity> {
		whereCondition.forEach((item, index) => {
			Object.keys(item).forEach(key => {
				const obj = {};
				if (key != 'symbol') {
					obj[key + index] = item[key];
					builder.andWhere(` ${key} ${item.symbol} :${key + index}`, obj);
				}
			});
		});
		return builder;
	}
}

export const QueryBuilderService = new QueryBuilder();
