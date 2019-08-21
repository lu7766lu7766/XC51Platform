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
var GWebUi = (function (_super) {
    __extends(GWebUi, _super);
    function GWebUi() {
        var _this = _super.call(this) || this;
        _this._contents = new Array();
        _this._url = '';
        _this._contentsBox = new egret.Sprite();
        _this._scollView = new egret.ScrollView();
        //设置滚动内容
        _this._scollView.setContent(_this._contentsBox);
        _this._scollView.bounces = true;
        _this._scollView.verticalScrollPolicy = 'on';
        _this._scollView.horizontalScrollPolicy = 'off';
        _this._scollView.scrollSpeed = 0;
        _this.addChild(_this._scollView);
        return _this;
    }
    Object.defineProperty(GWebUi, "getInstance", {
        get: function () {
            if (GWebUi._instance == null)
                GWebUi._instance = new GWebUi();
            return GWebUi._instance;
        },
        enumerable: true,
        configurable: true
    });
    GWebUi.prototype.show = function (path, width, height, fontSize) {
        if (fontSize === void 0) { fontSize = 20; }
        this.clean();
        GWebUi.UIWidth = width;
        GWebUi.UIHeight = height;
        this._fontSize = fontSize;
        //设置滚动区域宽高
        this._scollView.width = width;
        this._scollView.height = height; //55 留出下面底部菜单栏区域
        this._scollView.scrollTop = 0;
        GResCache.loadResByUrl(path, this.onLoadPath, this, RES.ResourceItem.TYPE_TEXT);
    };
    GWebUi.prototype.hide = function () {
        if (this.parent != undefined)
            this.parent.removeChild(this);
        this.clean();
    };
    GWebUi.prototype.onLoadPath = function (data) {
        if (data != null)
            this.analysis(data);
    };
    GWebUi.prototype.analysis = function (webStr) {
        var list = webStr.split(GWebUi._tagStart);
        for (var i = 0, l = list.length; i < l; i++) {
            this.addList(list[i]);
        }
        this.display();
        this.update();
    };
    GWebUi.prototype.addList = function (str) {
        var arr = GWebUi._tagEnd.exec(str);
        if (arr == null || arr.length < 1)
            return;
        var arr2 = GWebUi._num.exec(arr[0]);
        if (arr == null || arr.length < 1)
            return;
        var type = arr2[0];
        var res = str.replace(GWebUi._tagEnd, '');
        this._contents.push([type, res]);
    };
    GWebUi.prototype.display = function () {
        for (var i = 0, l = this._contents.length; i < l; i++) {
            var temp = this._contents[i];
            if (temp[0] == GWebUi.type_text) {
                var tf = new egret.TextField();
                tf.width = GWebUi.UIWidth;
                tf.text = temp[1].replace(GWebUi._newLine, "\n");
                tf.size = this._fontSize;
                tf.textColor = 0;
                tf.lineSpacing = GWebUi._lineSpacing;
                this._contentsBox.addChild(tf);
                this._contents[i][2] = tf;
            }
            else if (temp[0] == GWebUi.type_image) {
                var bm = new egret.Bitmap();
                this._contentsBox.addChild(bm);
                this._contents[i][2] = bm;
                GResCache.loadResByUrl(this._contents[i][1], this.onImageLoaded, this);
            }
        }
    };
    GWebUi.prototype.onImageLoaded = function (data) {
        for (var i = 0, l = this._contents.length; i < l; i++) {
            var temp = this._contents[i];
            if (temp[2] instanceof egret.Bitmap) {
                var bm = temp[2];
                if (bm.$bitmapData != null)
                    continue;
                var bmd = GResCache.getEgretRes(temp[1]);
                if (bmd != null)
                    bm.$setBitmapData(bmd);
            }
        }
        this.update();
    };
    GWebUi.prototype.update = function () {
        var cy = 0;
        for (var i = 0, l = this._contents.length; i < l; i++) {
            var temp = this._contents[i];
            if (temp[2] instanceof egret.TextField) {
                temp[2].y = cy;
                cy += temp[2].textHeight + GWebUi._lineSpacing;
            }
            else if (temp[2] instanceof egret.Bitmap) {
                var bm = temp[2];
                if (bm.$bitmapData == null)
                    continue;
                bm.y = cy;
                cy += temp[2].height + GWebUi._lineSpacing;
            }
        }
    };
    GWebUi.prototype.clean = function () {
        this._contentsBox.removeChildren();
        for (var i = 0, l = this._contents.length; i < l; i++) {
            var temp = this._contents[i];
            if (temp[2] instanceof egret.Bitmap) {
                temp[2].$bitmapData = null;
                GResCache.delete(temp[1]);
            }
        }
        this._contents = [];
    };
    GWebUi.type_text = 1;
    GWebUi.type_image = 2;
    GWebUi.UIWidth = 680;
    GWebUi.UIHeight = 960;
    GWebUi._lineSpacing = 5;
    GWebUi._tagStart = /<tag_\d{1}>/;
    GWebUi._tagEnd = /<\/tag_\d{1}>\s*/;
    GWebUi._num = /\d{1}/;
    GWebUi._newLine = /<br>/g;
    GWebUi._instance = null;
    return GWebUi;
}(egret.Sprite));
__reflect(GWebUi.prototype, "GWebUi");
//# sourceMappingURL=GWebUi.js.map