var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**咨询模块 html转换 aa(data)设置数据 new */
var TranslationClass = (function (_super) {
    __extends(TranslationClass, _super);
    function TranslationClass() {
        var _this = _super.call(this) || this;
        _this.str = "<p>22222222222222222222222</p><p>11111111111</p><p>3333333333333333333</p><p><img src=\"http://admin.51leixun.com/public/uploads/ueditor/20190611/1560220144947620.jpeg\" title=\"1560220144947620.jpeg\" alt=\"1.jpeg\"/></p><p>222222222222222</p><p><img src=\"http://admin.51leixun.com/public/uploads/ueditor/20190611/1560220155174317.jpeg\" title=\"1560220155174317.jpeg\" alt=\"2.jpeg\"/></p><p>22222222222222222222222222</p><p><img src=\"http://admin.51leixun.com/public/uploads/ueditor/20190611/1560220166990580.jpeg\" title=\"1560220166990580.jpeg\" alt=\"3.jpeg\"/></p>";
        _this.item = [];
        _this.styleItem = new GHashMap();
        _this._Content = new GHashMap();
        _this._Img = new GHashMap();
        _this._reorganized = new GHashMap();
        _this._zz = new egret.Shape();
        _this._zz.graphics.beginFill(0xffffff);
        _this._zz.graphics.drawRect(0, 0, 750, 1);
        _this._zz.graphics.endFill();
        _this.addChildAt(_this._zz, 0);
        return _this;
    }
    /**调用方法，给 str赋值 */
    TranslationClass.prototype.aa = function (str) {
        this.str = str;
        // egret.log(this.str);
        this.setText();
    };
    TranslationClass.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
    };
    TranslationClass.prototype.clearItem = function () {
        for (var _i = 0, _a = this._reorganized.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._reorganized.Gget(key);
            if (obj.content != undefined) {
                if (obj.content.parent != undefined)
                    obj.content.parent.removeChild(obj.content);
            }
            if (obj.img != undefined) {
                if (obj.img.parent != undefined)
                    obj.img.parent.removeChild(obj.img);
            }
        }
        this._reorganized.clear();
    };
    TranslationClass.prototype.hide = function () {
        if (this.parent != undefined) {
            // this.clearItem();
            this.parent.removeChild(this);
        }
    };
    TranslationClass.prototype.setText = function () {
        this.item = [];
        this.styleItem.clear();
        if (this.str.indexOf("&nbsp;") != -1) {
            this.removeBai();
        }
        if (this.str.indexOf("<br/>") != -1) {
            this.lineFeed();
        }
        if (this.str.indexOf("<") != -1)
            this.carveUp(0);
        this.Definition();
        this.setContent();
    };
    TranslationClass.prototype.setContent = function () {
        var _this = this;
        var num; //记录上次key
        //数组再次处理 如果图片前面是换行则删除 如果是空白数据则删除
        for (var _i = 0, _a = this.styleItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this.styleItem.Gget(key);
            if ((obj.imgSrc == undefined || obj.imgSrc == "") && (obj.text == undefined || obj.text == "")) {
                // egret.log(`删除${key}`)
                this.styleItem.GremoveByKey(key);
            }
        }
        for (var _b = 0, _c = this.styleItem.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            var obj = this.styleItem.Gget(key);
            // egret.log(`打印key ${key}`)
            if (this.styleItem.Gget(key).imgSrc != undefined) {
                if (this.styleItem.GhasKey(num)) {
                    if (this.styleItem.Gget(num).text == "\n") {
                        this.styleItem.GremoveByKey(num);
                    }
                }
            }
            num = key;
        }
        /**当前是否文字 */
        var isText = false;
        /**上一个textfield */
        var textNum = 0;
        var isLine = false;
        var objHeight = 0;
        var index = 0;
        var item = this.styleItem;
        var _loop_1 = function (key) {
            if (item.Gget(key).imgSrc != undefined) {
                var img_1 = new egret.Bitmap();
                img_1.y = objHeight;
                LoadNetPic.getLoadNetPic.loadPic(item.Gget(key).imgSrc, function (e) {
                    img_1.$setTexture(e);
                    var num = img_1.width;
                    if (img_1.width > 702) {
                        img_1.height = img_1.height / num / 702;
                    }
                    else if (img_1.width < 702) {
                        img_1.height = img_1.height * (702 / num);
                    }
                    img_1.width = 702;
                    img_1.x = (750 - img_1.width) * 0.5;
                    _this.re_sorts();
                }, this_1);
                this_1.addChild(img_1);
                objHeight = objHeight;
                var obj = new reorganized();
                obj.img = img_1;
                this_1._reorganized.Gput(index, obj);
                index += 1;
                isText = false;
            }
            else if (item.Gget(key).text != undefined && item.Gget(key).text != "") {
                if (isText) {
                    if (item.Gget(key).text == "\n") {
                        if (isLine) {
                            isLine = false;
                        }
                        else {
                            isLine = true;
                            var text = this_1._Content.Gget(textNum);
                            text.text = text.text + item.Gget(key).text;
                        }
                    }
                    else {
                        var text = this_1._Content.Gget(textNum);
                        text.text = text.text + item.Gget(key).text;
                    }
                    isText = true;
                    // objHeight = objHeight - text.textHeight;
                    // egret.log(text.text+" :    "+text.textHeight)
                    // objHeight = objHeight + text.textHeight;
                }
                else {
                    if (item.Gget(key).text != "\n") {
                        var text = ToolMrg.getText(24, objHeight, 34, 0x444444, 700);
                        text.lineSpacing = 19;
                        text.text = item.Gget(key).text;
                        this_1.addChild(text);
                        textNum += 1;
                        this_1._Content.Gput(textNum, text);
                        var obj = new reorganized();
                        obj.content = text;
                        this_1._reorganized.Gput(index, obj);
                        objHeight = objHeight + text.textHeight + 19;
                        index += 1;
                        isText = true;
                    }
                }
            }
        };
        var this_1 = this;
        for (var _d = 0, _e = this.styleItem.keys; _d < _e.length; _d++) {
            var key = _e[_d];
            _loop_1(key);
        }
        this._zz.graphics.clear();
        this._zz.graphics.beginFill(0xffffff);
        this._zz.graphics.drawRect(0, 0, 750, objHeight + 30);
        this._zz.graphics.endFill();
    };
    /**文章重新排序 */
    TranslationClass.prototype.re_sorts = function () {
        var isEndofimg = false;
        var objHeight = 0;
        for (var _i = 0, _a = this._reorganized.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._reorganized.Gget(key);
            if (obj.img != undefined) {
                obj.img.y = objHeight;
                objHeight = objHeight + obj.img.height + 32;
                isEndofimg = true;
            }
            else if (obj.content != undefined) {
                obj.content.y = objHeight;
                objHeight = objHeight + obj.content.textHeight + 32;
                isEndofimg = false;
            }
        }
        var num = 0;
        if (isEndofimg) {
            num = 0;
        }
        else {
            num = 0;
        }
        this._zz.graphics.clear();
        this._zz.graphics.beginFill(0xffffff);
        this._zz.graphics.drawRect(0, 0, 750, objHeight + num);
        this._zz.graphics.endFill();
        this.measuredHeight;
    };
    /**抽取重新定义 */
    TranslationClass.prototype.Definition = function () {
        var index = 0;
        for (var i = 0; i < this.item.length; i++) {
            var obj = new TranslationData();
            if (this.item[i].indexOf("<") == -1) {
                obj.text = this.item[i];
            }
            else {
                if (this.item[i].indexOf("<img") != -1) {
                    this.item[i].indexOf("src=\"");
                    this.item[i] = this.item[i].substring(this.item[i].indexOf("src=\"") + 5, this.item[i].length);
                    obj.imgSrc = this.item[i].substring(0, this.item[i].indexOf("\""));
                }
                else if (this.item[i].indexOf("<p") != -1) {
                    this.item[i] = this.item[i].substring(0, this.item[i].indexOf(">") + 1);
                    obj.text = this.item[i].substring(0, this.item[i].indexOf("<"));
                }
                else if (this.item[i].indexOf("</p") != -1) {
                    obj.text = "\n";
                }
            }
            //添加
            if (obj.imgSrc !== undefined || obj.text != undefined)
                this.styleItem.Gput(index, obj);
            index += 1;
        }
    };
    /**分割 */
    TranslationClass.prototype.carveUp = function (num) {
        if (this.str.indexOf("<") == 0) {
            this.index = this.str.indexOf(">") + 1;
        }
        else if (this.str.indexOf("<") > 0) {
            this.index = this.str.indexOf("<");
        }
        // egret.log(num);
        this.item[num] = this.str.substring(0, this.index);
        this.str = this.str.substring(this.index, this.str.length);
        num += 1;
        if (this.str.indexOf("<") != -1) {
            this.carveUp(num);
        }
        else {
            if (this.str.length > 0) {
                this.item[num] = this.str.substring(0, this.str.length);
            }
        }
    };
    /**删除空格 */
    TranslationClass.prototype.removeBai = function () {
        this.str = this.str.replace("&nbsp;", "");
        if (this.str.indexOf("&nbsp;") != -1) {
            this.removeBai();
        }
    };
    /**换行 */
    TranslationClass.prototype.lineFeed = function () {
        this.str = this.str.replace("<br/>", "\n");
        if (this.str.indexOf("<br/>") != -1) {
            this.removeBai();
        }
    };
    return TranslationClass;
}(egret.DisplayObjectContainer));
__reflect(TranslationClass.prototype, "TranslationClass");
var TranslationData = (function () {
    function TranslationData() {
    }
    return TranslationData;
}());
__reflect(TranslationData.prototype, "TranslationData");
var reorganized = (function () {
    function reorganized() {
    }
    return reorganized;
}());
__reflect(reorganized.prototype, "reorganized");
//# sourceMappingURL=TranslationClass.js.map