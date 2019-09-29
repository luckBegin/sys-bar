import * as path from 'path';

export const CONFIG = {
	image: {
		uploadDir: path.resolve(__dirname, '../../image'),
		prefix: 'http://192.168.191.1:3002',
	},
	swagger: {
		enabled: true,
		path: 'swagger',
	},
	dataBases: {
		type: 'mysql',
		host: '127.0.0.1',
		port: 3306,
		username: 'root',
		password: 'luckly1993',
		database: 'test',
		entities: [
			'src/**/**.entity{.ts,.js}',
		],
		synchronize: false,
		logging: false,
		// type: 'mysql',
		// host: '185.251.44.91',
		// port: 9999,
		// username: 'root',
		// password:'luckly@qq1993',
		// database: 'test',
		// entities: [
		// 	'src/**/**.entity{.ts,.js}',
		// ],
		// synchronize: false,
	},
	port: 3002,
	guards: {
		login: {
			enabled: false,
			ignore: [
				'/system/staff/login',
				'/system/staff/byUid',
				'/wechat/userLogin' ,
				'/gallery/list/get/.*',
			],
		},
		shopId: {
			enabled: false,
			ignore: [
				'/system/staff/login',
				'/system/staff/byUid',
				'/wechat/userLogin' ,
				'/gallery/list/get/.*',
			],
		},
	},
	tokenTime: 86400000 , // token 有效时间 单位 s,
	timeDiff: 4 , // 营业时间差 单位 h ,
	qrEnableTime: 300 , // 会员二维码有效时间 单位 s
	wechat: {
		appId: 'wxf89c4d5da49bf4dd', // wxe21acff4348cd585
		appsecret: 'e282bf4dc684fc2579c9cf7a254cc3e9', // 866e2f9cc0390850ce0e5f018dfa910f
		token: '866e2f9cc0390850ce0e5f018dfa910f' ,
		projectUrl: 'http://sys.jpgqs.cn/mobile/preLogin' ,
		qrCodeTime: 60, // 生成的二维码有效期 单位 s
	},
};
