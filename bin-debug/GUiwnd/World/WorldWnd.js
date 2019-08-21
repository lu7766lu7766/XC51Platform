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
var WorldWnd = (function (_super) {
    __extends(WorldWnd, _super);
    function WorldWnd() {
        var _this = _super.call(this) || this;
        _this._imgSrc = ["jzcg_home@2x", "jzdg_home@2x", "jlcg_home@2x", "jldg_home@2x", "cjzc_home@2x", "cjjl_home@2x", "pl3_home@2x", "pl5_home@2x"];
        _this._imgTitle = ["竞足串关", "竞足单关", "竞篮串关", "竞篮单关", "超级足彩", "超级篮彩", "排列三", "排列五"];
        _this._imgContent = ["足球赛事竞彩", "赛事多，返奖高", "篮球赛事竞彩", "投注简单，返奖高", "热门赛事，奖金多", "竞彩篮球联赛", "轻松赢千元大奖", "最高奖金10万元"];
        _this.y = GameValue.adaptationScreen;
        _this._imgItem = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this._imgContain = new egret.DisplayObjectContainer();
        _this._centerContain = new egret.DisplayObjectContainer();
        _this._downContain = new egret.DisplayObjectContainer();
        _this._topContain = new egret.DisplayObjectContainer();
        var topShape = new egret.Bitmap();
        _this._topContain.addChild(topShape);
        topShape.y = -_this.y;
        RES.getResByUrl("resource/assets/images/ui/bg2_nav@2x.png", function (e) {
            topShape.$setBitmapData(e);
        }, _this);
        topShape.height = 96 + _this.y;
        _this._item = new GHashMap();
        // this._kjBtn = new egret.Bitmap();
        // this._topContain.addChild(this._kjBtn);
        // this._kjBtn.x = 28;
        // this._kjBtn.y = 28;
        // RES.getResByUrl("resource/assets/images/ui/kjxx_nav@2x.png", (e) => {
        //     this._kjBtn.$setBitmapData(e);
        // }, this);
        // this._kjBtn.touchEnabled = true;
        // this._kfBtn = new egret.Bitmap();
        // this._topContain.addChild(this._kfBtn);
        // this._kfBtn.x = 678;
        // this._kfBtn.y = 28;
        // RES.getResByUrl("resource/assets/images/ui/kefu_nav@2x.png", (e) => {
        //     this._kfBtn.$setBitmapData(e);
        // }, this);
        // this._kfBtn.touchEnabled = true;
        var titleImg = new egret.Bitmap();
        _this._topContain.addChild(titleImg);
        titleImg.y = 34;
        RES.getResByUrl("resource/assets/images/ui/51cd_home@2x.png", function (e) {
            titleImg.$setBitmapData(e);
            titleImg.x = (750 - titleImg.width) * 0.5;
        }, _this);
        // this.imgBox = WorldTopImg.getInstance;
        // this._imgContain.addChild(this.imgBox);
        _this._imgContain.addChild(ImgRace.getInstance);
        _this._tip = WorldTip.getInstance;
        _this._centerContain.addChild(_this._tip);
        _this._tip.y = 32;
        _this._tip.x = 76;
        var tipImg = new egret.Bitmap();
        _this._centerContain.addChild(tipImg);
        tipImg.x = 30;
        tipImg.y = 30;
        RES.getResByUrl("resource/assets/images/ui/tz_home@2x.png", function (e) {
            tipImg.$setBitmapData(e);
        }, _this);
        var wlink1 = new egret.Shape();
        _this._centerContain.addChild(wlink1);
        wlink1.graphics.beginFill(0xf3f3f3);
        wlink1.graphics.drawRect(0, 80, 750, 10);
        wlink1.graphics.endFill();
        _this.addScoll();
        _this.addChild(_this._imgContain);
        _this._imgContain.y = 0;
        _this._mContain.y = -96;
        _this._mContain.addChild(_this._centerContain);
        _this._centerContain.y = 300 + 96;
        _this._mContain.addChild(_this._downContain);
        _this.addActivity();
        _this.joinDown();
        // this.addChild(this._topContain);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(WorldWnd, "getInstance", {
        get: function () {
            if (WorldWnd._mInstance == undefined)
                WorldWnd._mInstance = new WorldWnd();
            return WorldWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    WorldWnd.prototype.dtt = function () {
        // if (this._dtBg == undefined) {
        //     this._dtBg = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/diceng.png`, (e) => {
        //         this._dtBg.$setBitmapData(e);
        //     }, this);
        // }
        // this._centerContain.addChild(this._dtBg);
        // this._dtBg.x = 168;
        // this._dtBg.y = 505 - this.y - this._centerContain.y + GameValue.adaptationScreen;
        // if (this._dtDong == undefined) {
        //     this._dtDong = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/guang.png`, (e) => {
        //         this._dtDong.$setBitmapData(e);
        //     }, this);
        //     this.head_mask1 = new egret.Shape();
        //     this.head_mask1.graphics.beginFill(0x000000, 1);
        //     this.head_mask1.graphics.drawRoundRect(168, 505 - this.y - this._centerContain.y + GameValue.adaptationScreen, 95, 23, 10);
        //     this.head_mask1.graphics.endFill();
        //     this.head_mask1.alpha = 1;
        //     this._centerContain.addChild(this.head_mask1);
        //     this._dtDong.mask = this.head_mask1;
        //     this._dtDong.x = 168 - 68;
        //     this._dtDong.y = 505 - this.y - this._centerContain.y + GameValue.adaptationScreen;
        //     egret.Tween.get(this._dtDong, { loop: true }).to({ x: 168 + 90 }, 1000).wait(300).call(() => {
        //         if (this._dtDong != undefined)
        //             this._dtDong.x = 168 - 68;
        //     })
        // }
        // this._centerContain.addChild(this._dtDong);
        // if (this._dtWZ == undefined) {
        //     this._dtWZ = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/wenzi.png`, (e) => {
        //         this._dtWZ.$setBitmapData(e);
        //     }, this);
        // }
        // this._centerContain.addChild(this._dtWZ);
        // this._dtWZ.x = 174;
        // this._dtWZ.y = 507 - this.y - this._centerContain.y + GameValue.adaptationScreen;
        /**************** 暂时偷懒篮球 ******************/
        // if (this._dtBg1 == undefined) {
        //     this._dtBg1 = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/diceng.png`, (e) => {
        //         this._dtBg1.$setBitmapData(e);
        //     }, this);
        // }
        // this._centerContain.addChild(this._dtBg1);
        // this._dtBg1.x = 168;
        // this._dtBg1.y = 641 - this.y - this._centerContain.y + GameValue.adaptationScreen;
        // if (this._dtDong1 == undefined) {
        //     this._dtDong1 = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/guang.png`, (e) => {
        //         this._dtDong1.$setBitmapData(e);
        //     }, this);
        //     this.head_mask11 = new egret.Shape();
        //     this.head_mask11.graphics.beginFill(0x000000, 1);
        //     this.head_mask11.graphics.drawRoundRect(168, 641 - this.y - this._centerContain.y + GameValue.adaptationScreen, 95, 23, 10);
        //     this.head_mask11.graphics.endFill();
        //     this.head_mask11.alpha = 1;
        //     this._centerContain.addChild(this.head_mask11);
        //     this._dtDong1.mask = this.head_mask11;
        //     this._dtDong1.x = 168 - 68;
        //     this._dtDong1.y = 641 - this.y - this._centerContain.y + GameValue.adaptationScreen;
        //     egret.Tween.get(this._dtDong1, { loop: true }).to({ x: 168 + 90 }, 1000).wait(300).call(() => {
        //         if (this._dtDong1 != undefined)
        //             this._dtDong1.x = 168 - 68;
        //     })
        // }
        // this._centerContain.addChild(this._dtDong1);
        // if (this._dtWZ1 == undefined) {
        //     this._dtWZ1 = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/wenzi.png`, (e) => {
        //         this._dtWZ1.$setBitmapData(e);
        //     }, this);
        // }
        // this._centerContain.addChild(this._dtWZ1);
        // this._dtWZ1.x = 174;
        // this._dtWZ1.y = 643 - this.y - this._centerContain.y + GameValue.adaptationScreen;
        new JJTiao(this._centerContain, 168, 505 - this.y - this._centerContain.y + GameValue.adaptationScreen);
        new JJTiao(this._centerContain, 168, 641 - this.y - this._centerContain.y + GameValue.adaptationScreen);
        new JJTiao(this._centerContain, 168, 777 - this.y - this._centerContain.y + GameValue.adaptationScreen);
        new JJTiao(this._centerContain, 168 + 374, 777 - this.y - this._centerContain.y + GameValue.adaptationScreen);
    };
    WorldWnd.prototype.addActivity = function () {
        var _this = this;
        var objNum = 0;
        var objHeight = 90 + 20;
        for (var i = 0; i < this._imgTitle.length; i++) {
            var obj = new WorldActivity(this._imgSrc[i], this._imgTitle[i], this._imgContent[i], i);
            this._imgItem.Gput(i, obj);
            obj.y = objHeight;
            obj.x = 375 * objNum;
            this._centerContain.addChild(obj);
            if (objNum == 1) {
                objNum = 0;
                objHeight = objHeight + 136;
            }
            else {
                objNum += 1;
            }
        }
        this._banner = new egret.Bitmap();
        this._centerContain.addChild(this._banner);
        this._banner.touchEnabled = true;
        this._banner.y = objHeight + 20;
        // this._banner.y = objHeight + 20 + 136;
        RES.getResByUrl("resource/assets/images/ui/haibao_home@2x.png", function (e) {
            _this._banner.$setBitmapData(e);
            _this._banner.x = (GameMain.getInstance.StageWidth - _this._banner.width) * 0.5;
        }, this);
        this._downContain.y = this._centerContain.y + objHeight + 20 + 140 + 34;
        this.dtt();
    };
    WorldWnd.prototype.touchDown = function (e) {
        WorldWnd._worldState = 1;
        // if (e.target == this._kfBtn) {//联系客服
        //     KeFuWnd.getInstance.show();
        // } else if (e.target == this._kjBtn) {//开奖
        //     AwareInfoMgr.getInstance.show();
        //     OpenAwareConfin.getInstance.sendHttp();
        // } else 
        if (e.target == this._banner) {
            // activitytwo.getInstance.show();
            ID1.getInstance.show();
        }
        this.hide();
    };
    WorldWnd.prototype.toGD = function (e) {
        if (e.target == this._moreText) {
            DownWnd.getInstance.toGD();
        }
    };
    WorldWnd.prototype.upDownData = function () {
        var item = DmC_infoMsg.getInstance.item;
        if (item == undefined || item.size < 1) {
            this._downContain.visible = false;
        }
        else {
            this._downContain.visible = true;
            var index = 0;
            var objHeight = 97.5;
            for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                if (index > 7)
                    break; //最多两条
                var obj = void 0;
                if (this._item.GhasKey(key)) {
                    obj = this._item.Gget(key);
                }
                else {
                    obj = new DmC_info();
                    this._item.Gput(key, obj);
                }
                obj.aa(item.Gget(key));
                obj.addInterception();
                obj.y = objHeight;
                objHeight = objHeight + obj.height;
                index += 1;
                if (obj.parent == undefined)
                    this._downContain.addChild(obj);
            }
            ToolMrg.upItemofGHashMap(this._item, item);
        }
    };
    WorldWnd.prototype.show = function () {
        if (this.parent == undefined)
            GUIManager.getInstance.bgLay.addChild(this);
        WorldWnd._worldState = 0;
        GD_List.getInstance.sendHttp();
        this.addInterception();
        this.upDownData();
        this.moveImg(null);
    };
    WorldWnd.prototype.hide = function () {
        var obj;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this._item.Gget(key);
            if (obj.parent != undefined) {
                obj.parent.removeChild(obj);
            }
        }
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }
    };
    WorldWnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 0;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - 100;
        this.addChild(this._scroView);
    };
    WorldWnd.prototype.addInterception = function () {
        this._moreText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGD, this);
        this._scroView.addEventListener(egret.TouchEvent.CHANGE, this.moveImg, this);
        // this._kjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        // this._kfBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._banner.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._imgItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._imgItem.Gget(key).addInterception();
        }
    };
    WorldWnd.prototype.removeInterception = function () {
        this._moreText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGD, this);
        this._scroView.removeEventListener(egret.TouchEvent.CHANGE, this.moveImg, this);
        // this._kjBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        // this._kfBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._banner.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._imgItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._imgItem.Gget(key).removeInterception();
        }
    };
    WorldWnd.prototype.moveImg = function (e) {
        this._imgContain.y = -this._scroView.scrollTop;
    };
    WorldWnd.prototype.joinDown = function () {
        var downShape = new egret.Shape();
        this._downContain.addChild(downShape);
        downShape.graphics.beginFill(0xf5f5f7);
        downShape.graphics.drawRect(0, 0, 750, 10);
        downShape.graphics.endFill();
        var downShape2 = new egret.Shape();
        this._downContain.addChild(downShape2);
        downShape2.graphics.beginFill(0xffffff);
        downShape2.graphics.drawRect(0, 10, 750, 86);
        downShape2.graphics.endFill();
        var downTitle = ToolMrg.getText(28, 10, 32, 0x333333);
        this._downContain.addChild(downTitle);
        downTitle.bold = true;
        downTitle.height = 86;
        downTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
        downTitle.text = "热门抄单";
        this._moreText = ToolMrg.getText(GameMain.getInstance.StageWidth - 48 * 2, 10, 24, 0x999999, 120);
        this._downContain.addChild(this._moreText);
        // this._moreText.bold = true;
        this._moreText.height = 86;
        // this._moreText.textAlign = egret.HorizontalAlign.CENTER;
        this._moreText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._moreText.touchEnabled = true;
        this._moreText.text = "更多";
        var rightBtn = new egret.Bitmap();
        this._downContain.addChild(rightBtn);
        RES.getResByUrl("resource/assets/images/ui/xq2_nav@2x.png", function (e) {
            rightBtn.$setBitmapData(e);
            rightBtn.y = 10 + (86 - rightBtn.height) * 0.5;
            rightBtn.x = 710;
        }, this);
        var downShape3 = new egret.Shape();
        this._downContain.addChild(downShape3);
        downShape3.graphics.beginFill(0xDEDEDE);
        downShape3.graphics.drawRect(0, 96, 750, 1.5);
        downShape3.graphics.endFill();
    };
    /**适配处理 */
    WorldWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        var mShareC = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { mShareC.$setBitmapData(e); }, this);
        mShareC.width = GameMain.getInstance.StageWidth;
        mShareC.height = 1200;
        this._mContain.addChildAt(mShareC, 0);
    };
    /**状态 0：关闭其他页面不打开首页 1关闭其他二级页面打开首页  show时赋值0 */
    WorldWnd._worldState = 0;
    return WorldWnd;
}(egret.DisplayObjectContainer));
__reflect(WorldWnd.prototype, "WorldWnd");
var JJTiao = (function (_super) {
    __extends(JJTiao, _super);
    function JJTiao(parent, x, y) {
        var _this = _super.call(this) || this;
        parent.addChild(_this);
        if (_this._dtBg == undefined) {
            _this._dtBg = new egret.Bitmap();
            RES.getResByUrl("resource/assets/images/ui/diceng.png", function (e) {
                _this._dtBg.$setBitmapData(e);
            }, _this);
        }
        _this.addChild(_this._dtBg);
        _this._dtBg.x = x;
        _this._dtBg.y = y;
        if (_this._dtDong == undefined) {
            _this._dtDong = new egret.Bitmap();
            RES.getResByUrl("resource/assets/images/ui/guang.png", function (e) {
                _this._dtDong.$setBitmapData(e);
            }, _this);
            _this.head_mask1 = new egret.Shape();
            _this.head_mask1.graphics.beginFill(0x000000, 1);
            _this.head_mask1.graphics.drawRoundRect(x, y, 95, 23, 10);
            _this.head_mask1.graphics.endFill();
            _this.head_mask1.alpha = 1;
            _this.addChild(_this.head_mask1);
            _this._dtDong.mask = _this.head_mask1;
            _this._dtDong.x = x - 68;
            _this._dtDong.y = y;
            egret.Tween.get(_this._dtDong, { loop: true }).to({ x: x + 90 }, 1000).wait(300).call(function () {
                if (_this._dtDong != undefined)
                    _this._dtDong.x = x - 68;
            });
        }
        _this.addChild(_this._dtDong);
        if (_this._dtWZ == undefined) {
            _this._dtWZ = new egret.Bitmap();
            RES.getResByUrl("resource/assets/images/ui/wenzi.png", function (e) {
                _this._dtWZ.$setBitmapData(e);
            }, _this);
        }
        _this.addChild(_this._dtWZ);
        _this._dtWZ.x = x + 6;
        _this._dtWZ.y = y + 2;
        return _this;
    }
    return JJTiao;
}(egret.DisplayObjectContainer));
__reflect(JJTiao.prototype, "JJTiao");
var WorldActivity = (function (_super) {
    __extends(WorldActivity, _super);
    function WorldActivity(imgsrc, title, content, id) {
        var _this = _super.call(this) || this;
        _this._isInterception = false;
        _this._id = id;
        _this._img = new egret.Bitmap();
        _this._img.x = 40;
        _this.addChild(_this._img);
        _this._img.y = 20;
        RES.getResByUrl("resource/assets/images/ui/" + imgsrc + ".png", function (e) {
            _this._img.$setBitmapData(e);
        }, _this);
        _this._title = ToolMrg.getText(164, 20 + 8, 32, 0x333333);
        _this.addChild(_this._title);
        _this._title.text = title;
        if (title == "更多玩法")
            _this._title.y = 48;
        _this._content = ToolMrg.getText(164, 20 + 54, 24, 0x999999);
        _this.addChild(_this._content);
        _this._content.text = content;
        _this.setDB();
        return _this;
    }
    WorldActivity.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    WorldActivity.prototype.removeInterception = function () {
        if (this._isInterception) {
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    WorldActivity.prototype.touchDown = function (e) {
        WorldWnd._worldState = 1;
        if (this._id == 0) {
            if (GameValue.isJ <= 0) {
                // Alertpaner.getInstance.show("该时间段不可购买");
                TsView.getInstance.show();
                return;
            }
            FbWnd.getInstance.show();
        }
        else if (this._id == 1) {
            if (GameValue.isJ <= 0) {
                // Alertpaner.getInstance.show("该时间段不可购买");
                TsView.getInstance.show();
                return;
            }
            FbWnd.getInstance._index = 1;
            FbWnd.getInstance.show();
        }
        else if (this._id == 2) {
            if (GameValue.isJ <= 0) {
                // Alertpaner.getInstance.show("该时间段不可购买");
                TsView.getInstance.show();
                return;
            }
            BasketBallWnd.getInstance.show();
        }
        else if (this._id == 3) {
            if (GameValue.isJ <= 0) {
                // Alertpaner.getInstance.show("该时间段不可购买");
                TsView.getInstance.show();
                return;
            }
            BasketBallWnd.getInstance._index = 1;
            BasketBallWnd.getInstance.show();
        }
        else if (this._id == 4) {
            SPFbWnd.getInstance.show();
        }
        else if (this._id == 5) {
            SPBasketBallWnd.getInstance.show();
        }
        else if (this._id == 6) {
            ThreeBox.getInstance.show();
        }
        else if (this._id == 7) {
            FiveBox.getInstance.show();
        }
        WorldWnd.getInstance.hide();
    };
    /**适配处理 */
    WorldActivity.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth / 2, 96 + 40);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    return WorldActivity;
}(egret.DisplayObjectContainer));
__reflect(WorldActivity.prototype, "WorldActivity");
//# sourceMappingURL=WorldWnd.js.map