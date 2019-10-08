import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Observable} from 'rxjs';
import {CONFIG} from '../share/config';
import {RegUtils} from '../share/utils';

@Injectable()
export class ShopIdGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {

		const request = context.switchToHttp().getRequest();
		const shopId = request.headers['jwt-shop'];
		const queryShopId = request.query.shopId;

		if ( !CONFIG.guards.shopId.enabled ) {
			return true;
		}

		const url: string = request.url;

		let shouldIgnore: boolean = false;

		for (let i = 0, j = CONFIG.guards.shopId.ignore.length; i < j; i++) {
			const item = CONFIG.guards.shopId.ignore[i];
			const reg = new RegExp(item, 'g');
			if ( reg.test(url) ) {
				shouldIgnore = true;
				break;
			}
		}

		if ( shouldIgnore ) {
			return true;
		}

		if ( request.method === 'GET' && !RegUtils.isNumber(queryShopId) ) {
			return false;
		} else {
			return RegUtils.isNumber(shopId);
		}
	}
}
