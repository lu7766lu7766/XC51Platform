class CDInfo extends egret.DisplayObjectContainer {
    private _title: egret.TextField;
    private _dateText: egret.TextField;
    /**元 */
    private _yeText: egret.TextField;

    private status: egret.TextField;//状态

    constructor() {
        super();

        this._title = ToolMrg.getText(28, 6, 28, 0x333333);
        this.addChild(this._title);
        this._title.height = 50;
        this._title.verticalAlign = egret.VerticalAlign.MIDDLE;

        this.status = ToolMrg.getText(28, 65, 22, 0x333333);
        this.addChild(this.status);
        this.status.height = 50;
        this.status.bold = true;
        this.status.text = "";

        this._dateText = ToolMrg.getText(376 + 150, 80, 20, 0x999999, 200);
        this.addChild(this._dateText);
        this._dateText.height = 28;
        this._dateText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._dateText.textAlign = egret.HorizontalAlign.RIGHT;

        this._yeText = ToolMrg.getText(476, 18, 28, 0x333333, 250);
        this.addChild(this._yeText);
        this._yeText.height = 34;
        this._yeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._yeText.textAlign = egret.HorizontalAlign.RIGHT;

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0, 118.5, GameMain.getInstance.StageWidth, 1.5);
        shape.graphics.endFill();

        this.setDB();
    }

    private _data: CDDataSub;
    public aa(data: CDDataSub, index: number) {
        this._data = data;

        let num: number = 0;
        let str = "";
        if (index == 0) {
            str = "发起认购";
            num = -this._data._money;
        } else if (index == 1) {
            str = "账户充值";
            num = this._data._money;
        } else if (index == 2) {
            str = "彩金收入";
            num = this._data._money;
        } else if (index == 3) {
            str = "账户提现";
            num = -this._data._money;
        } else if (index == 4) {
            str = "佣金收入";
            num = this._data._money;
        } else if (index == 5) {
            str = "返水收入";
            num = this._data._money;
        } else if (index == 6) {
            str = "奖励收入";
            num = this._data._money;
        }
        this._title.text = `${str}`;
        this._title.text = this._data.gettatleName();
        this.status.text = this._data.gettatle();
        this._dateText.text = `${ToolMrg.getTime11(data._dateTime)}`;
        if (num > 0) {
            this._yeText.textColor = 0xF72E52;
            this._yeText.text = `+${ToolMrg.getDecimal(num / 100, 2)}元`;
        } else {
            this._yeText.textColor = 0x17B22C;
            this._yeText.text = `${ToolMrg.getDecimal(num / 100, 2)}元`;
        }
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 120);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}

class CDMrg {
    private static _mInstance: CDMrg;
    public static get getInstance(): CDMrg {
        if (CDMrg._mInstance == undefined)
            CDMrg._mInstance = new CDMrg();
        return CDMrg._mInstance;
    }
    /**资金明细所有 */
    public _AllZJ: CDData;

    constructor() {
        this._AllZJ = new CDData();
    }
}

class CDData {
    /**购彩 */
    public b: number;
    public bItem: GHashMap<CDDataSub>;

    /**充值 */
    public p: number;
    public pItem: GHashMap<CDDataSub>;

    /**派奖 */
    public j: number;
    public jItem: GHashMap<CDDataSub>;

    /**提款 */
    public t: number;
    public tItem: GHashMap<CDDataSub>;

    /**佣金 */
    public w: number;
    public wItem: GHashMap<CDDataSub>;

    /**红利 */
    public f: number;
    public fItem: GHashMap<CDDataSub>;

    /**奖励 */
    public o: number;
    public oItem: GHashMap<CDDataSub>;

    constructor() {
        this.bItem = new GHashMap<CDDataSub>();
        this.pItem = new GHashMap<CDDataSub>();
        this.jItem = new GHashMap<CDDataSub>();
        this.tItem = new GHashMap<CDDataSub>();
        this.wItem = new GHashMap<CDDataSub>();
        this.fItem = new GHashMap<CDDataSub>();
        this.oItem = new GHashMap<CDDataSub>();
    }
}

class CDDataSub {
    public typemax: number;//大类型 1购彩 2充值吧 3派奖 4提取 5佣金 6返水 7奖励s
    public id;
    public _money: number;
    public _dateTime: number;
    public status: number = -1;//类型(提款 特有类型  提款  0:待审核 1:审核通过 2:审核不通过)
    //名字类型(4 1:佣金 2:中奖金额  5 1:发单奖励  3:佣金  6: "type": 10001  //10012=>返水  10001=>新用户注册即送18元 10002=>首存5888元等你 10003=>VIP成长礼包送不停 10004=>助力中超，每周彩金大放送 10005=>呼朋唤友一起来战斗)
    //2:充值吧 1=>充值 2=>人工代充
    public type: number = 0;

    /**提取特有审核状态 */
    public gettatle(): string {
        let str: string = "";
        if (this.typemax == 4) {
            if (this.status == 0) {
                str = "待审核";
            } else if (this.status == 1) {
                str = "审核通过";
            } else if (this.status == 2) {
                str = "审核不通过";
            }
        }
        return str;
    }

    /**类型名字*/
    public gettatleName(): string {
        let str: string = "";
        if (this.typemax == 1) {
            str = "发起认购";
        } else if (this.typemax == 2) {
            str = "账户充值";
            if(this.type == 1){
                str = "充值";
            } else if(this.type == 2){
                str = "人工代充";
            }
        } else if (this.typemax == 3) {
            str = "彩金收入";
        } else if (this.typemax == 4) {//1:余额 2:跟单佣金 3代理佣金
            str = "账户提现";
            if (this.type == 1) {
                str = "余额";
            } else if (this.type == 2) {
                str = "跟单佣金";
            } else if (this.type == 3) {
                str = "代理佣金";
            }
        } else if (this.typemax == 5) {
            str = "佣金收入";
            if (this.type == 1) {
                str = "发单奖励";
            } else if (this.type == 3) {
                str = "佣金";
            }
        } else if (this.typemax == 6) {
            str = "返水收入";
            if (this.type == 10012) {
                str = "返水";
            } else if (this.type == 10001) {
                str = "新用户注册即送18元";
            } else if (this.type == 10002) {
                str = "首存5888元等你";
            } else if (this.type == 10003) {
                str = "VIP成长礼包送不停";
            } else if (this.type == 10004) {
                str = "助力中超，每周彩金大放送";
            } else if (this.type == 10005) {
                str = "呼朋唤友一起来战斗";
            }
        } else if (this.typemax == 7) {
            str = "奖励收入";
        }
        return str;
    }
}