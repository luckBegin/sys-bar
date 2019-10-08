import { Component, OnInit } from '@angular/core' ;
import { MsgService } from '../../../service';
import { RoomTypeService } from '../../../service/room';
import { DateUtils } from '@shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RESPONSE } from '../../../models';

@Component({
    selector: 'room-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.less'],
})
export class RoomTypeComponent implements OnInit {
    constructor(
        private readonly msg: MsgService,
        private readonly service: RoomTypeService,
        private readonly fb: FormBuilder
    ) {
    } ;

    ngOnInit(): void {
        this.getList() ;
    }


    getList(): void {
        this.tableData.loading = true ;
        this.service.get()
            .subscribe( ( res: RESPONSE ) => {
                this.tableData.loading = false ;
                this.tableData.data = res.data ;
            })
    }

    form: FormGroup = this.fb.group({
        name : [ null , [ Validators.required ]] ,
        remark : [ null ] ,
        shopId: [ null ] ,
        id : [ null ]
    });

    tableData = {
        loading: true,
        page: 1,
        total: 0,
        columns: [
            { title: '名称', type: 'text', reflect: 'name' },
            {
                title: '所属店', type: 'text', filter: (val) => {
                    if (val.shopInfo)
                        return val.shopInfo.name;
                    else
                        return '未配置';
                },
            },
            {
                title: '创建时间', type: 'text', filter: (val) => {
                    return DateUtils.format(val.createTime, 'y-m-d');
                },
            },
            {
                title: '备注', type: 'text', filter: (val) => {
                    return val.remark ? val.remark : '无';
                },
            },
        ],
        data: [],
        btn: {
            title: '操作',
            items: [{
                type: 'del',
                title: '删除',
                fn: (data) => {
                    this.isVisible = true;
                    this.form.patchValue(data);
                },
            }, {
                type: 'edit',
                title: '编辑',
                fn: (data) => {
                    this.form.patchValue(data);
                    this.editMark = true;
                    this.infoBoxShow = true;
                },
            },
            ],
        },
    };
    isVisible:boolean = false ;
    editMark: boolean = false ;
    infoBoxShow: boolean = false ;
}
