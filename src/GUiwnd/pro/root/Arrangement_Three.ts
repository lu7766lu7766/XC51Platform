/**
 * 排列三
	http://192.168.20.23/ticket/test/Arrangement_Three.php?id=&s=&b=&z=&m=

	id=>用户ID，s=>json数组,b=>倍数，z=>注数，m=>金额（分）
 */
class Arrangement_Three implements IProHandle {
	private static _mInstance: Arrangement_Three;
	public static get getInstance(): Arrangement_Three {
		if (Arrangement_Three._mInstance == undefined)
			Arrangement_Three._mInstance = new Arrangement_Three();
		return Arrangement_Three._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "Arrangement_Three";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(list:Array<InjectionCode>,bs:number,czType:string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/Arrangement_Three.php";
		let a = new Array();
		let zs:number = 0;
		let m:number = 0;
		let obj:InjectionCode;
		for(let i=0;i<list.length;i++) {
			obj = list[i];
			zs += obj.injectionNum;
			if(a[obj.type] == undefined) {
				a[obj.type] = [];
			}
			a[obj.type].push(obj.result);
		}
		m = zs*bs*200;
		let jsonstr;
		jsonstr="{";
		for(let i=0;i<a.length;i++) {
			if(a[i] != undefined) {
				jsonstr += "\""+i+"\":[";
				for(let j=0;j<a[i].length;j++) {
					jsonstr += "\""+a[i][j]+"\",";
				}
				jsonstr=jsonstr.substring(0,jsonstr.lastIndexOf(','));
				jsonstr += "],";
			}
		}
		jsonstr=jsonstr.substring(0,jsonstr.lastIndexOf(','));
		jsonstr+="}";

		let content = `id=${UserData.getInstance.userId}&s=${jsonstr}&b=${bs}&z=${zs}&m=${m}&mold=${czType}&rkey=${GameValue.orderKey}&v=${GameValue.verPhp}`;
		HTTPRequest.getInstance.proSend(url, content, this.data);
	}

	public backHTTP(res: boolean, httpObj: egret.HttpRequest, data: HttpData): void {
        if (res == true && httpObj.response != "") {//请求成功
            let text: Object;
            try {
				text = JSON.parse(httpObj.response);
			} catch (error) {
				Alertpaner.getInstance.show(httpObj.response);
				return;
			}
            if(text["res"]!="0"){
                Alertpaner.getInstance.show(text["msg"]);
            } else {
				Alertpaner.getInstance.show("下注成功");
				ThreeBox.getInstance.zfBack();
			}
			
        }
    }
}