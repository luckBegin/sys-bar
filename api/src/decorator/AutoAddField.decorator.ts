import {ObjectUtils} from "../share/utils";

export function AutoAddField(fn: ( ...arg: any[] ) => object ) {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const raw = descriptor.value;
		descriptor.value = function(...arg) {
			const extraData = fn.apply(this , arg );
			arg[1] = ObjectUtils.extend(arg[1] , extraData ) ;
			raw.apply( this, arg ) ;
		};
	};
}
