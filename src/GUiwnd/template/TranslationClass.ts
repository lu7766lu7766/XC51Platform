/**咨询模块 html转换 aa(data)设置数据 new */
class TranslationClass extends egret.DisplayObjectContainer{
    
    private _Content:GHashMap<egret.TextField>;
    private _Img:GHashMap<egret.Bitmap>;
    private _reorganized:GHashMap<reorganized>;
    private _zz:egret.Shape;

    constructor(){
        super();
        this.item = [];
        this.styleItem = new GHashMap<TranslationData>();

        this._Content = new GHashMap<egret.TextField>();
        this._Img = new GHashMap<egret.Bitmap>();
        this._reorganized = new GHashMap<reorganized>();

        this._zz = new egret.Shape();
        this._zz.graphics.beginFill(0xffffff);
        this._zz.graphics.drawRect(0,0,750,1);
        this._zz.graphics.endFill();
        this.addChildAt(this._zz,0);
    }

    /**调用方法，给 str赋值 */
    public aa(str):void{
        this.str = str;
        // egret.log(this.str);
        this.setText();
    }

    public show():void{
        GUIManager.getInstance.topLay.addChild(this);
    }

    public clearItem():void{
        for(let key of this._reorganized.keys){
            let obj = this._reorganized.Gget(key);
            if(obj.content!=undefined){
                if(obj.content.parent!=undefined)
                    obj.content.parent.removeChild(obj.content);
            }

            if(obj.img!=undefined){
                if(obj.img.parent!=undefined)
                    obj.img.parent.removeChild(obj.img);
            }
        }
        this._reorganized.clear();
    }

    public hide():void{
        if(this.parent!=undefined){
            // this.clearItem();
            this.parent.removeChild(this);
        }
    }

    private str = `<p>22222222222222222222222</p><p>11111111111</p><p>3333333333333333333</p><p><img src=\"http://admin.51leixun.com/public/uploads/ueditor/20190611/1560220144947620.jpeg\" title=\"1560220144947620.jpeg\" alt=\"1.jpeg\"/></p><p>222222222222222</p><p><img src=\"http://admin.51leixun.com/public/uploads/ueditor/20190611/1560220155174317.jpeg\" title=\"1560220155174317.jpeg\" alt=\"2.jpeg\"/></p><p>22222222222222222222222222</p><p><img src=\"http://admin.51leixun.com/public/uploads/ueditor/20190611/1560220166990580.jpeg\" title=\"1560220166990580.jpeg\" alt=\"3.jpeg\"/></p>`

    public strItem:Array<any>;
    public styleItem:GHashMap<TranslationData>;

    public setText():void{
        this.item = [];
        this.styleItem.clear();

        if(this.str.indexOf("&nbsp;")!=-1){
            this.removeBai();
        }

        if(this.str.indexOf("<br/>")!=-1){
            this.lineFeed();
        }
        
        if(this.str.indexOf("<")!=-1)
            this.carveUp(0);

        this.Definition();
        this.setContent();
    }

    private setContent():void{
        let num;//记录上次key
        //数组再次处理 如果图片前面是换行则删除 如果是空白数据则删除
        for(let key of this.styleItem.keys){
            let obj = this.styleItem.Gget(key);
            if((obj.imgSrc==undefined||obj.imgSrc=="")&&(obj.text==undefined||obj.text=="")){//图片或者文字为空白则删除该数组
                // egret.log(`删除${key}`)
                this.styleItem.GremoveByKey(key);
            }
        }

        for(let key of this.styleItem.keys){
            let obj = this.styleItem.Gget(key);
            // egret.log(`打印key ${key}`)
            if(this.styleItem.Gget(key).imgSrc!=undefined){
                if(this.styleItem.GhasKey(num)){
                    if(this.styleItem.Gget(num).text=="\n"){
                        this.styleItem.GremoveByKey(num);
                    }
                }
            }
            num = key;
        }

        /**当前是否文字 */
        let isText=false;
        /**上一个textfield */
        let textNum=0;

        let isLine = false;
        let objHeight = 0;
        let index = 0;
        let item = this.styleItem;
        for(let key of this.styleItem.keys){
            if(item.Gget(key).imgSrc!=undefined){
                let img = new egret.Bitmap();
                img.y = objHeight;
                LoadNetPic.getLoadNetPic.loadPic(item.Gget(key).imgSrc,(e)=>{
                    img.$setTexture(e);
                    let num = img.width;
                    if(img.width>702){
                        img.height =  img.height/num/702;
                    }else if(img.width<702){
                        img.height = img.height*(702/num);
                    }
                    img.width = 702;
                    img.x = (750-img.width)*0.5;
                    this.re_sorts();
                },this);
                this.addChild(img);
                objHeight = objHeight;
                let obj = new reorganized();
                obj.img = img;
                this._reorganized.Gput(index,obj);

                index+=1;
                isText = false;
            }else if(item.Gget(key).text != undefined && item.Gget(key).text != ""){
                if(isText){//上一个是文字

                    if(item.Gget(key).text=="\n"){
                        if(isLine){
                            isLine = false;
                        }else{
                            isLine = true;
                            let text = this._Content.Gget(textNum);
                            text.text = text.text + item.Gget(key).text;
                        }
                    }else{
                        let text = this._Content.Gget(textNum);
                        text.text = text.text + item.Gget(key).text;
                    }
                    isText = true;
                    // objHeight = objHeight - text.textHeight;
                    // egret.log(text.text+" :    "+text.textHeight)
                    // objHeight = objHeight + text.textHeight;
                }else{//上一个不是文字
                    if(item.Gget(key).text!="\n"){
                        let text = ToolMrg.getText(24,objHeight,34,0x444444,700);
                        text.lineSpacing = 19;
                        text.text= item.Gget(key).text;
                        this.addChild(text);
                        textNum+=1;
                        this._Content.Gput(textNum,text);
                        let obj = new reorganized();
                        obj.content = text;
                        this._reorganized.Gput(index,obj);

                        objHeight = objHeight+text.textHeight+19;
                        index+=1;
                        isText = true;
                    }
                }

            }
        }
        this._zz.graphics.clear();
        this._zz.graphics.beginFill(0xffffff);
        this._zz.graphics.drawRect(0,0,750,objHeight+30);
        this._zz.graphics.endFill();
    }

    /**文章重新排序 */
    private re_sorts():void{
        let isEndofimg = false;
        let objHeight = 0;
        for(let key of this._reorganized.keys){
            let obj = this._reorganized.Gget(key);
            if(obj.img!=undefined){
                obj.img.y = objHeight;
                objHeight = objHeight + obj.img.height+32;
                isEndofimg = true;
            }else if(obj.content!=undefined){
                obj.content.y = objHeight;
                objHeight = objHeight + obj.content.textHeight + 32;
                isEndofimg = false;
            }
        }
        let num = 0;
        if(isEndofimg){//图片结尾
            num = 0;
        }else{//文字结尾
            num = 0;
        }
        this._zz.graphics.clear();
        this._zz.graphics.beginFill(0xffffff);
        this._zz.graphics.drawRect(0,0,750,objHeight+num);
        this._zz.graphics.endFill();
        this.measuredHeight;
    }

    /**抽取重新定义 */
    private Definition():void{
        let index=0;
        for(let i=0;i<this.item.length;i++){
            let obj = new TranslationData();
            if(this.item[i].indexOf("<")==-1){//没有标签
                obj.text = this.item[i];
            }else{//有标签
                if(this.item[i].indexOf("<img")!=-1){//图片<img>
                    this.item[i].indexOf(`src="`);
                    this.item[i] = this.item[i].substring(this.item[i].indexOf(`src="`)+5,this.item[i].length);
                    obj.imgSrc = this.item[i].substring(0,this.item[i].indexOf(`"`));
                }else if(this.item[i].indexOf("<p")!=-1){//字体<p>
                    this.item[i] = this.item[i].substring(0,this.item[i].indexOf(">")+1);
                    obj.text = this.item[i].substring(0,this.item[i].indexOf("<"));
                }else if(this.item[i].indexOf("</p")!=-1){
                    obj.text = "\n";
                }
            }
            //添加
            if(obj.imgSrc!==undefined||obj.text!=undefined)
                this.styleItem.Gput(index,obj);
            index+=1;
        }
    }

    private item:string[];
    //记录分割下标
    private index;
    /**分割 */
    private  carveUp(num:number):void{
        if(this.str.indexOf("<")==0){//<>开头
            this.index = this.str.indexOf(">")+1;
        }else if(this.str.indexOf("<")>0){//非<>开头
            this.index = this.str.indexOf("<");
        }
        // egret.log(num);
        this.item[num] = this.str.substring(0,this.index);
        this.str = this.str.substring(this.index,this.str.length);

        num += 1;
        if(this.str.indexOf("<")!=-1){
            this.carveUp(num);
        }else{
            if(this.str.length>0){
                this.item[num] = this.str.substring(0,this.str.length);
            }
        }
    }

    /**删除空格 */
    private removeBai():void{
        this.str = this.str.replace("&nbsp;","");
        
        if(this.str.indexOf("&nbsp;")!=-1){
            this.removeBai();
        }
    }

    /**换行 */
    private lineFeed():void{
        this.str = this.str.replace("<br/>","\n");
        
        if(this.str.indexOf("<br/>")!=-1){
            this.removeBai();
        }
    }
}

class TranslationData{
    public text:string;
    public imgSrc:string;
    public textSize:string;
    public textColor:string;
    public isBold:boolean;
}

class reorganized{
    public img:egret.Bitmap;
    public content:egret.TextField;
}