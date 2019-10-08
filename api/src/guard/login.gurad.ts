import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Observable} from 'rxjs';
import {CONFIG} from '../share/config';

@Injectable()
export class LoginGurad implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {

		const request = context.switchToHttp().getRequest();
		const token = request.headers['jwt-token'];

		if ( !CONFIG.guards.login.enabled ) {
			return true;
		}

		const url: string = request.url;

		let shouldIgnore: boolean = false;

		for (let i = 0, j = CONFIG.guards.login.ignore.length; i < j; i++) {
			const item = CONFIG.guards.login.ignore[i];
			const reg = new RegExp(item, 'g');

			if ( reg.test(url) ) {
				shouldIgnore = true;
				break;
			}
		}

		if ( shouldIgnore ) {
			return true;
		}

		return token;
	}
}
