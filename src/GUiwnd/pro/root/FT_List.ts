/**
 * 足球：
http://192.168.20.23/ticket/test/ft_List.php
           "time": "2019-07-03 周三",  //日期
            "list": [   //列表数组
                {
                    "0": "4.4",  //不让球的赢赔率
                    "1": "2.37", //不让球的平赔率
                    "2": "1.96", //不让球的负赔率
                    "3": "1.57",  //让球的赢赔率
                    "4": "3.35",  //让球的平赔率
                    "5": "4.5",   //让球的负赔率
                    "id": "1702572",   //赛事ID
                    "day": "周三",      //周几
                    "league_name": "非洲杯",  //联赛昵称
                    "lot_lose": "1",      //让球数
                     "no_lose": "0",      //不让球数
                    "team_a_name": "贝宁",  //队伍A昵称
                    "team_b_name": "喀麦隆",  //队伍B昵称
                    "stop": "23:50"。        //停止销售的时间
                },
 */
class FT_List implements IProHandle {
	private static _mInstance: FT_List;
	public static get getInstance(): FT_List {
		if (FT_List._mInstance == undefined)
			FT_List._mInstance = new FT_List();
		return FT_List._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "FT_List";

		GTimerMag.getInstance.addTimerTask("FT_List", 9999999, GameValue.httpSendTime, () => {
			this._mIsSend = true;
			this.sendHttp(this._mParent,true);
		}, this);
	}

	/**是否可以发送 5秒请求一次*/
	private _mIsSend:boolean = true;
	/**父类对象 */
	private _mParent:egret.DisplayObjectContainer;
	/**
	 * 注数列表
	 */
	public sendHttp(obj:egret.DisplayObjectContainer,bool?:boolean): void {
		this._mParent = obj;
		if(obj == undefined || this._mParent.parent == undefined || (this._mIsSend == false && FootballDataMrg.getInstance._mZQLB.size > 0)) {
			return;
		}
		if(FootballDataMrg.getInstance._mZQLB.size <= 0)
			LoadtoWaitWnd.getInstance.show(true);
		if(bool == true) {
			this.data.mValue = 1;
		} else {
			this.data.mValue = 0;
		}
		this._mIsSend = false;
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/ft_List.php";
		let content = `v=${GameValue.verPhp}`;
		HTTPRequest.getInstance.proSend(url, content, this.data);
	}
	
	/** 只保存刷新前数组 */
	private listSX:GHashMap<FootballData> = new GHashMap<FootballData>();

	public backHTTP(res: boolean, httpObj: egret.HttpRequest, data: HttpData): void {
        if (res == true && httpObj.response != "") {//请求成功
            let text: Object;
            try {
				text = JSON.parse(httpObj.response);
			} catch (error) {
				return;
			}
			let cf:number = 0;
            if(text["res"]!="0"){
                Alertpaner.getInstance.show(text["msg"]);
            } else {
				let map:Array<any> = text["map"];
				cf = FT_List.isSame(FootballDataMrg.getInstance._mZQLB, map);

				//先抽取数组里的listSX保存,再清除数组
				this.listSX.clear();
				for(let key of FootballDataMrg.getInstance._mZQLB.keys){
					let obj = FootballDataMrg.getInstance._mZQLB.Gget(key);
					for(let akey of obj.keys)
						this.listSX.Gput(obj.Gget(akey).id,obj.Gget(akey));
				}
				FootballDataMrg.getInstance._mZQLB.clear();
				
				let fb:GHashMap<FootballData>;
				let dd:FootballData;
				
				for(let k=0;k<map.length;k++) {
					let time:string = map[k]["time"];
					let arr:Array<any> = map[k]["list"];
					fb = FootballDataMrg.getInstance.getDataByTime(time);
					if(fb == undefined) {
						fb = new GHashMap<FootballData>();
					}
					for(let i=0;i<arr.length;i++) {
						dd = FootballDataMrg.getInstance.getData(time,arr[i]["id"]);
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

						let iList:Array<number> = [];
						//刷新保存之前listSX值再替换 刷新只会刷新0-5 6-53不会变
						for(let key of this.listSX.keys){
							if(this.listSX.Gget(key).id == dd.id)
								iList = this.listSX.Gget(key).listSX;
						}
						for(let j=0;j<6;j++) {
							iList[j] = arr[i][j];
						}
						dd.listSX = iList;

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
					FootballDataMrg.getInstance.addData(time, fb);
				}
			}
			CustEventMrg.getInstance.dispatch(CustEventType.EventType_FT_List, {value:data.mValue,cf:cf});
        }
		LoadtoWaitWnd.getInstance.hide();
    }

	public static isSame(list1:GHashMap<GHashMap<FootballData>>, map:Array<any>):number {
		let bool:boolean = false;
		for(let key of list1.keys) {
			bool = false;
			for(let k=0;k<map.length;k++) {
				if(key == map[k]["time"]) {
					bool = true;
					if(list1.Gget(key).size != map[k]["list"].length) {//不相等
						return 1;
					}
				}
				if(k == map.length-1 && bool == false) {
					return 1;
				}
			}
		}
		if(map.length <= 0) {
			return 1;
		}
		return 0;
	}
}