/**软键盘 */
class keyboard extends egret.DisplayObjectContainer{
    private static _mInstance: keyboard;
    public static get getInstance(): keyboard {
        if (keyboard._mInstance == undefined)
            keyboard._mInstance = new keyboard();
        return keyboard._mInstance;
    }

    private _link:egret.Bitmap;
    private _strText:egret.TextField;
    /**内容容器 */
    private _mContain:egret.DisplayObjectContainer;
    private _return:egret.Shape;
    /**返回按钮图片(真正返回按钮有_return shape控制) */
    private _returnImg:egret.Bitmap;

    private _sure:egret.Shape;
    /**确认按钮图片(真正返回按钮有_sure shape控制) */
    private _sureImg:egret.Bitmap;

    constructor(){
        super();

        this.touchEnabled = true;

        this._mContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);
        this._mContain.touchEnabled = true;

        let bj = new egret.Shape();
        this._mContain.addChild(bj);
        bj.graphics.beginFill(0xffffff);
        bj.graphics.drawRoundRect(0,0,GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight+100,30);
        bj.graphics.endFill();
        
        this._strText = ToolMrg.getText(30,30,30,0x000000);
        this._mContain.addChild(this._strText);
        this._strText.width = GameMain.getInstance.StageWidth - this._strText.x*2;
        this._strText.height = 80;
        this._strText.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._return = new egret.Shape();
        this._mContain.addChild(this._return);
        this._return.graphics.beginFill(0x000000);
        this._return.graphics.drawRect(10,0,80,50);
        this._return.graphics.endFill();
        this._return.touchEnabled = true;
        // this._return.alpha = 0.001;

        this._sure = new egret.Shape();
        this._mContain.addChild(this._sure);
        this._sure.graphics.beginFill(0xf72e52);
        this._sure.graphics.drawRect(90,0,80,50);
        this._sure.graphics.endFill();
        this._sure.touchEnabled = true;
        // this._sure.alpha = 0.001;

        this._returnImg = new egret.Bitmap();
        this._mContain.addChild(this._returnImg);

        this._sureImg = new egret.Bitmap();
        this._mContain.addChild(this._sureImg);

        this.setDB();
    }

    private _data:NumKeyData;
    private _size=0;

    /**传入对象 size为文本最多长度 Y为此键盘二级页面距离舞台y，空则为最顶部 */
    public show(data:NumKeyData,size?:number,Y?:number):void{
        if(this.parent==undefined){
            GUIManager.getInstance.mostLay.addChild(this);
            let num = 0;
            if(Y!=undefined)
                num = Y;
            this._mContain.y = GameMain.getInstance.StageHeight;
            egret.Tween.get(this._mContain).to({y:num},300,egret.Ease.circOut);
        }

        if(size!=undefined)
            this._size = size;

        this._data = data;
        this._strText.text = data.str;

        this._strText.type = egret.TextFieldType.INPUT;
        this._strText.inputType = egret.TextFieldInputType.TEXT;
        
        //键盘侦听
        document.addEventListener("keydown",this.keyboard);
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this._sure.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    public keyboard(event:KeyboardEvent):void{
        var that = this;
        let num = event.keyCode;
        if(num == 13){
            keyboard.getInstance._strText.type = egret.TextFieldType.DYNAMIC;
            keyboard.getInstance.touchDown(null);
        }
    }

    /**确认  */
    private touchDown(e:TouchEvent):void{
        if(this._strText.text.length > this._size){
            Alertpaner.getInstance.show(`长度不能超过${this._size}个文字`);
            this._strText.type = egret.TextFieldType.INPUT;
            this._strText.inputType = egret.TextFieldInputType.TEXT;
            return;
        }
        this._data.strText.text = this._strText.text;
        this._data.backFun.call(this._data.thisObj);

        this.hide();
    }

    public hide():void{
        document.removeEventListener("keydown",this.keyboard);
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.hide,this);
        this._sure.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._size = 0;

        if(this.parent!=undefined){
            egret.Tween.get(this._mContain).to({y:GameMain.getInstance.StageHeight},300,egret.Ease.circInOut).call(()=>{
                this.parent.removeChild(this);
                this._strText.text = "";
            });
        }
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.4);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0)
        this._mShareC.touchEnabled = true;
    }
}