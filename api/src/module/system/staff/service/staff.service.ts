import { forwardRef, Inject, Injectable } from '@nestjs/common' ;
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from '../entities/staff.entity' ;
import { Repository } from 'typeorm' ;
import { Response, QueryBuilderService, ResponseModel } from '../../../../share' ;
import { DepartService } from '../../depart';
import { RoleService } from '../../role';
import { MenuService } from '../../menu';
import { ShopService } from '../../shop';
import { DateUtils } from '../../../../share/utils';
import { CONFIG } from '../../../../share/config';
import * as md5 from 'md5' ;

@Injectable()
export class StaffService {
	constructor(
		@InjectRepository(Staff) private readonly staff: Repository<Staff>,
		private readonly departService: DepartService,
		private readonly roleService: RoleService,
		private readonly menuService: MenuService,
		private readonly shopService: ShopService,
	) {
	}

	private recursive(parent: any[], source: any[], allowIds: number[]): void {
		parent.forEach(item => {
			item.children = [];

			const id = item.id;

			source.forEach(child => {
				const parentId = child.parentId;
				const childId = child.id;
				if (id === parentId && !!~allowIds.indexOf(childId)) {
					item.children.push(child);
				}
			});

			if (item.children.length > 0) {
				this.recursive(item.children, source, allowIds);
			}
		});
	}

	public async get(page: number = 1, size: number = 10, query: any, shopId: number): Promise<any> {
		const columns = 'id , username , name ,remark , createTime, status , openid , departIds , roleIds, shopId , phoneNumber';
		const builder = this.staff
			.createQueryBuilder()
			.where(query)
			.where('shopId like :shopId')
			.setParameters({
				shopId: `%${shopId}%`,
			})
			.take(size)
			.skip((page - 1) * size)
			.select(columns);

		const total = await builder.getCount();
		const result = await builder.getRawMany();
		const Page = Response.page(size, total, Math.ceil(total / size));
		const data = Response.success({ data: result, page: Page });

		if (data.success === true && data.data) {
			for (const item of data.data) {
				const roleIds = item.roleIds.split(',');
				const departIds = item.departIds.split(',');
				const shopIds = item.shopId.split(',');
				item.departmentDTOS = await this.departService.findByIds(departIds);
				item.roleOutputVOS = await this.roleService.findByIds(roleIds);
				item.shopOutputVOS = await this.shopService.findByIds(shopIds);
			}
		}
		return data;
	}

	public async post(data: any): Promise<any> {
		try {
			const shop = this.staff.create(data);
			await this.staff.insert(shop);
			return Response.success();
		} catch (e) {
			return Response.error({ message: e });
		}
	}

	public async put(data: any): Promise<ResponseModel> {
		try {
			const shop = this.staff.create(data);
			const result = await this.staff.save(shop);
			return Response.success();
		} catch (e) {
			return Response.error({ message: e });
		}
	}

	public async login(data: any): Promise<ResponseModel> {
		const username = data.username;
		const password = data.password;
		const findUser = await this.staff.findOne({ username, password });
		return await this.getUserLoginInfo(findUser);
	}

	public async delete(id: number): Promise<any> {
		try {
			await this.staff.delete(id);
			return Response.success();
		} catch (e) {
			return Response.error({ message: e });
		}
	}

	public async qrCodeLogin(code: string): Promise<ResponseModel> {
		const user = await this.staff.findOne({ token: code });
		return await this.getUserLoginInfo(user);
	}

	private async getUserLoginInfo(userInfo: Staff): Promise<ResponseModel> {
		if (userInfo) {
			if (userInfo.roleIds.length <= 0) {
				return Response.error({ message: '该账户未拥有任何权限,请联系管理员' });
			}

			if (userInfo.shopId.length <= 0) {
				return Response.error({ message: '该账户不属于任何店铺' });
			}

			if (userInfo.status === 0) {
				return Response.error({ message: '该账户已被冻结,请联系管理员' });
			}

			const roleIds = userInfo.roleIds.split(',');
			const departIds = userInfo.departIds.split(',');
			const shopId = userInfo.shopId.split(',');

			const roleInfo = await this.roleService.findByIds(roleIds.map(item => Number(item)));
			const departInfo = await this.departService.findByIds(departIds.map(item => Number(item)));
			const shopInfo = await this.shopService.findByIds(shopId.map(item => Number(item)));
			const allMenu = (await this.menuService.findAll()).data;
			const wxUserInfo =  {} ;
			const vipInfo = {} ;

			const typeInfo = {} ;
			const menuIds = [];

			roleInfo.forEach(item => {
				item.menuIds.split(',').forEach(val => {
					const id = Number(val);
					if (!~menuIds.indexOf(id)) {
						menuIds.push(id);
					}
				});
			});
			const menuInfo = [];
			let idx = 0;
			while (menuIds.length > idx) {
				const id = menuIds[idx];
				allMenu.forEach((item, index) => {
					if (item.id === id && item.parentId === 0 && !!~menuIds.indexOf(item.id)) {
						menuInfo.push(item);
						allMenu.splice(index, 1);
					}
				});
				idx++;
			}

			this.recursive(menuInfo, allMenu, menuIds);
			const value = md5(Number(DateUtils.getNow(true)) + CONFIG.tokenTime);
			const token = { value };
			return Response.success({
				data: {
					userInfo,
					roleInfo,
					menuInfo,
					departInfo,
					shopInfo,
					token,
					wxUserInfo,
					typeInfo,
					vipInfo,
				},
			});
		} else {
			return Response.error({ message: '用户不存在或密码不正确' });
		}
	};

	public async byUid(uid: number): Promise<ResponseModel> {
		const user = await this.staff.findOne({ id: uid });
		return await this.getUserLoginInfo(user);
	};

	public async changePass(data: any): Promise<ResponseModel> {
		const entity = await this.staff.findOne(data.modifyUser);
		entity.password = data.new;
		entity.modifyUser = data.modifyUser;
		return await this.put(entity);
	};

	public async staffExist(id: number): Promise<boolean> {
		const staff = await this.staff.findOne({ id });
		return !!staff;
	}
}
