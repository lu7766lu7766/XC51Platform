/**超级足球筛选 */
class SPFBscreen extends egret.DisplayObjectContainer{
    private static _mInstance: SPFBscreen;
	public static get getInstance(): SPFBscreen {
		if (SPFBscreen._mInstance == undefined)
			SPFBscreen._mInstance = new SPFBscreen();
		return SPFBscreen._mInstance;
	}

    private _mContain:egret.DisplayObjectContainer;
    /**高度 190 */
    private _topContain:egret.DisplayObjectContainer;
    private _centerContain:egret.DisplayObjectContainer;
    private _linkView:egret.ScrollView;
    private _tipText:egret.Bitmap;
    /**高度 166 */
    private _downContain:egret.DisplayObjectContainer;
    private _mZZ:egret.Shape;

    private _selectItem:GHashMap<string>;
    private _item:GHashMap<screenInfo>;

    constructor(){
        super();

        this.touchEnabled = true;
        this._selectItem = new GHashMap<string>();
        this._item = new GHashMap<screenInfo>();
        this._mContain = new egret.DisplayObjectContainer();
        this._topContain = new egret.DisplayObjectContainer();
        this._centerContain = new egret.DisplayObjectContainer();
        this._downContain = new egret.DisplayObjectContainer();

        this._mZZ = new egret.Shape();
        this._mContain.addChild(this._mZZ);
        this._mZZ.touchEnabled = true;
        this._mZZ.graphics.beginFill(0xffffff);
        this._mZZ.graphics.drawRoundRect(0,0,680,190+166+300,20);
        this._mZZ.graphics.endFill();

        this.addChild(this._mContain);
        this._mContain.addChild(this._topContain);
        // this._mContain.addChild(this._centerContain);
        this._mContain.addChild(this._downContain);
        this._downContain.y = 170 + 300;

        // this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height)*0.5;
        // this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width)*0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - (190+166+300))*0.5;
        this._mContain.x = (GameMain.getInstance.StageWidth - 680)*0.5;

        this.joinTop();
        this.joinDown();
        this.addScoll();

        // this._tipText = ToolMrg.getText((GameMain.getInstance.StageWidth-200)*0.5,GameMain.getInstance.StageHeight*0.45,30,0x000000,200);
        this._tipText = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/wjl_default@2x.png",(e)=>{
            this._tipText.$setBitmapData(e); 
            this._tipText.x = (GameMain.getInstance.StageWidth - this._tipText.width)*0.5;
            this._tipText.y = (GameMain.getInstance.StageHeight - this._tipText.height) * 0.5
        },this);
        this.addChild(this._tipText);
        this._tipText.visible = false;

        this.setDB();
    }

    private updata():void{
        let item = new GHashMap<string>();
        let data:GHashMap<GHashMap<FootballData>>
        if(SPFbWnd.inIndex==0){//串关
            data = FootballDataMrg.getInstance._mCJZQLB;
        }else{//单关
            // data = FootballDataMrg.getInstance._mZQLBDG;
            data = FootballDataMrg.getInstance.getCJDGList(SPFbWnd.inIndex+1);
        }
        for(let key of data.keys){
            for(let akey of data.Gget(key).keys){
                item.Gput(data.Gget(key).Gget(akey).league_name,data.Gget(key).Gget(akey).league_name);
            }
        }

        let objNum = 0;
        let objHeight = 0;
        for(let key of item.keys){
            let obj:screenInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new screenInfo();
                this._item.Gput(key,obj);
            }
            obj.aa(item.Gget(key),2);
            obj.addInterception();
            obj.y = objHeight;
            obj.x = 54+objNum*208;
            if(objNum==2){
                objHeight = objHeight + 92;
                objNum=0;
            }else{
                objNum+=1;
            }
            if(obj.parent==undefined)
                this._centerContain.addChild(obj);
        }

        ToolMrg.upItemofGHashMap(this._item,item);
        if(item.size>0){
            this._tipText.visible = false;
        }else {
            this._tipText.visible = true;
        }
    }

    public show():void{
        GUIManager.getInstance.mostLay.addChild(this);
        this.addInterception();
        this.updata();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            this._selectItem.clear();

            this._linkView.setScrollTop(0);

            for(let key of this._item.keys){
                this._item.Gget(key).selectType = false;
                this._item.Gget(key).changeCss();
                this._item.Gget(key).removeInterception();
            }
        }
    }

    public addOfremoveToSelectItem(data:string,isboom:boolean):void{
        if(isboom){//添加
            this._selectItem.Gput(data,data);
        }else{//删除
            if(this._selectItem.GhasKey(data))
                this._selectItem.GremoveByKey(data);
        }
        
    }

    private selectBtnofItem(e:egret.TouchEvent):void{
        if(e.target == this._allSelect){//全选
            for(let key of this._item.keys){
                this._selectItem.Gput(this._item.Gget(key).getDataId(),this._item.Gget(key).getDataId());
                this._item.Gget(key).selectType = true;
                this._item.Gget(key).changeCss();
            }
        }else if(e.target == this._turnSelect){//反选
            this._selectItem.clear();
            for(let key of this._item.keys){
                let obj = this._item.Gget(key);
                if(!obj.selectType)
                    this._selectItem.Gput(obj.getDataId(),obj.getDataId());
                obj.selectType = !obj.selectType;
                obj.changeCss();
            }
        }
    }

    private touchDown(e:egret.TouchEvent){
        if(e.target == this._defineBtn){//确定 回调已选中数据数组 _selectItem(需转换)
            if(this._selectItem.size<1){Alertpaner.getInstance.show("必须选择一种联赛"); return;}
            let item:GHashMap<GHashMap<FootballData>>;
            if(SPFbWnd.inIndex==0){//串关
                item = FootballDataMrg.getInstance._mCJZQLB;
                SPG1Wnd.getInstance.clearAllData();
            }else{//单关
                item = FootballDataMrg.getInstance._mCJZQLBDG;
                // SpOnePass.getInstance.clearAllData();
            }
            let data = new GHashMap<GHashMap<FootballData>>();
            for (let key of item.keys) {
                let obj = item.Gget(key);
                let objSub = new GHashMap<FootballData>();
                for (let akey of obj.keys) {
                    for (let skey of this._selectItem.keys) {
                        if (skey == obj.Gget(akey).league_name) {
                            objSub.Gput(akey, obj.Gget(akey));
                            data.Gput(key, objSub);
                        }
                    }
                }
            }
            
            if(SPFbWnd.inIndex==0){//串关
                SPG1Wnd.getInstance.screenSelect(data);
            }else if(SPFbWnd.inIndex==1){//胜平负
                SPG2Wnd.getInstance.screenSelect(data);
            }else if(SPFbWnd.inIndex==2){//进球数
                SPG3Wnd.getInstance.screenSelect(data);
            }else if(SPFbWnd.inIndex==3){//比分
                SPG4Wnd.getInstance.screenSelect(data);
            }else if(SPFbWnd.inIndex==4){//半全场
                SPG5Wnd.getInstance.screenSelect(data);
            }
        }
        this.hide();
    }

    private addInterception():void{
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._allSelect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectBtnofItem,this);
        this._turnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectBtnofItem,this);
    }

    private removeInterception():void{
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._defineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._allSelect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.selectBtnofItem,this);
        this._turnSelect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.selectBtnofItem,this);
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    }

    private addScoll(): void {
        this._linkView = new egret.ScrollView();
        this._linkView.x = 0;
        this._linkView.y = 190;
        this._linkView.scrollSpeed = 0.4;
        //设置滚动内容
        this._linkView.setContent(this._centerContain);
        this._linkView.bounces = false;
        this._linkView.verticalScrollPolicy = 'on';
        this._linkView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._linkView.width = this._mContain.width;
        this._linkView.height = 300;
        this._mContain.addChild(this._linkView);
    }

    /**全选 */
    private _allSelect:egret.Shape;
    /**反选 */
    private _turnSelect:egret.Shape;
    private joinTop():void{
        let title = ToolMrg.getText(0,27,36,0x333333,680);
        this._topContain.addChild(title);
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.text = "选择联赛";

        this._allSelect = new egret.Shape();
        this._topContain.addChild(this._allSelect);
        this._allSelect.graphics.beginFill(0xffffff,0.001);
        this._allSelect.graphics.drawRect(54,98,288,72);
        this._allSelect.graphics.endFill();
        this._allSelect.touchEnabled = true;

        this._turnSelect = new egret.Shape();
        this._topContain.addChild(this._turnSelect);
        this._turnSelect.graphics.beginFill(0xffffff,0.001);
        this._turnSelect.graphics.drawRect(54+288,98,288,72);
        this._turnSelect.graphics.endFill();
        this._turnSelect.touchEnabled = true;

        let selectBtn = new egret.Bitmap();
        this._topContain.addChild(selectBtn);
        selectBtn.y = 98;
        RES.getResByUrl("resource/assets/images/ui/qfx_home@2x.png",(e)=>{
            selectBtn.$setBitmapData(e); 
        selectBtn.x = (680-selectBtn.width)*0.5;
        },this);
    }

    private _cancelBtn:egret.Bitmap;
    private _defineBtn:egret.Bitmap;
    private joinDown():void{
        this._cancelBtn = new egret.Bitmap();
        this._downContain.addChild(this._cancelBtn);
        this._cancelBtn.x = 44;
        this._cancelBtn.y = 48;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png",(e)=>{this._cancelBtn.$setBitmapData(e); },this);
        this._cancelBtn.touchEnabled = true;

        this._defineBtn = new egret.Bitmap();
        this._downContain.addChild(this._defineBtn);
        this._defineBtn.x = 360;
        this._defineBtn.y = 48;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png",(e)=>{this._defineBtn.$setBitmapData(e); },this);
        this._defineBtn.touchEnabled = true;

        let cancelText = ToolMrg.getText(150,72,32,0x333333);
        this._downContain.addChild(cancelText);
        cancelText.text = "取消";

        let defineText = ToolMrg.getText(466,72,32,0xffffff);
        this._downContain.addChild(defineText);
        defineText.text = "确定";
    }

}