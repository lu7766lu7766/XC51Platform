/**
 * 
足球单关
http://192.168.20.23/ticket/test/SPFT_One.php?t=   //2=>单关胜平负 3=>单关进球数 4=>单关比分 5=>单关半全场

返回t和数据列表
 */
class SPFT_One implements IProHandle {
	private static _mInstance: SPFT_One;
	public static get getInstance(): SPFT_One {
		if (SPFT_One._mInstance == undefined)
			SPFT_One._mInstance = new SPFT_One();
		return SPFT_One._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "SPFT_One";

		GTimerMag.getInstance.addTimerTask("SPFT_One", 9999999, GameValue.httpSendTime, () => {
			this._mIsSend[this._mtype] = 0;
			this.sendHttp(this._mtype, this._mParent[this._mtype],true);
		}, this);
	}

	/**type*/
	private _mtype:number = 2;
	/**是否可以发送 5秒请求一次*/
	private _mIsSend:number[] = [0,0,0,0,0,0];
	/**父类对象 */
	private _mParent:GHashMap<egret.DisplayObjectContainer> = new GHashMap<egret.DisplayObjectContainer>();

	/**
	 * 注数列表
	 * 2=>单关胜平负 3=>单关进球数 4=>单关比分 5=>单关半全场
	 */
	public sendHttp(type:number,obj:egret.DisplayObjectContainer,bool?:boolean): void {
		this._mtype = type;
		if(obj == undefined || obj.parent == undefined || (this._mIsSend[type] == 1 && FootballDataMrg.getInstance.getCJDGList(type).size > 0)) {
			return;
		}
		if(SPOnePass.getInstance.getDGList(type).size <= 0)
			LoadtoWaitWnd.getInstance.show(true);
		this._mIsSend[type] = 1;
		this._mParent.Gput(type,obj);
		if(bool == true) {
			this.data.mValue = 1;
		} else {
			this.data.mValue = 0;
		}

		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/super_Ft.php";
		let content = `t=${type}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
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
			let type = 2;
			let cf:number = 0;
            if(text["res"]!="0"){
                Alertpaner.getInstance.show(text["msg"]);
            } else {
				let map:Array<any> = text["map"];
				// cf = FT_List.isSame(FootballDataMrg.getInstance._mCJZQLBDG, map);
				FootballDataMrg.getInstance._mCJZQLBDG.clear();

				let fb:GHashMap<FootballData>;
				let dd:FootballData;
				type = text["type"];
				for(let k=0;k<map.length;k++) {
					let time:string = map[k]["time"];
					let arr:Array<any> = map[k]["list"];
					fb = FootballDataMrg.getInstance.getCJDGDataByTime(time);
					if(fb == undefined) {
						fb = new GHashMap<FootballData>();
					}
					
					for(let i=0;i<arr.length;i++) {
						dd = FootballDataMrg.getInstance.getCJDGData(time,arr[i]["id"]);
						if( dd == undefined) {
							dd = new FootballData();
						}
						let str = `${i+1}`;
						if(str.length==1)
							str = `00${str}`
						else if(str.length==2)
							str = `0${str}`;
						dd.code = str;
						dd.id = arr[i]["id"];
						dd.time = time;
						for(let j=text["min"];j<=text["max"];j++) {
							dd.listSX[j] = arr[i][j];
						}
						dd.day = arr[i]["day"];
						dd.league_name = arr[i]["league_name"];
						dd.lot_lose = arr[i]["lot_lose"];
						dd.no_lose = arr[i]["no_lose"];
						dd.team_a_name = arr[i]["team_a_name"];
						dd.team_b_name = arr[i]["team_b_name"];
						dd.stop = arr[i]["stop"];
						dd.stopT = arr[i]["t"];
						fb.Gput(dd.id, dd);
					}
					FootballDataMrg.getInstance.addCJDGData(time, fb);
				}
				
			}
			CustEventMrg.getInstance.dispatch(CustEventType.EventType_CJFTDG_List, {type:type, value:data.mValue,cf:cf});
        }
		LoadtoWaitWnd.getInstance.hide();
    }
}