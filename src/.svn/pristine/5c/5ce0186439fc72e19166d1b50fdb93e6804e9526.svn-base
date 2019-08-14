/**
 * 
//奖金方案  reward.php
参数：
o:订单id
返回
{
	"res":0
	"data":[
        {
           "type":1 //1=>单关 2=>2串一 以此类推 到8=>8串一
           "team":[
               [庆南FC,1,4.05], //球队名，类型，赔率
               [庆南FC,1,4.05],
               [庆南FC,1,4.05],
           ]
           "b":1  //倍数
           "reward":766.26  //预测奖金
		   "m":1竞足 2竟篮 5超级竞足 6超级竟篮
        }

	]
}
 */
class RewardPhp implements IProHandle {
	private static _mInstance: RewardPhp;
	public static get getInstance(): RewardPhp {
		if (RewardPhp._mInstance == undefined)
			RewardPhp._mInstance = new RewardPhp();
		return RewardPhp._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "RewardPhp";
	}

	/**
	 * user
	 */
	public sendHttp(oid:number,type:number): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/reward.php";

		let content = `o=${oid}&t=${type}&v=${GameValue.verPhp}`;
		HTTPRequest.getInstance.proSend(url, content, this.data);
	}

	private  _mlll:Array<RewardData> = new Array<RewardData>();
	public backHTTP(res: boolean, httpObj: egret.HttpRequest, data: HttpData): void {
        if (res == true && httpObj.response != "") {//请求成功
            let text: Object;
            try {
				text = JSON.parse(httpObj.response);
			} catch (error) {
				Alertpaner.getInstance.show(error);
				return;
			}
            if(text["res"]=="1001"){
                Alertpaner.getInstance.show("超过100注无法查看方案详情");
			}else if(text["res"]!="0"){
                Alertpaner.getInstance.show(text["res"]+":"+text["msg"]);
			} else if(text["res"] == "0"){
				let arr:Array<any> = text["data"];
				let re:RewardData;
				this._mlll.length = 0;
				for(let i=0;i<arr.length;i++) {
					re = new RewardData();
					re.type = arr[i]["type"];
					re.team = arr[i]["team"];
					re.b = arr[i]["b"];
					re.reward = arr[i]["reward"];
					re.awareType = arr[i]["mold"];
					re.m = text["m"];

					this._mlll[i] = re;
				}

				FofMultier.getInstance.show(this._mlll);
			}
			
        }
    }
}

class RewardData {
	/**1竞足 2竟篮 5超级竞足 6超级竟篮 */
	public m:number;
	/**1=>单关 2=>2串一 以此类推 到8=>8串一*/
	public type:number;
	/**team [ [庆南FC,1,4.05], //球队名，类型，赔率 [庆南FC,1,4.05],  [庆南FC,1,4.05], ]*/
	public team:Array<any>;
	/**倍数 */
	public b:number;
	/**reward 预测奖金*/
	public reward:number;
    /**类型(0:待开奖  1:已中奖  2:未中奖) */
	public awareType:number=0;
}
