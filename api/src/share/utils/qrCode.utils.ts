import * as qrCode from 'qrcode' ;
import * as md5 from 'md5' ;
import {DateUtils} from "./date.utils";
import {Response} from '../../share' ;
import {CONFIG} from "../config";

export const QrCode = async (url: string): Promise<string> => {
	return await qrCode.toDataURL(url , { width: 120 , height:120 , margin: 0 });
};

export const ObjQrCodeEnCode = ( obj: { [key: string ]: any }): string => {
	obj.createTime = DateUtils.getNow() ;
	let keyValBase64: string[] =  [] ;
	
	Object.keys( obj ).forEach( key => {
		let b = Buffer.from( key + ':' + obj[key]) ;
		keyValBase64.push( b.toString('base64')) ;
	});
	
	const token = md5(  keyValBase64.join('') ) ;
	
	keyValBase64.push( token ) ;
	
	const result = Buffer.from( keyValBase64.join('|') ) ;
	
	return result.toString('base64') ;
};
export const ObjQrCodeDeCode = ( qrStr: string ): Response => {
	const result = Buffer.from( qrStr , 'base64').toString('utf-8').split('|') ;
	if( result.length < 4 ) {
		return Response.error({message: '无效的二维码'}) ;
	} else {
		const token = md5( result[0] + result[1] + result[2]) ;
		if( token !== result.pop() ){
			return Response.error({message: '无效的二维码'}) ;
		}
		const data: { [key: string]: any } = {};
		result.forEach( item => {
			const str = Buffer.from( item , 'base64').toString('utf-8').split(":") ;
			data[ str[0]] = str[1] ;
		});
		
		const now = DateUtils.getNow() as number;
		
		if( ( now - data.createTime ) > ( CONFIG.qrEnableTime * 1000) ) {
			return Response.error({message: '二维码已过期'}) ;
		}
		
		return Response.success({ data }) ;
	}
};
