/**
 * 资金明细列表

 */
class CD_List implements IProHandle {
    private static _mInstance: CD_List;
    public static get getInstance(): CD_List {
        if (CD_List._mInstance == undefined)
            CD_List._mInstance = new CD_List();
        return CD_List._mInstance;
    }
    /**对象key */
    private data: HttpData;
    private constructor() {
        this.data = new HttpData();
        this.data.mKey = "CD_List";
    }

	/**
	 * 注数列表
	 */
    public sendHttp(id): void {
        let url: string = HTTPRequest.getInstance.httpHeadUrl + "/money.php";
        let content = `id=${id}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    }

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
                let obj = new CDData();

                obj.b = text["b"]["total"];
                obj.p = text["p"]["total"];
                obj.j = text["j"]["total"];
                obj.t = text["t"]["total"];
                obj.w = text["w"]["total"];
                obj.f = text["f"]["total"];
                // obj.o = text["o"]["total"];


                let bitem: Array<GHashMap<any>> = text["b"]["list"];
                if (bitem != undefined && bitem.length > 0) {
                    for (let i = 0; i < bitem.length; i++) {
                        let sub = new CDDataSub();
                        let aaa = bitem[i];
                        sub.typemax = 1;
                        sub.id = i;
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        obj.bItem.Gput(sub.id, sub);
                    }
                }

                let pitem: Array<GHashMap<any>> = text["p"]["list"];
                if (pitem != undefined && pitem.length > 0) {
                    for (let i = 0; i < pitem.length; i++) {
                        let sub = new CDDataSub();
                        let aaa = pitem[i];
                        sub.typemax = 2;
                        sub.id = i;
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        obj.pItem.Gput(sub.id, sub);
                    }
                }

                let jitem: Array<GHashMap<any>> = text["j"]["list"];
                if (jitem != undefined && jitem.length > 0) {
                    for (let i = 0; i < jitem.length; i++) {
                        let sub = new CDDataSub();
                        let aaa = jitem[i];
                        sub.typemax = 3;
                        sub.id = i;
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        obj.jItem.Gput(sub.id, sub);
                    }
                }

                let titem: Array<GHashMap<any>> = text["t"]["list"];
                if (titem != undefined && titem.length > 0) {
                    for (let i = 0; i < titem.length; i++) {
                        let sub = new CDDataSub();
                        let aaa = titem[i];
                        sub.id = i;
                        sub.typemax = 4;
                        sub.status = aaa["status"];
                        sub.type = aaa["type"];
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        obj.tItem.Gput(sub.id, sub);
                    }
                }

                let witem: Array<GHashMap<any>> = text["w"]["list"];
                if (witem != undefined && witem.length > 0) {
                    for (let i = 0; i < witem.length; i++) {
                        let sub = new CDDataSub();
                        let aaa = witem[i];
                        sub.typemax = 5;
                        sub.type = aaa["type"];
                        sub.id = i;
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        obj.wItem.Gput(sub.id, sub);
                    }
                }

                let fitem: Array<GHashMap<any>> = text["f"]["list"];
                if (fitem != undefined && fitem.length > 0) {
                    for (let i = 0; i < fitem.length; i++) {
                        let sub = new CDDataSub();
                        let aaa = fitem[i];
                        sub.id = i;
                        sub.typemax = 6;
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        sub.type = aaa["type"];
                        obj.fItem.Gput(sub.id, sub);
                    }
                }

                // let oitem: Array<GHashMap<any>> = text["o"]["list"];
                // if (oitem != undefined && oitem.length > 0) {
                //     for (let i = 0; i < oitem.length; i++) {
                //         let sub = new CDDataSub();
                //         let aaa = oitem[i];
                //         sub.id = i;
                //         sub.typemax = 7;
                //         sub._money = aaa["money"];
                //         sub._dateTime = aaa["time"];
                //         obj.oItem.Gput(sub.id, sub);
                //     }
                // }

                CDMrg.getInstance._AllZJ = obj;

                if (CapitalWnd.getInstance != undefined && CapitalWnd.getInstance.parent != undefined)
                    CapitalWnd.getInstance.upData();
            }
        }
    }
}