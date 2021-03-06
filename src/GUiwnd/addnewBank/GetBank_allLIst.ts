/**
 * 获取用户全部银行卡
参数
id:用户id
返回
{
    "res": 0,
    "care": [
        {
            "name": "建设银行",
            "care": "6217003320014891389"
        },
        {
            "name": "建设银行",
            "care": "6217003320014891340"
        }
    ]
}
 */
class GetBank_allLIst implements IProHandle {
    private static _mInstance: GetBank_allLIst;
    public static get getInstance(): GetBank_allLIst {
        if (GetBank_allLIst._mInstance == undefined)
            GetBank_allLIst._mInstance = new GetBank_allLIst();
        return GetBank_allLIst._mInstance;
    }
    /**对象key */
    private data: HttpData;
    private constructor() {
        this.data = new HttpData();
        this.data.mKey = "GetBank_allLIst";
    }

	/**
	 * 注数列表
	 */
    public sendHttp(id): void {
        if(UserData.getInstance.isLogin() == false) {
            return;
        }
        let url: string = HTTPRequest.getInstance.httpHeadUrl + "/showCare.php";
        let content = `id=${id}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    }


    private _userLink: string;

    public backHTTP(res: boolean, httpObj: egret.HttpRequest, data: HttpData): void {

        if (res == true && httpObj.response != "") {//请求成功
            let text: Object;
            try {
                text = JSON.parse(httpObj.response);
            } catch (error) {
                return;
            }
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["msg"]);
            } else {
                SelectDataMrg.getInstance.clearItem();

                let arr: Array<GHashMap<any>> = text["care"];
                if (arr != undefined && arr.length > 0) {
                    for (let i = 0; i < arr.length; i++) {
                        let obj = new SelectData_card();
                        let aaa = arr[i];
                        obj.id = i;
                        obj.BankName = aaa["name"];
                        obj.cardNum = aaa["care"];
                         obj.userName = aaa["r"];
                        let num: number = aaa["type"];
                        if (num == 1) {
                            obj.typeName = "储蓄卡";
                        } else if (num == 2) {
                            obj.typeName = "信用卡";
                        } else {
                            obj.typeName = "其他";
                        }
                        SelectDataMrg.getInstance.addDataToItem(i, obj);
                    }
                }
                if (CardAddtoSelect.getInstance != undefined && CardAddtoSelect.getInstance.parent != undefined)
                    CardAddtoSelect.getInstance.updata();

                if (selectBankcard.getInstance != undefined && selectBankcard.getInstance.parent != undefined) {
                    selectBankcard.getInstance.initallInfo();
                    // selectBankcard.getInstance.hide();
                    // withdrawData.getInstance.show();
                }
                if (withdrawViewMrg.getInstance != undefined && withdrawViewMrg.getInstance.parent != undefined) {
                    withdrawViewMrg.getInstance.initallInfo();
                    withdrawViewMrg.getInstance.initallInfo1()
                }
            }
        }
    }
}