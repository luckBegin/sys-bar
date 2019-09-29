export const ObjectUtils = {
	extend: (target: any, source: any, cover: boolean = false): object => {
		Object.keys(source).forEach(key => {
			if ( cover && !target[key] ){
				target[key] = source[key];
			}

			if ( !cover ) {
				target[key] = source[key];
			}
		});

		return target;
	},
};
