class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE,this.init,this);
    }


    private init(e:egret.Event):void{
        egret.ImageLoader.crossOrigin = "anonymous";
        // if(GameValue.isDebug == false) {//正式服
        //     HTTPRequest.getInstance.httpHeadUrl = window["getSUrl"]();
        // }
        // this.keyListen();
        // this.iosUpDown();
        let game:GameMain = new GameMain();
        this.addChild(game);
        this.hideLoading()
    }

    private hideLoading(): void {
        if (document.getElementById('loading-box')) {
            document.getElementById('loading-box').style.display = 'none'
        }
    }

    //键盘侦听
    private keyListen():void{
        var that = this;
        //13
        document.addEventListener("keydown",function(event:KeyboardEvent){
            // let num = event.keyCode;
            // if(num == 13){
            //     if(GameValue.keydownNum==1 && ConsultMsg.detailsWnd.parent!=undefined){
            //         ConsultMsg.detailsWnd.sendText();
            //     }else if(GameValue.keydownNum==2 && TalkofMsg.talkDetail.parent!=undefined){
            //         TalkofMsg.talkDetail.sendText();
            //     }
            // }
        });
    }

    //ios键盘弹出收起侦听
    private iosUpDown():void{
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            // var clientHeight = document.documentElement.clientHeight;
            // window["alertMsg"](clientHeight);
            // document.addEventListener("focusin",function(){//软键盘弹出
                // if(GameValue.keydownNum==1 && ConsultMsg.detailsWnd.parent!=undefined){
                //     ConsultMsg.detailsWnd.bottomContain.y = GameMain.getInstance.StageHeight - 100 - 40 - clientHeight;
                // }else if(GameValue.keydownNum==2 && TalkofMsg.talkDetail.parent!=undefined){
                //     TalkofMsg.talkDetail.bottomContain.y = GameMain.getInstance.StageHeight - 100 - 40 - clientHeight;
                // }
            // });

            // document.addEventListener("focusout",function(){//软键盘收起
            //      if(GameValue.keydownNum==1 && ConsultMsg.detailsWnd.parent!=undefined){
            //         ConsultMsg.detailsWnd.bottomContain.y = GameMain.getInstance.StageHeight - 100 - 40;
            //     }else if(GameValue.keydownNum==2 && TalkofMsg.talkDetail.parent!=undefined){
            //         TalkofMsg.talkDetail.bottomContain.y = GameMain.getInstance.StageHeight - 100 - 40;
            //     }
            // });
        }
    }
    
}