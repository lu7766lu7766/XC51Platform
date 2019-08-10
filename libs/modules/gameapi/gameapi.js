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
var MDisplay;
(function (MDisplay) {
    var MUISprite = (function (_super) {
        __extends(MUISprite, _super);
        function MUISprite() {
            var _this = _super.call(this) || this;
            _this._mInit = false;
            _this._mLoadMod = new GLoadModule();
            return _this;
        }
        MUISprite.prototype.beforeLoad = function (url, type) {
            if (type != undefined && (type == GLoadModule.GroupType_UI || type == GLoadModule.GroupType_Flash
                || type == GLoadModule.GroupType_SheetUI || type == GLoadModule.GroupType_SheetFlash)) {
                this._mLoadMod.GaddGroupRes(url, type);
            }
            else
                this._mLoadMod.GaddItem(url);
        };
        MUISprite.prototype.GinitUIConfig = function (url) {
            if (url && url != "") {
                var uiName = url + '.json';
                if (this._mLoadMod.GaddGroupRes(uiName, GLoadModule.GroupType_UI)) {
                    this._mUIConfigUrl = MUISprite.UIConfigUrl + uiName;
                }
            }
            this._mLoadMod.Gbegin(this.onLoadedItems, this);
        };
        MUISprite.prototype.onLoadedItems = function () {
            this._mInit = true;
            this.initUI();
            this.onInit();
        };
        MUISprite.prototype.initUI = function () {
            if (!this._mUIConfigUrl || this._mUIConfigUrl == "")
                return;
            var configData = GResCache.getRes(this._mUIConfigUrl);
            var list = configData['list'];
            for (var i = 0, l = list.length; i < l; i++) {
                var child = new egret.Bitmap(GResCache.getRes(MUISprite.UIImageUrl + list[i]['path']));
                child.x = list[i]['x'];
                child.y = list[i]['y'];
                if (list[i]['skx'] != list[i]['sky']) {
                    child.skewX = list[i]['skx'];
                    child.skewY = list[i]['sky'];
                    child.rotation = 0;
                }
                else {
                    child.rotation = list[i]['r'];
                    child.skewX = 0;
                    child.skewY = 0;
                }
                child.scaleX = list[i]['sx'];
                child.scaleY = list[i]['sy'];
                child.name = list[i]['n'];
                this.addChild(child);
            }
        };
        MUISprite.prototype.onInit = function () {
        };
        MUISprite.UIConfigUrl = 'resource/assets/uiconfig/';
        MUISprite.UIImageUrl = 'resource/assets/images/ui/';
        return MUISprite;
    }(egret.DisplayObjectContainer));
    MDisplay.MUISprite = MUISprite;
    __reflect(MUISprite.prototype, "MDisplay.MUISprite");
})(MDisplay || (MDisplay = {}));
var GSocketMager = (function () {
    function GSocketMager() {
        this._mSocketMap = new GHashMap();
    }
    Object.defineProperty(GSocketMager, "getInstance", {
        get: function () {
            if (GSocketMager._mInstance == undefined)
                GSocketMager._mInstance = new GSocketMager();
            return GSocketMager._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GSocketMager.prototype.createSocket = function (url, handle, id) {
        if (id === void 0) { id = 1; }
        var temp = this._mSocketMap.Gget(id);
        if (temp === null) {
            temp = new MNet.MSocketer(url, handle);
            this._mSocketMap.Gput(id, temp);
        }
    };
    GSocketMager.prototype.sendByteArr = function (Ba, id) {
        if (id === void 0) { id = 1; }
        var temp = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.sendByteArray(Ba);
        }
    };
    /**断开连接 */
    GSocketMager.prototype.closeSocket = function (id) {
        if (id === void 0) { id = 1; }
        var temp = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.closeSocket();
        }
    };
    /**重新连接 */
    GSocketMager.prototype.connectSocket = function (id) {
        if (id === void 0) { id = 1; }
        var temp = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.connectSocket();
        }
    };
    /**清空发送缓存协议 */
    GSocketMager.prototype.cleanCacheArr = function (id) {
        if (id === void 0) { id = 1; }
        var temp = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.cleanCacheArr();
        }
    };
    return GSocketMager;
}());
__reflect(GSocketMager.prototype, "GSocketMager");
var GMovieClipEvent = (function () {
    function GMovieClipEvent() {
    }
    GMovieClipEvent.loadedConfig = "loadedConfig";
    GMovieClipEvent.played = 'MMovieClop_played';
    GMovieClipEvent.playing = 'MMovieClop_playing';
    return GMovieClipEvent;
}());
__reflect(GMovieClipEvent.prototype, "GMovieClipEvent");
var GMovieMag = (function () {
    function GMovieMag() {
        this._mConfigDataMap = new GHashMap();
        this._mEnterFrameItems = new GHashMap();
    }
    Object.defineProperty(GMovieMag, "getInstance", {
        get: function () {
            if (GMovieMag._mInstance == undefined)
                GMovieMag._mInstance = new GMovieMag();
            return GMovieMag._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GMovieMag.prototype.GonEnterFrame = function () {
        var keys = this._mEnterFrameItems.keys;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var temp = this._mEnterFrameItems.Gget(key);
            temp.Mupdate();
        }
    };
    GMovieMag.prototype.Madd2EnterFrame = function (mc) {
        if (mc == undefined)
            return;
        this._mEnterFrameItems.Gput(mc.hashCode, mc);
    };
    GMovieMag.prototype.MremoveEnterFrame = function (mc) {
        if (mc == undefined)
            return;
        this._mEnterFrameItems.GremoveByKey(mc.hashCode);
    };
    /**
     * 获取MC对象
     * @param 	url				MC动画配置文件名 不包含.json后缀名
     * @param	start			动画开始帧数 如果设置为0 则默认从动画第一帧开始播放
     * @param	end				动画结束帧数 如果设置为0 则默认完全播放结束
     * @param	isloop			动画是否循环播放
     * @param	isAutoClean		动画播放完后 是否自动添加到对象池
     * @returns					最终MC结果对象
     */
    GMovieMag.prototype.GgetMovieClip = function (url, start, end, isloop, isAutoClean) {
        var data = this._mConfigDataMap.Gget(url);
        if (data == null) {
            data = new MDisplay.MMovieClipData();
            this._mConfigDataMap.Gput(url, data);
        }
        data.MloadConfig(url);
        var mc = GObjPool.getInstance.GgetObj(MDisplay.MMovieClip);
        if (mc == null)
            mc = new MDisplay.MMovieClip();
        mc.MsetConfigData(data, start, end, isloop, isAutoClean);
        return mc;
    };
    return GMovieMag;
}());
__reflect(GMovieMag.prototype, "GMovieMag");
var MDisplay;
(function (MDisplay) {
    var GParticle = (function (_super) {
        __extends(GParticle, _super);
        /**
         * 新建粒子对象
         * @param texture		粒子对象显示的贴图对象
         * @param lifeMin		单个粒子生命周期最小值
         * @param lifeMax		单个粒子生命周期最大值
         * @param it			单个粒子出现的间隔时间(毫秒)
         * @param max			同时存在最大的粒子数
         * @param xmin			初始化X坐标最小值
         * @param xmax			初始化X坐标最大值
         * @param xResMin		粒子生命结束时X的最小偏移量 在初始X坐标基础上+此增量
         * @param xResMax		粒子生命结束时X的最大偏移量 在初始X坐标基础上+此增量
         * @param ymin			初始化Y坐标最小值
         * @param ymax			初始化Y坐标最大值
         * @param yResMin		粒子生命结束时Y的最小偏移量 在初始Y坐标基础上+此增量
         * @param yResMax		粒子生命结束时Y的最大偏移量 在初始Y坐标基础上+此增量
         * @param alphaMin		初始化alpha最小值
         * @param alphaMax		初始化alpha最大值
         * @param alphaResMin	粒子生命结束时alpha的最小偏移量 在初始alpha基础上+此增量
         * @param alphaResMax	粒子生命结束时alpha的最大偏移量 在初始alpha基础上+此增量
         * @param scaleXMin		初始化scaleX最小值
         * @param scaleXMax		初始化scaleX最大值
         * @param scaleXResMin	粒子生命结束时scaleX的最小偏移量 在初始scaleX基础上+此增量
         * @param scaleXResMax	粒子生命结束时scaleX的最大偏移量 在初始scaleX基础上+此增量
         * @param scaleYMin		初始化scaleY最小值
         * @param scaleYMax		初始化scaleY最大值
         * @param scaleYResMin	粒子生命结束时scaleY的最小偏移量 在初始scaleY基础上+此增量
         * @param scaleYResMax	粒子生命结束时scaleY的最大偏移量 在初始scaleY基础上+此增量
         */
        function GParticle(texture, lifeMin, lifeMax, it, max, xmin, xmax, xResMin, xResMax, ymin, ymax, yResMin, yResMax, alphaMin, alphaMax, alphaResMin, alphaResMax, scaleXMin, scaleXMax, scaleXResMin, scaleXResMax, scaleYMin, scaleYMax, scaleYResMin, scaleYResMax) {
            var _this = _super.call(this) || this;
            _this._lastAddTime = 0;
            _this._texture = texture;
            _this._lifeMin = lifeMin;
            _this._lifeMax = lifeMax;
            _this._interval = it;
            _this._Max = max;
            _this._xMin = xmin;
            _this._xMax = xmax;
            _this._xResMin = xResMin;
            _this._xResMax = xResMax;
            _this._YMin = ymin;
            _this._YMax = ymax;
            _this._YResMin = yResMin;
            _this._YResMax = yResMax;
            _this._AlphaMin = alphaMin != undefined ? alphaMin : 1;
            _this._AlphaMax = alphaMax != undefined ? alphaMax : 1;
            _this._AlphaResMin = alphaResMin != undefined ? alphaResMin : 1;
            _this._AlphaResMax = alphaResMax != undefined ? alphaResMax : 1;
            _this._scaleXMin = scaleXMin != undefined ? scaleXMin : 1;
            _this._scaleXMax = scaleXMax != undefined ? scaleXMax : 1;
            _this._scaleXResMin = scaleXResMin != undefined ? scaleXResMin : 1;
            _this._scaleXResMax = scaleXResMax != undefined ? scaleXResMax : 1;
            _this._scaleYMin = scaleYMin != undefined ? scaleYMin : 1;
            _this._scaleYMax = scaleYMax != undefined ? scaleYMax : 1;
            _this._scaleYResMin = scaleYResMin != undefined ? scaleYResMin : 1;
            _this._scaleYResMax = scaleYResMax != undefined ? scaleYResMax : 1;
            _this._lastAddTime = egret.getTimer();
            _this._itemArr = [];
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
            return _this;
        }
        GParticle.prototype.onEnterFrame = function (e) {
            if (this._pause)
                return;
            var ct = egret.getTimer();
            this.add(ct);
            this.update(ct);
        };
        GParticle.prototype.add = function (ct) {
            if (this._itemArr.length >= this._Max || (ct - this._lastAddTime) < this._interval)
                return;
            var life = this._lifeMin + Math.floor(Math.random() * (this._lifeMax - this._lifeMin) + 0.5);
            var x = this._xMin + Math.floor(Math.random() * (this._xMax - this._xMin) + 0.5);
            var y = this._YMin + Math.floor(Math.random() * (this._YMax - this._YMin) + 0.5);
            var xRes = x + this._xResMin + Math.floor(Math.random() * (this._xResMax - this._xResMin) + 0.5);
            var yRes = y + this._YResMin + Math.floor(Math.random() * (this._YResMax - this._YResMin) + 0.5);
            var alpha = this._AlphaMin + Math.random() * (this._AlphaMax - this._AlphaMin);
            var alphaRes = this._AlphaResMin + Math.random() * (this._AlphaResMax - this._AlphaResMin);
            var scaleX = this._scaleXMin + Math.random() * (this._scaleXMax - this._scaleXMin);
            var scaley = this._scaleYMin + Math.random() * (this._scaleYMax - this._scaleYMin);
            var scaleXRes = this._scaleXResMin + Math.random() * (this._scaleXResMax - this._scaleXResMin);
            var scaleYRes = this._scaleYResMin + Math.random() * (this._scaleYResMax - this._scaleYResMin);
            var xstep = (xRes - x) / life;
            var ystep = (yRes - y) / life;
            var alphaStep = alphaRes == alpha ? 0 : (alphaRes - alpha) / life;
            var scaleXStep = scaleXRes == scaleX ? 0 : (scaleXRes - scaleX) / life;
            var scaleYStep = scaleYRes == scaley ? 0 : (scaleYRes - scaley) / life;
            var temp = new MDisplay.MParticleData(this._texture, life, xstep, ystep, alphaStep, scaleXStep, scaleYStep);
            temp.init(x, y, alpha, scaleX, scaley);
            this.addChild(temp.bitMap);
            this._itemArr.push(temp);
        };
        GParticle.prototype.update = function (ct) {
            for (var i = this._itemArr.length - 1; i >= 0; i--) {
                var temp = this._itemArr[i];
                if (temp.update(ct) == false) {
                    temp.clean();
                    this._itemArr.splice(i, 1);
                }
            }
        };
        GParticle.prototype.setPause = function (pause) {
            this._pause = pause;
        };
        Object.defineProperty(GParticle.prototype, "pause", {
            get: function () {
                return this._pause;
            },
            enumerable: true,
            configurable: true
        });
        GParticle.prototype.clear = function () {
            this.setPause(true);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            for (var i = this._itemArr.length - 1; i >= 0; i--) {
                this._itemArr[i].clean();
            }
            this._itemArr.splice(0, this._itemArr.length);
            if (this.parent != undefined)
                this.parent.removeChild(this);
        };
        return GParticle;
    }(egret.Sprite));
    MDisplay.GParticle = GParticle;
    __reflect(GParticle.prototype, "MDisplay.GParticle");
})(MDisplay || (MDisplay = {}));
var GUIManager = (function (_super) {
    __extends(GUIManager, _super);
    function GUIManager() {
        var _this = _super.call(this) || this;
        _this._mUIBg = new egret.DisplayObjectContainer();
        _this._mUITop = new egret.DisplayObjectContainer();
        _this._mUITips = new egret.DisplayObjectContainer();
        _this._mUIMost = new egret.DisplayObjectContainer();
        _this.addChild(_this._mUIBg);
        _this.addChild(_this._mUITop);
        _this.addChild(_this._mUITips);
        _this.addChild(_this._mUIMost);
        return _this;
    }
    Object.defineProperty(GUIManager, "getInstance", {
        get: function () {
            if (GUIManager._mInstance == undefined)
                GUIManager._mInstance = new GUIManager();
            return GUIManager._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUIManager.prototype, "bgLay", {
        get: function () {
            return this._mUIBg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUIManager.prototype, "topLay", {
        get: function () {
            return this._mUITop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUIManager.prototype, "tipLay", {
        get: function () {
            return this._mUITips;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUIManager.prototype, "mostLay", {
        get: function () {
            return this._mUIMost;
        },
        enumerable: true,
        configurable: true
    });
    return GUIManager;
}(egret.DisplayObjectContainer));
__reflect(GUIManager.prototype, "GUIManager");
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
var MDisplay;
(function (MDisplay_1) {
    var MDisplay = (function () {
        function MDisplay() {
        }
        return MDisplay;
    }());
    MDisplay_1.MDisplay = MDisplay;
    __reflect(MDisplay.prototype, "MDisplay.MDisplay");
})(MDisplay || (MDisplay = {}));
var MDisplay;
(function (MDisplay) {
    var MDisplayConfig = (function () {
        function MDisplayConfig(path, bn, r, sx, sy, x, y, skx, sky, alpha, name) {
            if (alpha === void 0) { alpha = 1; }
            this.mImagePath = path;
            this.mBlendName = bn;
            this.mRotation = r;
            this.mScaleX = sx;
            this.mScaleY = sy;
            this.mX = x;
            this.mY = y;
            this.mSkewX = skx;
            this.mSkewY = sky;
            this.mAlpha = alpha;
            this.mName = name;
        }
        return MDisplayConfig;
    }());
    MDisplay.MDisplayConfig = MDisplayConfig;
    __reflect(MDisplayConfig.prototype, "MDisplay.MDisplayConfig");
})(MDisplay || (MDisplay = {}));
var MDisplay;
(function (MDisplay) {
    var MFramData = (function () {
        function MFramData(index, eventStr) {
            this._mDisplays = new Array();
            this._mIndex = index;
            this._mEventStr = eventStr;
        }
        MFramData.prototype.MaddDisplay = function (sprite) {
            this._mDisplays.push(sprite);
        };
        Object.defineProperty(MFramData.prototype, "displays", {
            get: function () {
                return this._mDisplays;
            },
            enumerable: true,
            configurable: true
        });
        return MFramData;
    }());
    MDisplay.MFramData = MFramData;
    __reflect(MFramData.prototype, "MDisplay.MFramData");
})(MDisplay || (MDisplay = {}));
var MDisplay;
(function (MDisplay) {
    var MMovieClip = (function (_super) {
        __extends(MMovieClip, _super);
        function MMovieClip() {
            var _this = _super.call(this) || this;
            /**当前动画播放到的帧数 */
            _this._mCurrentFramIndex = 1;
            /**手动配置的动画起始帧数 如果为0 表示从第1帧开始播放*/
            _this._mStartFrameIndex = 0;
            /**手动配置的动画结束帧数 如果为0 表示播放到原始动画的最后一帧*/
            _this._mEndFrameIndex = 0;
            /**动画是否循环播放 */
            _this._mIsLoop = true;
            /**动画播放完后 是否自动清除 */
            _this._mAutoClean = false;
            /**动画当前是否暂停 */
            _this._mIsPause = true;
            return _this;
        }
        MMovieClip.prototype.MsetConfigData = function (data, start, end, isloop, isAutoClean) {
            this._mConfigData = data;
            this._mTotalFrames = data.mFrameTotal;
            this._mIsPause = false;
            this.GgoToAndPlay(start, end, isloop, isAutoClean);
            GMovieMag.getInstance.Madd2EnterFrame(this);
        };
        /**
         * 设置MC对象的相关属性
        * @param	start			动画开始帧数 如果设置为0 则默认从动画第一帧开始播放
        * @param	end				动画结束帧数 如果设置为0 则默认完全播放结束
        * @param	isloop			动画是否循环播放
        * @param	isAutoClean		动画播放完后 是否自动添加到对象池
         */
        MMovieClip.prototype.GgoToAndPlay = function (start, end, isloop, isAutoClean) {
            this._mStartFrameIndex = start == undefined ? 0 : start;
            this._mEndFrameIndex = end == undefined ? 0 : end;
            this._mIsLoop = isloop == undefined ? true : isloop;
            this._mAutoClean = isAutoClean == undefined ? false : isAutoClean;
            this._mIsPause = false;
            this._mCurrentFramIndex = this._mStartFrameIndex == 0 ? 1 : this._mStartFrameIndex;
        };
        /**
         * 暂停动画播放 必须是在动画已经初始化完毕 暂停才有效
         */
        MMovieClip.prototype.GPause = function () {
            if (this._mConfigData.mIsInit)
                this._mIsPause = true;
        };
        /**
         * 播放动画 必须是在动画已经初始化完毕 播放才有效
         */
        MMovieClip.prototype.GPlay = function () {
            if (this._mConfigData.mIsInit)
                this._mIsPause = false;
        };
        MMovieClip.prototype.Mupdate = function () {
            if (this._mConfigData.mIsInit == false || this._mIsPause)
                return;
            var frame = this._mConfigData.GgetFrameData(this._mCurrentFramIndex);
            if (frame == null)
                return;
            var items = frame.displays;
            var childLen = this.numChildren;
            for (var i = 0, l = items.length; i < l; i++) {
                var item = items[i];
                var tempBm = void 0;
                if (i < childLen)
                    tempBm = this.getChildAt(i);
                else
                    tempBm = new egret.Bitmap();
                tempBm.$setBitmapData(GResCache.getRes(item.mImagePath, RES.ResourceItem.TYPE_IMAGE));
                tempBm.x = item.mX;
                tempBm.y = item.mY;
                tempBm.scaleX = item.mScaleX;
                tempBm.scaleY = item.mScaleY;
                tempBm.name = item.mName;
                if (item.mSkewX != item.mSkewY) {
                    tempBm.skewX = item.mSkewX;
                    tempBm.skewY = item.mSkewY;
                    tempBm.rotation = 0;
                }
                else {
                    tempBm.rotation = item.mRotation;
                    tempBm.skewX = 0;
                    tempBm.skewY = 0;
                }
                tempBm.alpha = item.mAlpha;
                if (i >= childLen)
                    this.addChild(tempBm);
            }
            if (this.hasEventListener(GMovieClipEvent.playing))
                this.dispatchEventWith(GMovieClipEvent.playing, false, this);
            while (this.numChildren > items.length)
                this.removeChildAt(this.numChildren - 1);
            this.updateFrameIndex();
        };
        MMovieClip.prototype.updateFrameIndex = function () {
            var end = this._mEndFrameIndex == 0 ? this._mConfigData.mFrameTotal : this._mEndFrameIndex;
            var start = this._mStartFrameIndex == 0 ? 1 : this._mStartFrameIndex;
            if (this._mCurrentFramIndex >= end) {
                if (this._mIsLoop) {
                    this._mCurrentFramIndex = start;
                }
                else {
                    this._mIsPause = true;
                    this.dispatchEventWith(GMovieClipEvent.played, false, this);
                    if (this._mAutoClean)
                        GObjPool.getInstance.Gadd2Pool(this);
                }
            }
            else
                this._mCurrentFramIndex++;
        };
        MMovieClip.prototype.clean = function () {
            GMovieMag.getInstance.MremoveEnterFrame(this);
            if (this.parent != null)
                this.parent.removeChild(this);
            this.removeChildren();
            this.x = 0;
            this.y = 0;
            this.anchorOffsetX = 0;
            this.anchorOffsetY = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.alpha = 1;
        };
        Object.defineProperty(MMovieClip.prototype, "mTotalFrames", {
            get: function () {
                return this._mTotalFrames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MMovieClip.prototype, "mCurrentFramIndex", {
            get: function () {
                return this._mCurrentFramIndex;
            },
            enumerable: true,
            configurable: true
        });
        return MMovieClip;
    }(egret.DisplayObjectContainer));
    MDisplay.MMovieClip = MMovieClip;
    __reflect(MMovieClip.prototype, "MDisplay.MMovieClip", ["GIObjPool"]);
})(MDisplay || (MDisplay = {}));
var MDisplay;
(function (MDisplay) {
    var MMovieClipData = (function () {
        function MMovieClipData() {
            this.mIsInit = false;
            this._mIsLoading = false;
            this.framesArr = {};
            this._mLoader = new GLoadModule();
        }
        MMovieClipData.prototype.MloadConfig = function (url) {
            if (this.mIsInit) {
                return;
            }
            if (this._mIsLoading)
                return;
            this._mIsLoading = true;
            var groupName = url + '.json';
            if (this._mLoader.GaddGroupRes(groupName, GLoadModule.GroupType_Flash)) {
                this.mURL = MMovieClipData.configFileBaseUrl + groupName;
                this._mLoader.Gbegin(this.onLoadedImage, this);
            }
        };
        MMovieClipData.prototype.onLoadedImage = function () {
            var data = GResCache.getRes(this.mURL);
            this.handleData(data);
            this.mIsInit = true;
        };
        MMovieClipData.prototype.handleData = function (data) {
            var imageArr = data['imageArr'];
            var frameArr = data['frames'];
            this.mFrameTotal = frameArr.length;
            for (var i1 = 0, l1 = frameArr.length; i1 < l1; i1++) {
                var frame = frameArr[i1];
                var temp = new MDisplay.MFramData(frame['index'], frame['eventStr']);
                for (var i = 0, l = frame['list'].length; i < l; i++) {
                    var display = frame['list'][i];
                    temp.MaddDisplay(new MDisplay.MDisplayConfig(MMovieClipData.imageFileBaseUrl + imageArr[display[0]], display[1], display[2], display[3], display[4], display[5], display[6], display[7], display[8], display[9], display[10]));
                }
                this.framesArr[frame['index']] = temp;
            }
        };
        MMovieClipData.prototype.GgetFrameData = function (index) {
            var temp = this.framesArr[index];
            return temp == undefined ? null : temp;
        };
        MMovieClipData.configFileBaseUrl = 'resource/assets/flashconfig/';
        MMovieClipData.imageFileBaseUrl = 'resource/assets/images/flash/';
        return MMovieClipData;
    }());
    MDisplay.MMovieClipData = MMovieClipData;
    __reflect(MMovieClipData.prototype, "MDisplay.MMovieClipData");
})(MDisplay || (MDisplay = {}));
var MDisplay;
(function (MDisplay) {
    var MParticleData = (function () {
        function MParticleData(texture, life, xstep, ystep, alphaStep, scaleXstep, scaleYstep) {
            this._startTime = this._lastTime = egret.getTimer();
            this._bitMap = new egret.Bitmap();
            this._bitMap.$setBitmapData(texture);
            this._lifeTime = life;
            this._XStep = xstep;
            this._YStep = ystep;
            this._AlphaStep = alphaStep;
            this._scaleXStep = scaleXstep;
            this._scaleYStep = scaleYstep;
        }
        MParticleData.prototype.init = function (x, y, alpha, scalex, scaley) {
            this._bitMap.x = x;
            this._bitMap.y = y;
            this._bitMap.alpha = alpha;
            this._bitMap.scaleX = scalex;
            this._bitMap.scaleY = scaley;
        };
        Object.defineProperty(MParticleData.prototype, "bitMap", {
            get: function () {
                return this._bitMap;
            },
            enumerable: true,
            configurable: true
        });
        MParticleData.prototype.update = function (currentT) {
            if ((currentT - this._startTime) > this._lifeTime)
                return false;
            var it = currentT - this._lastTime;
            this._bitMap.x += this._XStep * it;
            this._bitMap.y += this._YStep * it;
            this._bitMap.alpha += this._AlphaStep * it;
            this._bitMap.scaleX += this._scaleXStep * it;
            this._bitMap.scaleY += this._scaleYStep * it;
            this._lastTime = currentT;
            return true;
        };
        MParticleData.prototype.clean = function () {
            this._bitMap.$setBitmapData(null);
            if (this._bitMap.parent != undefined)
                this._bitMap.parent.removeChild(this._bitMap);
        };
        return MParticleData;
    }());
    MDisplay.MParticleData = MParticleData;
    __reflect(MParticleData.prototype, "MDisplay.MParticleData");
})(MDisplay || (MDisplay = {}));
var MDisplay;
(function (MDisplay) {
    var GButton = (function (_super) {
        __extends(GButton, _super);
        /**
         * 设置位图内容  及是否自动缩放 默认为自动缩放
         */
        function GButton(data, isAutoZoon) {
            var _this = _super.call(this, data) || this;
            _this._isAutoZoon = true;
            _this._touchBeginFun = undefined;
            _this._touchBeginThisObj = undefined;
            _this._isSetZoon = false;
            if (isAutoZoon != undefined) {
                _this._isAutoZoon = isAutoZoon;
            }
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onClick, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEnd, _this);
            _this.touchEnabled = true;
            return _this;
        }
        /**
         * 添加单击事件
         * @param fun:事件回调的方法
         * @param thisObj:事件回调依附的对象
         */
        GButton.prototype.addTouchBeginEvent = function (fun, thisObj) {
            this._touchBeginFun = fun;
            this._touchBeginThisObj = thisObj;
        };
        GButton.prototype.touchEnd = function (e) {
            if (e.currentTarget == this) {
                if (this._isAutoZoon) {
                    GButton.upstep(this, this._touchBeginFun, this._touchBeginThisObj, e);
                }
                else if (this._touchBeginFun != undefined && this._touchBeginThisObj != undefined)
                    this._touchBeginFun.call(this._touchBeginThisObj, e);
            }
            e.stopImmediatePropagation;
        };
        GButton.prototype.onClick = function (e) {
            if (e.currentTarget == this) {
                if (this._isAutoZoon) {
                    GButton.minify(this);
                }
                else
                    this._touchBeginFun.call(this._touchBeginThisObj, e);
            }
            e.stopImmediatePropagation;
        };
        /**
         * 设置居中缩放锚点
         * 因为锚点跟X Y坐标有关联 如果当前锚点已经居中 则此方法不会做任何修改
         */
        GButton.setZoom = function (obj) {
            var offsetX = Math.floor(obj.width / 2 + 0.5);
            if (obj.$anchorOffsetX != 0)
                return;
            var offsetY = Math.floor(obj.height / 2 + 0.5);
            obj.anchorOffsetX = offsetX;
            obj.anchorOffsetY = offsetY;
            obj.x += obj.anchorOffsetX;
            obj.y += obj.$anchorOffsetY;
        };
        /**
         * 缓动缩小 并且设置锚点为正中心
         */
        GButton.minify = function (obj) {
            GButton.setZoom(obj);
            egret.Tween.get(obj).to({ scaleX: 0.9, scaleY: 0.9 }, 80);
        };
        /**
         * 缓动放大 并且设置锚点为正中心 当缓动结束后 调用指定回调方法
         * @param obj  要进行缓动的显示对象
         * @param fun	缓动结束的回调方法
         * @param funThisObj 回调方法对应的This对象
         * @param data		回调方法需要传递的对象
         */
        GButton.upstep = function (obj, fun, funThisObj, data) {
            GButton.setZoom(obj);
            egret.Tween.get(obj).to({ scaleX: 1.1, scaleY: 1.1 }, 110).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                if (fun != undefined && funThisObj != undefined) {
                    if (data != undefined)
                        fun.call(funThisObj, data);
                    else
                        fun.call(funThisObj);
                }
            }, funThisObj);
        };
        return GButton;
    }(egret.Bitmap));
    MDisplay.GButton = GButton;
    __reflect(GButton.prototype, "MDisplay.GButton");
})(MDisplay || (MDisplay = {}));
var MDisplay;
(function (MDisplay) {
    var MUIWnd = (function (_super) {
        __extends(MUIWnd, _super);
        function MUIWnd() {
            var _this = _super.call(this) || this;
            /**正在加载界面*/
            _this._mLoading = false;
            /**正在显示缓动*/
            _this._mActionShow = false;
            /**正在隐藏缓动*/
            _this._mActionHide = false;
            /**是否显示加载UI*/
            _this._mShowLoadUI = false;
            /**是否加遮罩 */
            _this._mIsOpenMask = false;
            /**遮罩显示对象 */
            _this._mUiMask = null;
            /**遮罩透明度*/
            _this._mMaskAlpha = 0.7;
            /**遮罩父类 */
            _this._mShowParent = null;
            /**tween 时间是否已结束 */
            _this._mTweenFinish = true;
            return _this;
        }
        MUIWnd.prototype.GWndConfig = function (wndName, parent, showType, showLoadUI, isMask) {
            if (isMask === void 0) { isMask = false; }
            this._mWndName = wndName;
            this._mShowParent = parent;
            this._mPater = parent;
            this._mShowType = showType == undefined ? WndShowType.NONE : showType;
            this._mShowLoadUI = showLoadUI == undefined ? false : showLoadUI;
            this._mIsOpenMask = isMask;
        };
        MUIWnd.prototype.loadWndRes = function () {
            _super.prototype.GinitUIConfig.call(this, this._mWndName);
        };
        MUIWnd.prototype.onInit = function () {
            _super.prototype.onInit.call(this);
            this._mLoading = false;
            this._mInit = true;
            if (this._mShowLoadUI)
                this.hideLoadingUI();
            this.addZH();
            this.actionShow();
        };
        MUIWnd.prototype.show = function () {
            if (this._mTweenFinish == false) {
                return;
            }
            this._mTweenFinish = false;
            if (this._mInit == false) {
                if (this._mShowLoadUI)
                    this.showLoadingUI();
                this._mLoading = true;
                this.loadWndRes();
                return;
            }
            this.addZH();
            this.actionShow();
        };
        /**添加遮罩 */
        MUIWnd.prototype.addZH = function () {
            if (this._mIsOpenMask && this._mUiMask == undefined) {
                this._mUiMask = new egret.Bitmap(GResCache.getRes('resource/assets/images/ui/heise.png'));
                this._mUiMask.width = GUIManager.getInstance.stage.stageWidth;
                this._mUiMask.height = GUIManager.getInstance.stage.stageHeight;
                this._mUiMask.touchEnabled = true;
                this.setMaskAlpha(this._mMaskAlpha);
            }
        };
        /**
         * 设置遮罩透明度
         * @param val 0- 1  默认 0.5
         */
        MUIWnd.prototype.setMaskAlpha = function (val) {
            var self = this;
            if (self._mUiMask == null)
                return;
            self._mMaskAlpha = val > 0 ? (val > 1 ? 1 : val) : 0;
            self._mUiMask.alpha = self._mMaskAlpha;
        };
        MUIWnd.prototype.actionShow = function () {
            if (this._mLoading)
                return;
            if (this._mPater != null && this._mPater.contains(this) == false) {
                if (this._mUiMask && !this._mUiMask.parent) {
                    this._mShowParent.addChild(this._mUiMask);
                }
                this._mPater.addChild(this);
            }
            egret.Tween.removeTweens(this);
            // this.x = (this.stage.width - this.width) * 0.5;
            // this.y = (this.stage.height - this.height) * 0.5;
            var tw;
            switch (this._mShowType) {
                case WndShowType.ALPHA:
                    this._mActionShow = true;
                    this.alpha = 0.1;
                    tw = egret.Tween.get(this);
                    tw.to({ alpha: 1 }, 300);
                    tw.call(this.endShow, this);
                    break;
                case WndShowType.DROP:
                    this._mActionShow = true;
                    var toY = this.y;
                    this.y = -this.height;
                    tw = egret.Tween.get(this);
                    tw.to({ y: toY }, 250, egret.Ease.backIn);
                    tw.call(this.endShow, this);
                    break;
                case WndShowType.SCALE:
                    this._mActionShow = true;
                    this.anchorOffsetX = this.width * 0.5;
                    this.anchorOffsetY = this.height * 0.5;
                    this.scaleX = 0.1;
                    this.scaleY = 0.1;
                    tw = egret.Tween.get(this);
                    tw.to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.getBackInOut(1));
                    tw.call(this.endShow, this);
                    break;
                default:
                    tw = egret.Tween.get(this);
                    tw.wait(80);
                    tw.call(this.endShow, this);
                    break;
            }
        };
        MUIWnd.prototype.endShow = function () {
            this._mActionShow = false;
            this.onShow();
            this.addEvent();
        };
        MUIWnd.prototype.removeChildMask = function () {
            if (this._mUiMask && this._mUiMask.parent)
                this._mUiMask.parent.removeChild(this._mUiMask);
        };
        MUIWnd.prototype.endHide = function () {
            this._mTweenFinish = true;
            this._mActionHide = false;
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            this.removeEvent();
            this.onHide();
        };
        MUIWnd.prototype.hide = function () {
            if (this._mActionHide)
                return;
            if (!this._mInit)
                return;
            egret.Tween.removeTweens(this);
            var tw;
            switch (this._mShowType) {
                case WndShowType.SCALE:
                    this._mActionHide = true;
                    this.scaleX = 1;
                    this.scaleY = 1;
                    tw = egret.Tween.get(this);
                    tw.to({ scaleX: 0.1, scaleY: 0.1 }, 200);
                    tw.call(this.endHide, this);
                    break;
                case WndShowType.DROP:
                case WndShowType.ALPHA:
                    this._mActionHide = true;
                    this.alpha = 1;
                    tw = egret.Tween.get(this);
                    tw.to({ alpha: 0.1 }, 300);
                    tw.call(this.endHide, this);
                    break;
                default:
                    this.endHide();
                    break;
            }
            this.removeChildMask();
        };
        MUIWnd.prototype.addEvent = function () { };
        MUIWnd.prototype.removeEvent = function () { };
        MUIWnd.prototype.onShow = function () { };
        MUIWnd.prototype.onHide = function () { };
        Object.defineProperty(MUIWnd.prototype, "getZZ", {
            /**获取遮罩层 */
            get: function () {
                return this._mUiMask;
            },
            enumerable: true,
            configurable: true
        });
        // /**
        //  * 销毁
        //  * 如需要销毁界面，重写此方法
        //  * 因UI界面会有消失的动画
        //  * 所以destory()必须在动画播放完之后调用
        //  * 最后要手动把单例设成null
        //  */
        // public static destory(){
        // 	GUtil.removeAllChildrens(this);
        // }
        MUIWnd.prototype.showLoadingUI = function () {
            MLoadingUI.getInstance.show();
        };
        MUIWnd.prototype.hideLoadingUI = function () {
            MLoadingUI.getInstance.hide();
        };
        return MUIWnd;
    }(MDisplay.MUISprite));
    MDisplay.MUIWnd = MUIWnd;
    __reflect(MUIWnd.prototype, "MDisplay.MUIWnd");
    var WndShowType;
    (function (WndShowType) {
        WndShowType[WndShowType["NONE"] = 0] = "NONE";
        /** 从上面落下 */
        WndShowType[WndShowType["DROP"] = 1] = "DROP";
        /** 缩放 */
        WndShowType[WndShowType["SCALE"] = 2] = "SCALE";
        /**渐现**/
        WndShowType[WndShowType["ALPHA"] = 3] = "ALPHA";
    })(WndShowType = MDisplay.WndShowType || (MDisplay.WndShowType = {}));
    var MLoadingUI = (function (_super) {
        __extends(MLoadingUI, _super);
        function MLoadingUI() {
            var _this = _super.call(this) || this;
            _this._mLoadingBmp = new egret.Bitmap();
            return _this;
        }
        Object.defineProperty(MLoadingUI, "getInstance", {
            get: function () {
                if (MLoadingUI._mInstance == undefined)
                    MLoadingUI._mInstance = new MLoadingUI();
                return MLoadingUI._mInstance;
            },
            enumerable: true,
            configurable: true
        });
        MLoadingUI.prototype.show = function () {
            if (this._mLoadingBmp.$bitmapData == undefined)
                this._mLoadingBmp.$bitmapData = GResCache.getRes('resource/assets/egret_icon.png');
            GUIManager.getInstance.topLay.addChild(this._mLoadingBmp);
            if (this.stage != null) {
                this._mLoadingBmp.x = (this.stage.stageWidth - this._mLoadingBmp.width) * 0.5;
                this._mLoadingBmp.y = (this.stage.stageHeight - this._mLoadingBmp.height) * 0.5;
            }
        };
        MLoadingUI.prototype.hide = function () {
            if (this._mLoadingBmp.parent != null)
                this._mLoadingBmp.parent.removeChild(this._mLoadingBmp);
        };
        return MLoadingUI;
    }(MDisplay.MUISprite));
    MDisplay.MLoadingUI = MLoadingUI;
    __reflect(MLoadingUI.prototype, "MDisplay.MLoadingUI");
})(MDisplay || (MDisplay = {}));
var GHttpMager = (function () {
    function GHttpMager() {
        this._mSendingMap = {};
    }
    Object.defineProperty(GHttpMager, "getInstance", {
        get: function () {
            if (GHttpMager._mInstance == undefined)
                GHttpMager._mInstance = new GHttpMager();
            return GHttpMager._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 发送HTTP请求
     * @param	url				HTTP请求地址
     * @param	parameters		HTTP请求参数 不带?号 多个参数用&分开  例a=1&b=2
     * @param	callFun			HTTP请求回调方法  该回调方法返回三个参数 res:boolean//请求结果true:成功 false:请求失败,httpObj:egret.HttpRequest //HTTP对象 ,data:any//程序要求原样返回的数据内容
     * @param	thisObj			回调方法用到的This对象
     * @param	data			请求回调原样回调的数据对象
     * @param	method			请求类型 egret.HttpMethod.GET /egret.HttpMethod.POST
     * @param	datatype		请求结果数据内容egret.HttpResponseType.TEXT:文本 / egret.HttpResponseType.ARRAY_BUFFER:二进制
     */
    GHttpMager.prototype.GaddHttpSend = function (url, parameters, callFun, thisObj, data, method, datatype) {
        if (data === void 0) { data = null; }
        if (method === void 0) { method = egret.HttpMethod.GET; }
        if (datatype === void 0) { datatype = egret.HttpResponseType.TEXT; }
        var httpObj = new egret.HttpRequest();
        httpObj.responseType = datatype;
        url = method == egret.HttpMethod.GET ? url + '?' + parameters : url;
        httpObj.open(url, method);
        httpObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this._mSendingMap[httpObj.hashCode] = { cf: callFun, to: thisObj, d: data };
        if (method == egret.HttpMethod.GET)
            httpObj.send();
        else
            httpObj.send(parameters);
        httpObj.addEventListener(egret.Event.COMPLETE, this.onHttpComplete, this);
        httpObj.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onHttpError, this);
    };
    GHttpMager.prototype.onHttpComplete = function (e) {
        this.callFun(e.currentTarget, true);
    };
    GHttpMager.prototype.onHttpError = function (e) {
        this.callFun(e.currentTarget, false);
    };
    GHttpMager.prototype.callFun = function (httpobj, res) {
        var callObj = this._mSendingMap[httpobj.hashCode];
        if (callObj != undefined) {
            var callFun = callObj['cf'];
            if (callFun != undefined && callObj['to'] != undefined) {
                callFun.call(callObj['to'], res, httpobj, callObj['d']);
            }
            delete this._mSendingMap[httpobj.hashCode];
        }
    };
    return GHttpMager;
}());
__reflect(GHttpMager.prototype, "GHttpMager");
var MDisplay;
(function (MDisplay) {
    var GMaskObj = (function (_super) {
        __extends(GMaskObj, _super);
        function GMaskObj(width, height) {
            var _this = _super.call(this) || this;
            _this.setRec(width, height);
            return _this;
        }
        GMaskObj.prototype.setRec = function (width, height) {
            this._width = width;
            this._height = height;
            this.graphics.clear();
            this.graphics.beginFill(0xffffff, 1);
            this.graphics.drawRect(0, 0, this._width, this._height);
            this.graphics.endFill();
        };
        return GMaskObj;
    }(egret.Shape));
    MDisplay.GMaskObj = GMaskObj;
    __reflect(GMaskObj.prototype, "MDisplay.GMaskObj");
})(MDisplay || (MDisplay = {}));
var MNet;
(function (MNet) {
    var MSocketer = (function () {
        function MSocketer(url, handle) {
            this._mUrl = url;
            this._mHandle = handle;
            this._mCacheArr = new Array();
            this.connect();
        }
        MSocketer.prototype.sendByteArray = function (data) {
            this._mCacheArr.push(data);
            if (this.checkSocket() == false) {
                // this.connect();
                this._mHandle.closeCall();
            }
            else {
                this.write2Socket();
            }
        };
        MSocketer.prototype.write2Socket = function () {
            while (this.checkSocket() && this._mCacheArr.length > 0) {
                var temp = this._mCacheArr.shift();
                this._mSocket.writeBytes(temp);
                this._mSocket.flush();
            }
        };
        MSocketer.prototype.checkSocket = function () {
            if (this._mSocket == undefined || this._mSocket.connected === false)
                return false;
            return true;
        };
        MSocketer.prototype.connect = function () {
            if (this._mSocket == undefined) {
                this._mSocket = new egret.WebSocket();
                this._mSocket.type = egret.WebSocket.TYPE_BINARY;
                if (this._mSocket.hasEventListener(egret.Event.CONNECT) == false) {
                    this._mSocket.addEventListener(egret.Event.CONNECT, this.onComplete, this);
                    this._mSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
                    this._mSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
                    this._mSocket.addEventListener(egret.Event.CLOSE, this.onClose, this);
                }
            }
            if (this._mSocket.connected === false)
                this._mSocket.connectByUrl(this._mUrl);
        };
        MSocketer.prototype.onClose = function (e) {
            egret.log("---------socket主动断开了-----------");
            this._mHandle.closeCall();
        };
        MSocketer.prototype.onComplete = function (e) {
            egret.log("成功连接服务器:" + this._mUrl);
            this._mHandle.completeCall();
        };
        MSocketer.prototype.onError = function (e) {
            egret.log("---------socket连接服务器IO错误------------");
            // if (this._mCacheArr.length > 0) {
            // 	this.connect();
            // }
        };
        MSocketer.prototype.onData = function (e) {
            var byteArr = new egret.ByteArray;
            this._mSocket.readBytes(byteArr);
            this._mHandle.handlePro(byteArr);
        };
        /**断开连接 */
        MSocketer.prototype.closeSocket = function () {
            this._mSocket.close;
        };
        /**重新连接 */
        MSocketer.prototype.connectSocket = function () {
            this.connect();
        };
        /**清空所有发送协议 */
        MSocketer.prototype.cleanCacheArr = function () {
            this._mCacheArr.splice(0, this._mCacheArr.length);
        };
        return MSocketer;
    }());
    MNet.MSocketer = MSocketer;
    __reflect(MSocketer.prototype, "MNet.MSocketer");
})(MNet || (MNet = {}));
var GLoadModule = (function () {
    function GLoadModule() {
        this._mLoadArr = new Array();
        this._mLoadSheetArr = new Array();
    }
    GLoadModule.prototype.GaddItem = function (Url) {
        if (GResCache.getRes(Url) != null)
            return;
        this._mLoadArr.push(Url);
    };
    GLoadModule.prototype.GaddGroupRes = function (groupName, type) {
        if (type != undefined && type == GLoadModule.GroupType_SheetFlash) {
            this._mLoadSheetArr.push(GSheet.pathSheetFlash + groupName);
        }
        else if (type != undefined && type == GLoadModule.GroupType_SheetUI) {
            this._mLoadSheetArr.push(GSheet.pathSheetUI + groupName);
        }
        else {
            var data = GResCache.getResGroupConfig(groupName);
            if (data == null) {
                egret.error('加载组资源时出错 不存在对应命名的配置:' + groupName);
                return false;
            }
            var images = data['images'];
            var baseUrl = data['base'];
            for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                var image = images_1[_i];
                this.GaddItem(baseUrl + image);
            }
            if (type == GLoadModule.GroupType_UI) {
                this.GaddItem(MDisplay.MUISprite.UIConfigUrl + groupName);
            }
            else if (type == GLoadModule.GroupType_Flash)
                this.GaddItem(MDisplay.MMovieClipData.configFileBaseUrl + groupName);
        }
        return true;
    };
    GLoadModule.prototype.removeItem = function (Url) {
        var index = this._mLoadArr.indexOf(Url);
        if (index > -1)
            this._mLoadArr.splice(index, 1);
    };
    /**移除大图列表 */
    GLoadModule.prototype.removeSheetItem = function (Url) {
        Url = Url.replace(GLoadModule.loadBaseUrl, '');
        var index = this._mLoadSheetArr.indexOf(Url);
        if (index > -1)
            this._mLoadSheetArr.splice(index, 1);
    };
    GLoadModule.prototype.Gbegin = function (callFun, thisObj) {
        this._mCallBackFun = callFun;
        this._mThisObj = thisObj;
        this._mLoadTotal = this._mLoadArr.length + this._mLoadSheetArr.length;
        if (this._mLoadTotal == 0) {
            this._mCallBackFun.call(this._mThisObj);
            return;
        }
        this.loadSheet();
    };
    /**优先处理 预加载大图 */
    GLoadModule.prototype.loadSheet = function () {
        var total = 0;
        for (var _i = 0, _a = this._mLoadSheetArr; _i < _a.length; _i++) {
            var temp = _a[_i];
            GSheet.getInstance().getResByUrl(temp, this.onLoadSheet, this);
            total++;
        }
        if (total == 0)
            this.checkIsEndSheet();
    };
    /**大图加载完毕 回调*/
    GLoadModule.prototype.onLoadSheet = function (data, url) {
        if (data == undefined)
            return;
        if (url.indexOf("flash") >= 0) {
            //存储大图
            for (var key in data._textureMap) {
                GSheet.getInstance().saveFlash(key, data._textureMap[key]);
            }
        }
        if (url.indexOf("ui") >= 0) {
            //存储大图
            for (var key in data._textureMap) {
                GSheet.getInstance().saveUi(key, data._textureMap[key]);
            }
        }
        this.removeSheetItem(url);
        this.checkIsEndSheet();
    };
    /**大图加载完毕检测 */
    GLoadModule.prototype.checkIsEndSheet = function () {
        if (this._mLoadSheetArr.length <= 0 && this._mCallBackFun !== undefined) {
            this.loadOrdinary();
        }
    };
    /**普通加载 */
    GLoadModule.prototype.loadOrdinary = function () {
        var total = 0;
        var temp;
        for (var i = this._mLoadArr.length - 1; i >= 0; i--) {
            temp = this._mLoadArr[i];
            if (GResCache.getRes(temp) != null) {
                this.removeItem(temp);
            }
            else {
                GResCache.loadResByUrl(temp, this.onLoaded, this);
                total++;
            }
        }
        if (total == 0)
            this.checkIsEnd();
    };
    GLoadModule.prototype.onLoaded = function (data, url) {
        if (data == undefined)
            return;
        url = url.replace(GLoadModule.loadBaseUrl, '');
        this.removeItem(url);
        this.checkIsEnd();
    };
    GLoadModule.prototype.checkIsEnd = function () {
        if (this._mLoadArr.length <= 0 && this._mCallBackFun !== undefined) {
            this._mLoadTotal = 0;
            this._mCallBackFun.call(this._mThisObj);
        }
    };
    Object.defineProperty(GLoadModule.prototype, "loadTotal", {
        get: function () {
            return this._mLoadTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLoadModule.prototype, "loadOverplus", {
        /**
         * 当前还剩待加载的资源数
        * @returns  		剩待加载的资源数
        */
        get: function () {
            return this._mLoadArr.length + this._mLoadSheetArr.length;
        },
        enumerable: true,
        configurable: true
    });
    GLoadModule.GroupType_UI = 'GroupLoadType_UI';
    GLoadModule.GroupType_Flash = 'GroupLoadType_Flash';
    GLoadModule.GroupType_SheetFlash = 'GroupLoadType_SheetFlash';
    GLoadModule.GroupType_SheetUI = 'GroupLoadType_SheetUI';
    GLoadModule.loadBaseUrl = '';
    return GLoadModule;
}());
__reflect(GLoadModule.prototype, "GLoadModule");
var GResCache = (function () {
    function GResCache() {
    }
    GResCache.init = function () {
        if (GResCache._mInit === false) {
            GResCache._mInit = true;
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, GResCache.onLoadError, null);
        }
    };
    GResCache.getResGroupConfig = function (name) {
        if (GResCache.mResGroupConfig == undefined || GResCache.mResGroupConfig[name] == undefined)
            return null;
        return GResCache.mResGroupConfig[name];
    };
    GResCache.onLoadError = function (e) {
        egret.error("加载资源出错:" + e.resItem.name);
    };
    GResCache.loadResByUrl = function (url, callFun, thisObj, type) {
        GResCache.init();
        if (type == undefined) {
            if (GResCache._mTypeConfig[url])
                type = GResCache._mTypeConfig[url];
            else
                type = GResCache.getTypeByUrl(url);
        }
        if (type == '') {
            egret.error("加载资源:" + url + "类型有误");
            return;
        }
        if (GResCache.mIsDeBug)
            egret.log("请求加载游戏资源:" + url);
        GResCache._mTypeConfig[url] = type;
        RES.getResByUrl(GLoadModule.loadBaseUrl + url, callFun, thisObj, type);
    };
    GResCache.delete = function (url) {
        RES.destroyRes(url);
        delete GResCache._mTypeConfig[url];
    };
    GResCache.getRes = function (url, type) {
        url = url.replace(GLoadModule.loadBaseUrl, '');
        var obj = GSheet.getInstance().getRes(url);
        if (obj != undefined) {
            return obj;
        }
        else {
            if (!GResCache._mTypeConfig[url])
                return null;
            if (type == undefined)
                type = GResCache._mTypeConfig[url];
            return this.getEgretRes(url, type);
        }
    };
    GResCache.getEgretRes = function (url, type) {
        if (type == undefined)
            type = this.getTypeByUrl(url);
        var mag = RES.getAnalyzer(type);
        var res = mag.getRes(url);
        if (res != undefined)
            return res;
        return mag.getRes(GLoadModule.loadBaseUrl + url);
    };
    GResCache.getTypeByUrl = function (url) {
        var index = url.lastIndexOf('.');
        if (index == -1)
            return '';
        var type = url.slice(index + 1);
        if (type == 'json')
            return RES.ResourceItem.TYPE_JSON;
        else if (type == 'png' || type == 'jpg')
            return RES.ResourceItem.TYPE_IMAGE;
        else if (type == 'fnt')
            return RES.ResourceItem.TYPE_FONT;
        else if (type == 'mp3' || type == 'wav')
            return RES.ResourceItem.TYPE_SOUND;
        return '';
    };
    GResCache._mTypeConfig = {};
    GResCache._mInit = false;
    GResCache.mIsDeBug = true;
    return GResCache;
}());
__reflect(GResCache.prototype, "GResCache");
/**大图加载器 */
var GSheet = (function () {
    function GSheet() {
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onLoadError, null);
        this.flashMap = new GHashMap();
        this.uiMap = new GHashMap();
    }
    GSheet.getInstance = function () {
        if (GSheet._mInstance == null) {
            GSheet._mInstance = new GSheet();
        }
        return GSheet._mInstance;
    };
    /**存储flash大图 */
    GSheet.prototype.saveFlash = function (key, texture) {
        this.flashMap.Gput(key, texture);
    };
    /**存储flash大图 */
    GSheet.prototype.saveUi = function (key, texture) {
        this.uiMap.Gput(key, texture);
    };
    GSheet.prototype.onLoadError = function (e) {
        egret.error("加载大图出错:" + e.resItem.name);
    };
    /**大图预加载 */
    GSheet.prototype.getResByUrl = function (groupName, callFun, thisObj, type) {
        if (GResCache.mIsDeBug)
            egret.log("请求加载游戏资源:" + groupName);
        RES.getResByUrl(GLoadModule.loadBaseUrl + groupName, callFun, thisObj, RES.ResourceItem.TYPE_SHEET);
    };
    /**获取大图资源 */
    GSheet.prototype.getRes = function (url) {
        var index = url.lastIndexOf('/');
        var textrueName = url.slice(index + 1).split(".")[0];
        if (index == -1) {
            return null;
        }
        if (url.indexOf("flash") >= 0 && this.flashMap.GhasKey(textrueName)) {
            return this.flashMap.Gget(textrueName);
        }
        else if (this.uiMap.GhasKey(textrueName)) {
            return this.uiMap.Gget(textrueName);
        }
        else {
            return null;
        }
    };
    GSheet._mInstance = null;
    /**默认路径 */
    GSheet.pathSheetFlash = "resource/assets/images/sheet/flash/";
    GSheet.pathSheetUI = "resource/assets/images/sheet/ui/";
    return GSheet;
}());
__reflect(GSheet.prototype, "GSheet");
/**Base64加解密 */
var Base64 = (function () {
    function Base64() {
        this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    }
    Object.defineProperty(Base64, "getInstance", {
        get: function () {
            if (Base64._mInstance == undefined)
                Base64._mInstance = new Base64();
            return Base64._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**Base64加密 */
    Base64.prototype.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this.utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    };
    /**Base64解密 */
    Base64.prototype.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this.utf8_decode(output);
        return output;
    };
    Base64.prototype.utf8_encode = function (str) {
        str = str.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < str.length; n++) {
            var c = str.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    Base64.prototype.utf8_decode = function (utftext) {
        var str = "";
        var i = 0;
        var c, c1, c2;
        c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                str += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                var c3 = utftext.charCodeAt(i + 2);
                str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return str;
    };
    return Base64;
}());
__reflect(Base64.prototype, "Base64");
var BigNumber = (function () {
    function BigNumber() {
    }
    Object.defineProperty(BigNumber, "zero", {
        get: function () {
            var temp = new BigNumber();
            temp.init(0, 1);
            return temp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigNumber, "ten", {
        get: function () {
            if (BigNumber._ten != null)
                return BigNumber._ten;
            BigNumber._ten = new BigNumber();
            BigNumber._ten.init(10, 2);
            return BigNumber._ten;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigNumber, "max", {
        get: function () {
            if (BigNumber._max != null)
                return BigNumber._max;
            BigNumber._max = new BigNumber();
            BigNumber._max.init(999999999, 1000);
            return BigNumber._max;
        },
        enumerable: true,
        configurable: true
    });
    BigNumber.getBigNum = function (value, len) {
        if (len <= 0)
            return BigNumber.zero;
        var temp = new BigNumber();
        temp.init(value, len);
        return temp;
    };
    BigNumber.getBigNumByStr = function (str) {
        var temp = new BigNumber();
        temp.initByStr(str);
        return temp;
    };
    BigNumber.prototype.init = function (value, len) {
        this._value = Math.floor(value);
        this._len = len;
    };
    BigNumber.prototype.initByStr = function (str) {
        this._len = str.length;
        if (this._len <= 9)
            this._value = Number(str);
        else
            this._value = Number(str.slice(0, 9));
    };
    /**
     * 与目标对象比较大小 当前对象大于目标对象 返回1  相等返回0 否则返回 -1
     */
    BigNumber.prototype.compareTo = function (res) {
        if (this._len == res._len && this._value == res._value)
            return 0;
        if (this._len > res._len || (this._len == res._len && this._value > res._value))
            return 1;
        return -1;
    };
    /**将目标对象赋值于自身 */
    BigNumber.prototype.write = function (v) {
        this._value = v._value;
        this._len = v._len;
    };
    /**复制当前对象有值生成新的对象 */
    BigNumber.prototype.clone = function () {
        var temp = new BigNumber();
        temp._value = this._value;
        temp._len = this._len;
        return temp;
    };
    BigNumber.prototype.add = function (res) {
        if (this.compareTo(res) == -1) {
            BigNumber._temp.write(this);
            this.write(res);
            res = BigNumber._temp;
        }
        var len = this._len;
        var value = this._value;
        if ((this._len <= 9 && res._len <= 9) || this._len == res._len) {
            this._value += res._value;
            this.repair(len, value);
        }
        else if (this._len >= (res._len + 9)) {
            return;
        }
        else if (this._len <= (res._len - 9)) {
            this._len = res._len;
            this._value = res._value;
            return;
        }
        else {
            var l = Math.abs(len - this._value.toString().length - (res._len - res._value.toString().length));
            var cv = this._value, resv = res._value;
            if (len > res._len) {
                resv = res._value / Math.pow(10, l);
            }
            else {
                cv = this._value / Math.pow(10, l);
            }
            this._value = cv + resv;
            this.repair(len, value);
        }
    };
    BigNumber.prototype.sub = function (res) {
        if (this.compareTo(res) <= 0) {
            this._len = 1;
            this._value = 0;
            return;
        }
        if ((this._len - res._len) >= 9)
            return;
        var len = this._len;
        var value = this._value;
        var subL = this._len - this._value.toString().length - (res._len - res._value.toString().length);
        var resv = res._value;
        if (subL > 0) {
            resv = res._value / Math.pow(10, subL);
        }
        this._value -= resv;
        this.repair(len, value);
    };
    BigNumber.prototype.mult = function (res) {
        if (res.compareTo(BigNumber._zero) <= 0) {
            this._len = 1;
            this._value = 0;
            return;
        }
        var len = this._len;
        var value = this._value;
        this._len += (res._len - Math.floor(res._value).toString().length);
        this._value = Math.floor(this._value * res._value);
        this.repair(len, value);
    };
    BigNumber.prototype.sqrt = function () {
        if (this._len <= 9) {
            this.initByStr(Math.floor(Math.sqrt(this._value)).toString());
            return;
        }
        var len = this._len - 9;
        var isOdd = !((len % 2) == 0);
        len = (isOdd ? len - 1 : len) / 2;
        var value = isOdd ? this._value * 10 : this._value;
        value = Math.sqrt(value);
        var newLen = Math.floor(value).toString().length;
        if (len <= (9 - newLen)) {
            value *= Math.pow(10, len);
            this.initByStr(Math.floor(value).toString());
            return;
        }
        else {
            len -= (9 - newLen);
            value *= Math.pow(10, 9 - newLen);
            this.init(value, len + 9);
        }
    };
    BigNumber.prototype.multFromNum = function (value) {
        value = Math.floor(value);
        var temp = BigNumber._temp;
        if (value > 999999999)
            temp.initByStr(value.toString(10));
        else
            temp.init(value, value.toString(10).length);
        this.mult(temp);
    };
    BigNumber.prototype.divFromNum = function (value) {
        value = Math.floor(value);
        var temp = BigNumber._temp;
        if (value > 999999999)
            temp.initByStr(value.toString(10));
        else
            temp.init(value, value.toString(10).length);
        this.div(temp);
    };
    BigNumber.prototype.div = function (res) {
        if (res.compareTo(BigNumber._zero) <= 0) {
            this._len = this._value = 0;
            return;
        }
        var len = this._len;
        var value = this._value;
        var cl = this._len - this._value.toString(10).length - (res._len - res._value.toString(10).length);
        var div = this._value / res._value;
        if (div < 1) {
            var y = cl <= 9 ? cl : 9;
            div *= Math.pow(10, y);
            cl -= y;
        }
        else if (div < 100000000 && cl > 0) {
            var temp = Math.floor(div).toString(10).length;
            var y = cl <= (9 - temp) ? cl : (9 - temp);
            div *= Math.pow(10, y);
            cl -= y;
        }
        div = Math.floor(div);
        this._len = cl + div.toString(10).length;
        this._value = div;
        //this.repair(len,value);
    };
    BigNumber.pow = function (x, y) {
        var addV = BigNumber._powAddv;
        var resV = BigNumber._powRes;
        resV.init(1, 1);
        addV.init(0, 1);
        if (x >= BigNumber.powMaxNum) {
            egret.error("求次幂的原值不得大于999999999");
        }
        var total = 0;
        var ct = x;
        while (true) {
            ct = x;
            total++;
            for (; total < y;) {
                ct *= x;
                total++;
                if (ct >= 999999999999999999)
                    break;
            }
            addV.initByStr(Math.floor(ct).toString(10));
            if (resV._value == 1)
                resV.write(addV);
            else {
                var fix = Number(ct.toFixed(7)) - Math.floor(ct);
                addV._value += fix;
                resV.mult(addV);
            }
            if (total >= y)
                break;
        }
        return resV;
    };
    BigNumber.prototype.repair = function (oldlen, oldvalue) {
        var cv = this._value = Math.floor(this._value);
        var ol = Math.floor(oldvalue).toString().length;
        var nl = cv.toString().length;
        this._len = this._len - (ol - nl);
        if (nl > 9) {
            this._value = Number(cv.toString().slice(0, 9));
        }
        if (nl < 9 && this._len >= 9) {
            this._value = this._value * Math.pow(10, 9 - nl);
        }
        var valueLen = this._value.toString().length;
        if (valueLen < 9 && valueLen < this._len) {
            this._value *= Math.pow(10, this._len - valueLen);
        }
    };
    Object.defineProperty(BigNumber.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigNumber.prototype, "lenth", {
        get: function () {
            return this._len;
        },
        enumerable: true,
        configurable: true
    });
    BigNumber._ten = null;
    BigNumber._max = null;
    BigNumber._temp = BigNumber.zero;
    BigNumber._zero = BigNumber.zero;
    BigNumber.powMaxNum = 999999999;
    BigNumber._powRes = BigNumber.zero;
    BigNumber._powAddv = BigNumber.zero;
    return BigNumber;
}());
__reflect(BigNumber.prototype, "BigNumber");
/**贝塞尔曲线计算 */
var GBezier = (function () {
    function GBezier() {
        this._point = new egret.Point();
    }
    GBezier.getBezier = function () {
        var obj = GObjPool.getInstance.GgetObj(GBezier);
        if (obj == null)
            obj = new GBezier();
        return obj;
    };
    /**
     * 曲线激活
     * @param p0 开始点坐标
     * @param p1 中间点坐标
     * @param p2 结束点坐标
     * @param time 过程时间
     * @param callFun 执行回调
     * @param thisObj
     */
    GBezier.prototype.tween = function (p0, p1, p2, time, callFun, thisObj) {
        this._point0 = p0;
        this._point1 = p1;
        this._point2 = p2;
        this._callFun = callFun;
        this.factor = 0;
        egret.Tween.get(this).to({ factor: 1 }, time).call(function () {
            GObjPool.getInstance.Gadd2Pool(this);
        });
    };
    Object.defineProperty(GBezier.prototype, "factor", {
        set: function (value) {
            this._point.x = (1 - value) * (1 - value) * this._point0.x + 2 * value * (1 - value) * this._point1.x + value * value * this._point2.x;
            this._point.y = (1 - value) * (1 - value) * this._point0.y + 2 * value * (1 - value) * this._point2.y + value * value * this._point2.y;
            this._callFun.call(this._point);
        },
        enumerable: true,
        configurable: true
    });
    GBezier.prototype.clean = function () {
        egret.Tween.removeTweens(this);
        this._callFun = null;
    };
    return GBezier;
}());
__reflect(GBezier.prototype, "GBezier", ["GIObjPool"]);
var GHashMap = (function () {
    function GHashMap() {
        this._mkeys = [];
    }
    GHashMap.prototype.onAdd = function (key) {
        if (this[key] == undefined) {
            this._mkeys.push(key);
        }
    };
    GHashMap.prototype.onRemove = function (key) {
        if (this[key] != undefined) {
            var index = this._mkeys.indexOf(key);
            if (index > -1)
                this._mkeys.splice(index, 1);
        }
    };
    /**
     * 添加键值对应数据
     * @param key 		添加数据的键
     * @param value		添加数据键对应的值		 *
     */
    GHashMap.prototype.Gput = function (key, value) {
        if (key == undefined)
            return;
        this.onAdd(key);
        this[key] = value;
    };
    /**
     * 查找当前是否存在该键对应的数据
     * @param key		待查找的键值
     * @returns			如果存在则返回TRUE 否则返回FALSE
     */
    GHashMap.prototype.GhasKey = function (key) {
        return this[key] != undefined;
    };
    /**
     * 查找当前是否存在该值
     * @param 		value		待查找的值
     * @returns		如果存在则返回TRUE 否则返回FALSE
     */
    GHashMap.prototype.GhasValue = function (value) {
        if (value == undefined)
            return false;
        for (var _i = 0, _a = this._mkeys; _i < _a.length; _i++) {
            var k = _a[_i];
            if (this[k] == value)
                return true;
        }
        return false;
    };
    /**
     * 根据键移除对应数据
     * @param key		待移除的键值名称
     * @returns			如果移除成功则返回对应的值 否则返回NULL
     */
    GHashMap.prototype.GremoveByKey = function (key) {
        if (this.GhasKey(key) == false)
            return null;
        this.onRemove(key);
        var temp = this[key];
        delete this[key];
        return temp;
    };
    /**
     * 移除指定值
     * @param value		待移除的值对象
     * @returns			移除成功则返回TRUE 否则返回FALSE
     */
    GHashMap.prototype.GremoveByValue = function (value) {
        if (value == undefined)
            return false;
        for (var _i = 0, _a = this._mkeys; _i < _a.length; _i++) {
            var k = _a[_i];
            if (this[k] == value) {
                this.GremoveByKey(k);
                return true;
            }
        }
        return false;
    };
    /**
     * 获取指定键对应的值
     * @param	key		要获得的值对应的键名称
     * @returns			如果当前Map包含指定键值则返回对应值,否则返回Null
     */
    GHashMap.prototype.Gget = function (key) {
        var temp = this[key];
        return temp == undefined ? null : temp;
    };
    Object.defineProperty(GHashMap.prototype, "size", {
        /**
         * 获得当前MAP对象长度
         */
        get: function () {
            return this._mkeys.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GHashMap.prototype, "keys", {
        /**
         * 获得当前MAP的键值数组
         * @returns			当前MAP的键值数组
         */
        get: function () {
            return this._mkeys;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 清除所有
     */
    GHashMap.prototype.clear = function () {
        var keys = this._mkeys;
        var length = keys.length;
        for (var i = length - 1; i >= 0; i--) {
            this.GremoveByKey(keys[i]);
        }
    };
    return GHashMap;
}());
__reflect(GHashMap.prototype, "GHashMap");
var GObjPool = (function () {
    function GObjPool() {
    }
    Object.defineProperty(GObjPool, "getInstance", {
        get: function () {
            if (GObjPool._mInstance == undefined)
                GObjPool._mInstance = new GObjPool();
            return GObjPool._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GObjPool.prototype.Gadd2Pool = function (obj) {
        if (obj == undefined)
            return;
        var type = egret.getQualifiedClassName(obj);
        if (type.length == 0)
            return;
        var arr = this[type];
        if (arr == undefined) {
            arr = new Array();
            this[type] = arr;
        }
        if (GObjPool.mIsCheck) {
            var index = arr.indexOf(obj);
            if (index > -1) {
                egret.error("重复向对象池插入相同对象实例 类型:" + type);
                return;
            }
        }
        if (egret.is(obj, 'GIObjPool')) {
            obj.clean();
        }
        arr.push(obj);
    };
    GObjPool.prototype.GgetObj = function (obj) {
        if (obj == undefined)
            return null;
        var type = egret.getQualifiedClassName(obj);
        if (type.length == 0)
            return null;
        var arr = this[type];
        if (arr == undefined || arr.length <= 0)
            return null;
        return arr.pop();
    };
    /////////////////////////快速从对象池获取对象  如果对象池中没有该对象,则新建
    GObjPool.GgetMCObj = function () {
        var temp = GObjPool.getInstance.GgetObj(MDisplay.MMovieClip);
        if (temp == null)
            temp = new MDisplay.MMovieClip();
        return temp;
    };
    GObjPool.GgetBmObj = function () {
        var temp = GObjPool.getInstance.GgetObj(egret.Bitmap);
        if (temp == null)
            temp = new egret.Bitmap();
        return temp;
    };
    GObjPool.GgetTimerTaskObj = function () {
        var temp = GObjPool.getInstance.GgetObj(MUtils.MTimerTask);
        if (temp == null)
            temp = new MUtils.MTimerTask();
        return temp;
    };
    GObjPool.mIsCheck = true;
    return GObjPool;
}());
__reflect(GObjPool.prototype, "GObjPool");
var GTimerMag = (function () {
    function GTimerMag() {
        this._mLastTime = egret.getTimer();
        this._mTaskMap = new GHashMap();
    }
    Object.defineProperty(GTimerMag, "getInstance", {
        get: function () {
            if (GTimerMag._mInstance == undefined)
                GTimerMag._mInstance = new GTimerMag;
            return GTimerMag._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GTimerMag.prototype.addTimerTask = function (name, total, delayed, callFun, thisObj) {
        var temp = GObjPool.GgetTimerTaskObj();
        temp.Minit(name, total, delayed, callFun, thisObj);
        this._mTaskMap.Gput(name, temp);
    };
    GTimerMag.prototype.GremoveTimerTask = function (name) {
        var temp = this._mTaskMap.GremoveByKey(name);
        if (temp != undefined)
            GObjPool.getInstance.Gadd2Pool(temp);
    };
    GTimerMag.prototype.update = function () {
        this._mCurrTime = egret.getTimer();
        var it = this._mCurrTime - this._mLastTime;
        var keys = this._mTaskMap.keys;
        for (var i = keys.length - 1; i >= 0; i--) {
            var temp = this._mTaskMap.Gget(keys[i]);
            if (temp != undefined)
                temp.Mupdate(it);
        }
        this._mLastTime = this._mCurrTime;
        return it;
    };
    GTimerMag.prototype.getCurrTime = function () {
        return this._mCurrTime;
    };
    return GTimerMag;
}());
__reflect(GTimerMag.prototype, "GTimerMag");
var GTips = (function () {
    function GTips() {
    }
    GTips.confirm = function (massage) {
        return confirm(massage);
    };
    GTips.alert = function (message) {
        alert(message);
    };
    return GTips;
}());
__reflect(GTips.prototype, "GTips");
var GUtil = (function () {
    function GUtil() {
    }
    GUtil.colorMatrixIsNormal = function (arr) {
        if (arr == undefined || arr.length != 8)
            return false;
        if (arr[0] == 1 && arr[1] == 0 && arr[2] == 1 && arr[3] == 0
            && arr[4] == 1 && arr[5] == 0 && arr[6] == 1 && arr[7] == 0)
            return true;
        return false;
    };
    GUtil.to20ColorMatrix = function (arr) {
        if (GUtil.colorMatrixIsNormal(arr) == false)
            return null;
    };
    GUtil.getFileType = function (url) {
        var index = url.lastIndexOf('.');
        if (index == -1)
            return '';
        var type = url.slice(index + 1);
        return type;
    };
    /**
     * 秒数转成时分秒 带前缀0
     * @param sec 	总秒数
     * @returns 秒数换成 00:00:00 格式
     */
    GUtil.secondToDate = function (sec) {
        var h = Math.floor(sec / 3600);
        var m = Math.floor((sec / 60 % 60));
        var s = Math.floor((sec % 60));
        return (h < 10 ? '0' + h : h.toString()) + ':' + (m < 10 ? '0' + m : m.toString()) + ':' + (s < 10 ? '0' + s : s.toString());
    };
    /**
     * 移除显示容器的所有子级
     * @param objContainer
     */
    GUtil.removeAllChildrens = function (objContainer) {
        var obj;
        for (var i = objContainer.numChildren - 1; i >= 0; i--) {
            obj = objContainer.getChildAt(i);
            if (obj instanceof egret.DisplayObject) {
                if (obj.parent != null)
                    obj.parent.removeChild(obj);
            }
            if (obj instanceof egret.DisplayObjectContainer) {
                this.removeAllChildrens(obj);
            }
        }
    };
    /**滤镜：发亮（底） */
    GUtil.COLOR_FILTER_LIGHT = new egret.ColorMatrixFilter([
        1, 0, 0, 0, 50,
        0, 1, 0, 0, 50,
        0, 0, 1, 0, 50,
        0, 0, 0, 1, 0
    ]);
    /**滤镜：发亮（高） */
    GUtil.COLOR_FILTER_LIGHT3 = new egret.ColorMatrixFilter([
        1, 0, 0, 0, 120,
        0, 1, 0, 0, 120,
        0, 0, 1, 0, 120,
        0, 0, 0, 1, 0
    ]);
    /**滤镜：暗化 */
    GUtil.COLOR_FILTER_DARK = new egret.ColorMatrixFilter([
        0.3, 0, 0, 0, 0,
        0, 0.3, 0, 0, 0,
        0, 0, 0.3, 0, 0,
        0, 0, 0, 1, 0
    ]);
    /**滤镜：灰化 */
    GUtil.COLOR_FILTER_GRAY = new egret.ColorMatrixFilter([
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ]);
    return GUtil;
}());
__reflect(GUtil.prototype, "GUtil");
var GUtilMath = (function () {
    function GUtilMath() {
    }
    /**
     * 求两点间距离
     * @param x1	起始点X坐标
     * @param y1	起始点Y坐标
     * @param x2	结束点X坐标
     * @param y2	结束点Y坐标
     * @return		返回二点之间线段的长度
     */
    GUtilMath.getDistance = function (x1, y1, x2, y2) {
        var x = x1 - x2;
        var y = y1 - y2;
        return Math.sqrt(x * x + y * y);
    };
    /** 角度换弧度
     * @param angle 角度
     * @return		角度转换成的弧度值
     */
    GUtilMath.angle2Radian = function (angle) {
        return (angle * Math.PI) / 180;
    };
    /** 获取两点角度
     * @param x1  	起点X坐标
     * @param y1	起点Y坐标
     * @param x2 	结束点X坐标
     * @param y2	结束点Y坐标
     * @return		获得两点连线角度
     */
    GUtilMath.getAngle = function (x1, y1, x2, y2) {
        return Math.atan2(y2 - x1, x2 - y1);
    };
    /**
     * 在线段上根据长度取点坐标
     * @param x1  	起点X坐标
     * @param y1	起点Y坐标
     * @param x2 	结束点X坐标
     * @param y2	结束点Y坐标
     * @param len	距离起点的长度
     * @return		返回该长度在线段上的坐标点
     */
    GUtilMath.getLenByLine = function (x1, y1, x2, y2, len) {
        var angle = GUtilMath.getAngle(x2, y2, x1, x2);
        GUtilMath.TempPoint.y = (Math.sin(angle) * len) + y1;
        GUtilMath.TempPoint.x = Math.cos(angle) * len + x1;
        return GUtilMath.TempPoint;
    };
    /**获取min-max的随机数
     * @param min 起始数 从哪个数开始
     * @param max 结束数 到哪个数结束
     */
    GUtilMath.randomNum = function (min, max) {
        var c = max - min + 1;
        return Math.floor(Math.random() * c + min);
    };
    GUtilMath.TempPoint = new egret.Point();
    return GUtilMath;
}());
__reflect(GUtilMath.prototype, "GUtilMath");
/**MD5加密 */
var MD5 = (function () {
    function MD5() {
    }
    Object.defineProperty(MD5, "getInstance", {
        get: function () {
            if (MD5._mInstance == undefined)
                MD5._mInstance = new MD5();
            return MD5._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    MD5.prototype.safe_add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    MD5.prototype.rol = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    };
    /*
     * These functions implement the four basic operations the algorithm uses.
     */
    MD5.prototype.cmn = function (q, a, b, x, s, t) {
        return this.safe_add(this.rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
    };
    MD5.prototype.ff = function (a, b, c, d, x, s, t) {
        return this.cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    MD5.prototype.gg = function (a, b, c, d, x, s, t) {
        return this.cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    MD5.prototype.hh = function (a, b, c, d, x, s, t) {
        return this.cmn(b ^ c ^ d, a, b, x, s, t);
    };
    MD5.prototype.ii = function (a, b, c, d, x, s, t) {
        return this.cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    /*
     * Calculate the MD5 of an array of little-endian words, producing an array
     * of little-endian words.
     */
    MD5.prototype.coreMD5 = function (x) {
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = this.ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = this.ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = this.ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = this.ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = this.ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = this.ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = this.ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = this.ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = this.ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = this.ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = this.ff(c, d, a, b, x[i + 10], 17, -42063);
            b = this.ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = this.ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = this.ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = this.ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = this.ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = this.gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = this.gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = this.gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = this.gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = this.gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = this.gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = this.gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = this.gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = this.gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = this.gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = this.gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = this.gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = this.gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = this.gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = this.gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = this.gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = this.hh(a, b, c, d, x[i + 5], 4, -378558);
            d = this.hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = this.hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = this.hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = this.hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = this.hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = this.hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = this.hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = this.hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = this.hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = this.hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = this.hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = this.hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = this.hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = this.hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = this.hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = this.ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = this.ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = this.ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = this.ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = this.ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = this.ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = this.ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = this.ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = this.ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = this.ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = this.ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = this.ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = this.ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = this.ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = this.ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = this.ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
        }
        return [a, b, c, d];
    };
    MD5.prototype.binl2hex = function (binarray) {
        var hex_tab = "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    };
    MD5.prototype.binl2b64 = function (binarray) {
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var str = "";
        for (var i = 0; i < binarray.length * 32; i += 6) {
            str += tab.charAt(((binarray[i >> 5] << (i % 32)) & 0x3F) |
                ((binarray[i >> 5 + 1] >> (32 - i % 32)) & 0x3F));
        }
        return str;
    };
    MD5.prototype.str2binl = function (str) {
        var nblk = ((str.length + 8) >> 6) + 1; // number of 16-word blocks    
        var blks = new Array(nblk * 16);
        for (var i = 0; i < nblk * 16; i++)
            blks[i] = 0;
        for (var i = 0; i < str.length; i++)
            blks[i >> 2] |= (str.charCodeAt(i) & 0xFF) << ((i % 4) * 8);
        blks[i >> 2] |= 0x80 << ((i % 4) * 8);
        blks[nblk * 16 - 2] = str.length * 8;
        return blks;
    };
    MD5.prototype.strw2binl = function (str) {
        var nblk = ((str.length + 4) >> 5) + 1; // number of 16-word blocks    
        var blks = new Array(nblk * 16);
        for (var i = 0; i < nblk * 16; i++)
            blks[i] = 0;
        for (var i = 0; i < str.length; i++)
            blks[i >> 1] |= str.charCodeAt(i) << ((i % 2) * 16);
        blks[i >> 1] |= 0x80 << ((i % 2) * 16);
        blks[nblk * 16 - 2] = str.length * 16;
        return blks;
    };
    MD5.prototype.hexMD5 = function (str) { return this.binl2hex(this.coreMD5(this.str2binl(str))); };
    MD5.prototype.hexMD5w = function (str) { return this.binl2hex(this.coreMD5(this.strw2binl(str))); };
    MD5.prototype.b64MD5 = function (str) { return this.binl2b64(this.coreMD5(this.str2binl(str))); };
    MD5.prototype.b64MD5w = function (str) { return this.binl2b64(this.coreMD5(this.strw2binl(str))); };
    MD5.prototype.calcMD5 = function (str) { return this.binl2hex(this.coreMD5(this.str2binl(str))); };
    return MD5;
}());
__reflect(MD5.prototype, "MD5");
var MUtils;
(function (MUtils) {
    var MTimerTask = (function () {
        function MTimerTask() {
        }
        MTimerTask.prototype.Minit = function (name, total, delayed, callFun, thisObj) {
            this.mName = name;
            this.mTotal = total;
            this._mDeplete = this._mDelayed = delayed;
            this._mCallFun = callFun;
            this._mThisObj = thisObj;
            this.mCurrentTime = 0;
        };
        MTimerTask.prototype.Mupdate = function (it) {
            this._mDeplete -= it;
            if (this._mDeplete <= 0) {
                this.mCurrentTime++;
                this._mCallFun.call(this._mThisObj, this);
                this._mDeplete = this._mDelayed;
                if (this.mCurrentTime >= this.mTotal)
                    GTimerMag.getInstance.GremoveTimerTask(this.mName);
            }
        };
        MTimerTask.prototype.clean = function () {
        };
        return MTimerTask;
    }());
    MUtils.MTimerTask = MTimerTask;
    __reflect(MTimerTask.prototype, "MUtils.MTimerTask", ["GIObjPool"]);
})(MUtils || (MUtils = {}));
