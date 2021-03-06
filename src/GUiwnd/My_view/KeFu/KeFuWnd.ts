/**客服 */
class KeFuWnd extends egret.DisplayObjectContainer{
    private static _mInstance: KeFuWnd;
    public static get getInstance(): KeFuWnd {
        if (KeFuWnd._mInstance == undefined)
            KeFuWnd._mInstance = new KeFuWnd();
        return KeFuWnd._mInstance;
    }

    private _topUI:TopUI
    private _return:egret.Shape;

    private _link1:egret.Bitmap;
    private _link2:egret.Bitmap;
    private _link3:egret.Bitmap;

    private _img1:egret.Bitmap;
    private _img2:egret.Bitmap;
    private _img3:egret.Bitmap;

    private _text1:egret.TextField;
    private _text2:egret.TextField;
    private _text3:egret.TextField;

    private _btn1:egret.Bitmap;

    private QQ = "";
    private Skype = "caizhan51";
    private sugram = "964940779";

    constructor(){
        super();

        this.touchEnabled = true;
        this._topUI = new TopUI("联系客服");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._btn1 = new egret.Bitmap();
        this.addChild(this._btn1);
        this._btn1.y = 182;

        this._link1 = new egret.Bitmap();
        this.addChild(this._link1);
        this._link1.touchEnabled = true;
        this._link1.y = 634;
        // RES.getResByUrl("resource/assets/images/ui/kfbt2_mine@2x.png",(e)=>{
        //     this._link1.$setBitmapData(e); 
        //     this._link1.x = (GameMain.getInstance.StageWidth - this._link1.width)*0.5;
        // },this);

        this._link2 = new egret.Bitmap();
        this.addChild(this._link2);
        this._link2.touchEnabled = true;
        this._link2.y = 774;
        RES.getResByUrl("resource/assets/images/ui/kfbt2_mine@2x.png",(e)=>{
            this._link2.$setBitmapData(e); 
            this._link2.x = (GameMain.getInstance.StageWidth - this._link2.width)*0.5;
        },this);

        this._link3 = new egret.Bitmap();
        this.addChild(this._link3);
        this._link3.touchEnabled = true;
        this._link3.y = 914;
        RES.getResByUrl("resource/assets/images/ui/kfbt2_mine@2x.png",(e)=>{
            this._link3.$setBitmapData(e); 
            this._link3.x = (GameMain.getInstance.StageWidth - this._link3.width)*0.5;
        },this);

        this._img1 = new egret.Bitmap();
        this.addChild(this._img1);
        RES.getResByUrl("resource/assets/images/ui/kfqq_mine@2x.png",(e)=>{
            this._img1.$setBitmapData(e);
            this._img1.y = 664;
        },this);
        this._img1.x= 166;

        this._img2 = new egret.Bitmap();
        this.addChild(this._img2);
        this._img2.x = 166;
        RES.getResByUrl("resource/assets/images/ui/skype_mine@2x.png",(e)=>{
            this._img2.$setBitmapData(e); 
            this._img2.y = 800;
        },this);

        this._img3 = new egret.Bitmap();
        this.addChild(this._img3);
        this._img3.x = 166;
        RES.getResByUrl("resource/assets/images/ui/sugram_mine@2x.png",(e)=>{
            this._img3.$setBitmapData(e); 
            this._img3.y = 940;
        },this);

        this._text1 = ToolMrg.getText(234,660+7,36,0xF72E52,560);
        this.addChild(this._text1);
        // wx.textAlign = egret.HorizontalAlign.CENTER;
        this._text1.text = "QQ：2842774615";

        this._text2 = ToolMrg.getText(234,800+7,36,0xF72E52,560);
        this.addChild(this._text2);
        // qq.textAlign = egret.HorizontalAlign.CENTER;
        this._text2.text = "Skype："+this.Skype;

        this._text3 = ToolMrg.getText(234,940+7,36,0xF72E52,560);
        this.addChild(this._text3);
        // phone.textAlign = egret.HorizontalAlign.CENTER;
        this._text3.text = "sugram："+this.sugram;

        this.setDB();
    }

    private _mBool:boolean;
    public show(tool?):void{
        this._mBool = tool;
        if(this.parent==undefined)
            GUIManager.getInstance.mostLay.addChild(this);
        this.addInterception();

        if(tool==undefined){
            this._link2.visible=false;
            this._link3.visible=false;
            this._text2.visible=false;
            this._text3.visible=false;
            this._img2.visible=false;
            this._img3.visible=false;
            // this._text1.text = "QQ：710992037";
            this.QQ = "710992037";
            RES.getResByUrl("resource/assets/images/ui/kftx_mine@2x1.png",(e)=>{
                this._btn1.$setBitmapData(e); 
                this._btn1.x = (GameMain.getInstance.StageWidth - this._btn1.width)*0.5;
            },this);

            RES.getResByUrl("resource/assets/images/ui/qwzxkf_mine@2x.png",(e)=>{
                this._link1.$setBitmapData(e); 
                this._link1.x = (GameMain.getInstance.StageWidth - this._link1.width)*0.5;
            },this);

            this._text1.text = "";
            this._img1.visible = false;
        }else{
            this._link2.visible=true;
            this._link3.visible=true;
            this._text2.visible=true;
            this._text3.visible=true;
            this._img2.visible=true;
            this._img3.visible=true;
            // this._text1.text = "QQ：312288881";
            this.QQ = "312288881";
             RES.getResByUrl("resource/assets/images/ui/kftx_mine@2x.png",(e)=>{
                this._btn1.$setBitmapData(e); 
                this._btn1.x = (GameMain.getInstance.StageWidth - this._btn1.width)*0.5;
            },this);

            RES.getResByUrl("resource/assets/images/ui/kfbt2_mine@2x.png",(e)=>{
                this._link1.$setBitmapData(e); 
                this._link1.x = (GameMain.getInstance.StageWidth - this._link1.width)*0.5;
            },this);

            this._text1.text = "QQ："+this.QQ;
            this._img1.visible = true;
        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();

            if(WorldWnd._worldState==1){
                WorldWnd.getInstance.show();
            }
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }else if(e.target == this._link1){//qq
            if(this._mBool == undefined) {//跳转在线客服
                // if(window["go2Url"]) {
                //     window["go2Url"](GameValue.kfUrl);
                // }
                CallApp.openUrl(GameValue.kfUrl);
                // window.open("https://vm.providesupport.com/0o9t1ktmxghcq1oagixycxoww1");
            } else {
                //生成可复制input
                var input = document.createElement("input");
                //需复制内容
                input.value = this.QQ;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length),
                    document.execCommand('Copy');
                document.body.removeChild(input);

                Alertpaner.getInstance.show("复制成功");
            }
        }else if(e.target == this._link2){//Skype
            //生成可复制input
            var input = document.createElement("input");
            //需复制内容
            input.value = this.Skype;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);

            Alertpaner.getInstance.show("复制成功");
        }else if(e.target == this._link3){//sugram
            //生成可复制input
            var input = document.createElement("input");
            //需复制内容
            input.value = this.sugram;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);

            Alertpaner.getInstance.show("复制成功");
        }
    }

    public addInterception(): void {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }

    public removeInterception(): void {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        
        this._mShareC.graphics.beginFill(0xFEF9F9, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}