export  class ResponseModel {
	public code?: number = 200 ;
	public message?: string = null ;
	public success?: boolean = null ;
	public data?: any  = null ;
	public page?: Page = null ;
	public timeStamp: number = null ;
	public build( key: 'code' | 'message' |  'success' | 'data' | 'page' | 'timeStamp' , val: any = ''): ResponseModel {
		if (key)
			(this[key] as any) = val ;
		return this ;
	}
}
class Page {
	pageSize: number ;
	totalNumber: number ;
	totalPage: number ;

	constructor( pageSize: number , totalNumber: number , totalPage: number ) {
		this.pageSize = pageSize ;
		this.totalNumber = totalNumber ;
		this.totalPage = totalPage ;
	}
}

export class Response {

	private static buildRes( data: ResponseModel ): ResponseModel {
		const model =  new ResponseModel() ;

		if ( data && data.code) {
			model.build('code' , data.code) ;
		}

		if (data && data.page) {
			model.build('page' , data.page) ;
		}

		if (data && data.message) {
			model.build('message' , data.message.toString()) ;
		}

		if (data && data.page) {
			model.build('page' , data.page ) ;
		}

		if (data && data.data) {
			model.build('data' , data.data) ;
		}
		return model ;
	}

	static success = ( data?: any ): ResponseModel => {
		return Response.buildRes(data)
			.build('success' , true )
			.build('timeStamp' , Date.now() ) ;
	};

	static error = ( data?: any ): ResponseModel => {
		return Response.buildRes(data)
			.build('success' , false )
			.build('timeStamp' , Date.now() ) ;
	};

	static page = ( pageSize: number = 0 , totalNumber: number =  0 , totalPage: number = 0  ): Page => {
		return new Page(pageSize , totalNumber , totalPage ) ;
	}
}
