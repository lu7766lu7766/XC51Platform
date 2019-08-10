declare namespace MDisplay {
    class MUISprite extends egret.DisplayObjectContainer {
        static readonly UIConfigUrl: string;
        static readonly UIImageUrl: string;
        private _mLoadMod;
        private _mUIConfigUrl;
        protected _mInit: boolean;
        protected _mPater: egret.DisplayObjectContainer;
        constructor();
        protected beforeLoad(url: string, type?: string): void;
        GinitUIConfig(url: string): void;
        private onLoadedItems();
        private initUI();
        protected onInit(): void;
    }
}
declare class GSocketMager {
    private static _mInstance;
    static readonly getInstance: GSocketMager;
    private _mSocketMap;
    private constructor();
    createSocket(url: string, handle: GISocketHandle, id?: number): void;
    sendByteArr(Ba: egret.ByteArray, id?: number): void;
    /**断开连接 */
    closeSocket(id?: number): void;
    /**重新连接 */
    connectSocket(id?: number): void;
    /**清空发送缓存协议 */
    cleanCacheArr(id?: number): void;
}
declare class GMovieClipEvent {
    static readonly loadedConfig: string;
    static readonly played: string;
    static readonly playing: string;
}
declare class GMovieMag {
    private static _mInstance;
    static readonly getInstance: GMovieMag;
    /**动画配置数据列表 */
    private _mConfigDataMap;
    /**每帧更新的MC列表 */
    private _mEnterFrameItems;
    private constructor();
    GonEnterFrame(): void;
    Madd2EnterFrame(mc: MDisplay.MMovieClip): void;
    MremoveEnterFrame(mc: MDisplay.MMovieClip): void;
    /**
     * 获取MC对象
     * @param 	url				MC动画配置文件名 不包含.json后缀名
     * @param	start			动画开始帧数 如果设置为0 则默认从动画第一帧开始播放
     * @param	end				动画结束帧数 如果设置为0 则默认完全播放结束
     * @param	isloop			动画是否循环播放
     * @param	isAutoClean		动画播放完后 是否自动添加到对象池
     * @returns					最终MC结果对象
     */
    GgetMovieClip(url: string, start?: number, end?: number, isloop?: boolean, isAutoClean?: boolean): MDisplay.MMovieClip;
}
declare namespace MDisplay {
    class GParticle extends egret.Sprite {
        private _xMin;
        private _xMax;
        private _YMin;
        private _YMax;
        private _AlphaMin;
        private _AlphaMax;
        private _scaleXMin;
        private _scaleXMax;
        private _scaleYMin;
        private _scaleYMax;
        private _xResMin;
        private _xResMax;
        private _YResMin;
        private _YResMax;
        private _AlphaResMin;
        private _AlphaResMax;
        private _scaleXResMin;
        private _scaleXResMax;
        private _scaleYResMin;
        private _scaleYResMax;
        private _lifeMin;
        private _lifeMax;
        private _interval;
        private _Max;
        private _texture;
        private _lastAddTime;
        private _itemArr;
        private _pause;
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
        constructor(texture: egret.Texture, lifeMin: number, lifeMax: number, it: number, max: number, xmin: number, xmax: number, xResMin: number, xResMax: number, ymin: number, ymax: number, yResMin: number, yResMax: number, alphaMin: number, alphaMax: number, alphaResMin: number, alphaResMax: number, scaleXMin?: number, scaleXMax?: number, scaleXResMin?: number, scaleXResMax?: number, scaleYMin?: number, scaleYMax?: number, scaleYResMin?: number, scaleYResMax?: number);
        private onEnterFrame(e);
        private add(ct);
        private update(ct);
        setPause(pause: boolean): void;
        readonly pause: boolean;
        clear(): void;
    }
}
declare class GUIManager extends egret.DisplayObjectContainer {
    private static _mInstance;
    static readonly getInstance: GUIManager;
    private readonly _mUITop;
    private readonly _mUITips;
    private readonly _mUIBg;
    private readonly _mUIMost;
    private constructor();
    readonly bgLay: egret.DisplayObjectContainer;
    readonly topLay: egret.DisplayObjectContainer;
    readonly tipLay: egret.DisplayObjectContainer;
    readonly mostLay: egret.DisplayObjectContainer;
}
declare class GWebUi extends egret.Sprite {
    private static type_text;
    private static type_image;
    static UIWidth: number;
    static UIHeight: number;
    private static _lineSpacing;
    private static _tagStart;
    private static _tagEnd;
    private static _num;
    private static _newLine;
    private static _instance;
    static readonly getInstance: GWebUi;
    private _contents;
    private _url;
    private _scollView;
    private _contentsBox;
    private _fontSize;
    private constructor();
    show(path: string, width: number, height: number, fontSize?: number): void;
    hide(): void;
    private onLoadPath(data);
    private analysis(webStr);
    private addList(str);
    private display();
    private onImageLoaded(data);
    private update();
    private clean();
}
declare namespace MDisplay {
    class MDisplay {
        readonly textureFile: string;
        constructor();
    }
}
declare namespace MDisplay {
    class MDisplayConfig {
        readonly mImagePath: string;
        readonly mBlendName: string;
        readonly mRotation: number;
        readonly mScaleX: number;
        readonly mScaleY: number;
        readonly mX: number;
        readonly mY: number;
        readonly mSkewX: number;
        readonly mSkewY: number;
        readonly mAlpha: number;
        readonly mName: string;
        constructor(path: string, bn: string, r: number, sx: number, sy: number, x: number, y: number, skx: number, sky: number, alpha: number, name: string);
    }
}
declare namespace MDisplay {
    class MFramData {
        private readonly _mIndex;
        private readonly _mEventStr;
        private readonly _mDisplays;
        constructor(index: number, eventStr: string);
        MaddDisplay(sprite: MDisplayConfig): void;
        readonly displays: Array<MDisplayConfig>;
    }
}
declare namespace MDisplay {
    class MMovieClip extends egret.DisplayObjectContainer implements GIObjPool {
        /**动画配置数据 */
        private _mConfigData;
        /**当前动画播放到的帧数 */
        private _mCurrentFramIndex;
        /**手动配置的动画起始帧数 如果为0 表示从第1帧开始播放*/
        private _mStartFrameIndex;
        /**手动配置的动画结束帧数 如果为0 表示播放到原始动画的最后一帧*/
        private _mEndFrameIndex;
        /**动画是否循环播放 */
        private _mIsLoop;
        /**动画播放完后 是否自动清除 */
        private _mAutoClean;
        /**动画当前是否暂停 */
        private _mIsPause;
        /**动画总帧数 */
        private _mTotalFrames;
        constructor();
        MsetConfigData(data: MMovieClipData, start?: number, end?: number, isloop?: boolean, isAutoClean?: boolean): void;
        /**
         * 设置MC对象的相关属性
        * @param	start			动画开始帧数 如果设置为0 则默认从动画第一帧开始播放
        * @param	end				动画结束帧数 如果设置为0 则默认完全播放结束
        * @param	isloop			动画是否循环播放
        * @param	isAutoClean		动画播放完后 是否自动添加到对象池
         */
        GgoToAndPlay(start?: number, end?: number, isloop?: boolean, isAutoClean?: boolean): void;
        /**
         * 暂停动画播放 必须是在动画已经初始化完毕 暂停才有效
         */
        GPause(): void;
        /**
         * 播放动画 必须是在动画已经初始化完毕 播放才有效
         */
        GPlay(): void;
        Mupdate(): void;
        private updateFrameIndex();
        clean(): void;
        readonly mTotalFrames: number;
        readonly mCurrentFramIndex: number;
    }
}
declare namespace MDisplay {
    class MMovieClipData {
        mIsInit: boolean;
        mURL: string;
        mFrameTotal: number;
        private _mLoader;
        private _mIsLoading;
        static readonly configFileBaseUrl: string;
        static readonly imageFileBaseUrl: string;
        private readonly framesArr;
        constructor();
        MloadConfig(url: string): void;
        private onLoadedImage();
        private handleData(data);
        GgetFrameData(index: number): MFramData;
    }
}
declare namespace MDisplay {
    class MParticleData {
        private _lifeTime;
        private _XStep;
        private _YStep;
        private _AlphaStep;
        private _startTime;
        private _scaleXStep;
        private _scaleYStep;
        private _bitMap;
        private _lastTime;
        constructor(texture: egret.Texture, life: number, xstep: number, ystep: number, alphaStep: number, scaleXstep: number, scaleYstep: number);
        init(x: number, y: number, alpha: number, scalex: number, scaley: number): void;
        readonly bitMap: egret.Bitmap;
        update(currentT: number): boolean;
        clean(): void;
    }
}
declare module MDisplay {
    class GButton extends egret.Bitmap {
        private _isAutoZoon;
        private _touchBeginFun;
        private _touchBeginThisObj;
        private _isSetZoon;
        /**
         * 设置位图内容  及是否自动缩放 默认为自动缩放
         */
        constructor(data: any, isAutoZoon?: boolean);
        /**
         * 添加单击事件
         * @param fun:事件回调的方法
         * @param thisObj:事件回调依附的对象
         */
        addTouchBeginEvent(fun: Function, thisObj: any): void;
        private touchEnd(e);
        private onClick(e);
        /**
         * 设置居中缩放锚点
         * 因为锚点跟X Y坐标有关联 如果当前锚点已经居中 则此方法不会做任何修改
         */
        static setZoom(obj: egret.DisplayObject): void;
        /**
         * 缓动缩小 并且设置锚点为正中心
         */
        static minify(obj: egret.DisplayObject): void;
        /**
         * 缓动放大 并且设置锚点为正中心 当缓动结束后 调用指定回调方法
         * @param obj  要进行缓动的显示对象
         * @param fun	缓动结束的回调方法
         * @param funThisObj 回调方法对应的This对象
         * @param data		回调方法需要传递的对象
         */
        static upstep(obj: egret.DisplayObject, fun: Function, funThisObj: any, data?: any): void;
    }
}
declare namespace MDisplay {
    class MUIWnd extends MUISprite {
        private _mWndName;
        private _mShowType;
        /**正在加载界面*/
        private _mLoading;
        /**正在显示缓动*/
        private _mActionShow;
        /**正在隐藏缓动*/
        private _mActionHide;
        /**是否显示加载UI*/
        private _mShowLoadUI;
        /**是否加遮罩 */
        private _mIsOpenMask;
        /**遮罩显示对象 */
        private _mUiMask;
        /**遮罩透明度*/
        private _mMaskAlpha;
        /**遮罩父类 */
        private _mShowParent;
        /**tween 时间是否已结束 */
        private _mTweenFinish;
        constructor();
        GWndConfig(wndName: string, parent: egret.DisplayObjectContainer, showType?: WndShowType, showLoadUI?: boolean, isMask?: boolean): void;
        private loadWndRes();
        protected onInit(): void;
        show(): void;
        /**添加遮罩 */
        private addZH();
        /**
         * 设置遮罩透明度
         * @param val 0- 1  默认 0.5
         */
        setMaskAlpha(val: number): void;
        private actionShow();
        private endShow();
        private removeChildMask();
        private endHide();
        hide(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected onShow(): void;
        protected onHide(): void;
        /**获取遮罩层 */
        readonly getZZ: egret.Bitmap;
        private showLoadingUI();
        private hideLoadingUI();
    }
    enum WndShowType {
        NONE = 0,
        /** 从上面落下 */
        DROP = 1,
        /** 缩放 */
        SCALE = 2,
        /**渐现**/
        ALPHA = 3,
    }
    class MLoadingUI extends MUISprite {
        private static _mInstance;
        static readonly getInstance: MLoadingUI;
        private _mLoadingBmp;
        constructor();
        show(): void;
        hide(): void;
    }
}
declare class GHttpMager {
    private static _mInstance;
    static readonly getInstance: GHttpMager;
    private _mSendingMap;
    private constructor();
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
    GaddHttpSend(url: string, parameters: string, callFun: Function, thisObj: any, data?: any, method?: string, datatype?: string): void;
    private onHttpComplete(e);
    private onHttpError(e);
    private callFun(httpobj, res);
}
interface GISocketHandle {
    handlePro(data: egret.ByteArray): any;
    closeCall(): any;
    completeCall(): any;
}
interface GIProHandle {
    handleData(data: egret.ByteArray): any;
}
declare module MDisplay {
    class GMaskObj extends egret.Shape {
        private _width;
        private _height;
        constructor(width: number, height: number);
        setRec(width: number, height: number): void;
    }
}
declare namespace MNet {
    class MSocketer {
        private _mCacheArr;
        private _mSocket;
        private _mUrl;
        private _mHandle;
        constructor(url: string, handle: GISocketHandle);
        sendByteArray(data: egret.ByteArray): void;
        private write2Socket();
        private checkSocket();
        private connect();
        private onClose(e);
        private onComplete(e);
        private onError(e);
        private onData(e);
        /**断开连接 */
        closeSocket(): void;
        /**重新连接 */
        connectSocket(): void;
        /**清空所有发送协议 */
        cleanCacheArr(): void;
    }
}
declare class GLoadModule {
    static GroupType_UI: string;
    static GroupType_Flash: string;
    static GroupType_SheetFlash: string;
    static GroupType_SheetUI: string;
    static loadBaseUrl: string;
    /**普通加载 */
    private _mLoadArr;
    /**大图加载 */
    private _mLoadSheetArr;
    private _mCallBackFun;
    private _mThisObj;
    private _mLoadTotal;
    constructor();
    GaddItem(Url: string): void;
    GaddGroupRes(groupName: string, type?: string): boolean;
    private removeItem(Url);
    /**移除大图列表 */
    private removeSheetItem(Url);
    Gbegin(callFun: Function, thisObj: any): void;
    /**优先处理 预加载大图 */
    private loadSheet();
    /**大图加载完毕 回调*/
    private onLoadSheet(data, url);
    /**大图加载完毕检测 */
    private checkIsEndSheet();
    /**普通加载 */
    private loadOrdinary();
    private onLoaded(data, url);
    private checkIsEnd();
    readonly loadTotal: number;
    /**
     * 当前还剩待加载的资源数
    * @returns  		剩待加载的资源数
    */
    readonly loadOverplus: number;
}
declare class GResCache {
    private static _mTypeConfig;
    private static _mInit;
    static mIsDeBug: boolean;
    static mResGroupConfig: Object;
    private static init();
    static getResGroupConfig(name: string): Object;
    private static onLoadError(e);
    static loadResByUrl(url: string, callFun: Function, thisObj: any, type?: string): void;
    static delete(url: string): void;
    static getRes(url: string, type?: string): any;
    static getEgretRes(url: string, type?: string): any;
    static getTypeByUrl(url: string): string;
}
/**大图加载器 */
declare class GSheet {
    private static _mInstance;
    static getInstance(): GSheet;
    /**默认路径 */
    static pathSheetFlash: string;
    static pathSheetUI: string;
    /**flash大图缓存图片map */
    private flashMap;
    /**ui大图缓存图片map */
    private uiMap;
    private constructor();
    /**存储flash大图 */
    saveFlash(key: string, texture: egret.Texture): void;
    /**存储flash大图 */
    saveUi(key: string, texture: egret.Texture): void;
    private onLoadError(e);
    /**大图预加载 */
    getResByUrl(groupName: string, callFun: Function, thisObj: any, type?: string): void;
    /**获取大图资源 */
    getRes(url: string): any;
}
/**Base64加解密 */
declare class Base64 {
    private static _mInstance;
    static readonly getInstance: Base64;
    constructor();
    private _keyStr;
    /**Base64加密 */
    encode(input: any): string;
    /**Base64解密 */
    decode(input: any): string;
    private utf8_encode(str);
    private utf8_decode(utftext);
}
declare class BigNumber {
    static readonly zero: BigNumber;
    private static _ten;
    static readonly ten: BigNumber;
    private static _max;
    static readonly max: BigNumber;
    static getBigNum(value: number, len: number): BigNumber;
    static getBigNumByStr(str: string): BigNumber;
    private _value;
    private _len;
    constructor();
    private init(value, len);
    private initByStr(str);
    /**
     * 与目标对象比较大小 当前对象大于目标对象 返回1  相等返回0 否则返回 -1
     */
    compareTo(res: BigNumber): number;
    /**将目标对象赋值于自身 */
    write(v: BigNumber): void;
    /**复制当前对象有值生成新的对象 */
    clone(): BigNumber;
    private static _temp;
    add(res: BigNumber): void;
    sub(res: BigNumber): void;
    private static _zero;
    mult(res: BigNumber): void;
    sqrt(): void;
    multFromNum(value: number): void;
    divFromNum(value: number): void;
    div(res: BigNumber): void;
    private static powMaxNum;
    private static _powRes;
    private static _powAddv;
    static pow(x: number, y: number): BigNumber;
    private repair(oldlen, oldvalue);
    readonly value: number;
    readonly lenth: number;
}
/**贝塞尔曲线计算 */
declare class GBezier implements GIObjPool {
    static getBezier(): GBezier;
    private _point;
    private _point0;
    private _point1;
    private _point2;
    private _callFun;
    constructor();
    /**
     * 曲线激活
     * @param p0 开始点坐标
     * @param p1 中间点坐标
     * @param p2 结束点坐标
     * @param time 过程时间
     * @param callFun 执行回调
     * @param thisObj
     */
    tween(p0: egret.Point, p1: egret.Point, p2: egret.Point, time: number, callFun: Function, thisObj?: any): void;
    private factor;
    clean(): void;
}
declare class GHashMap<V> {
    private readonly _mkeys;
    constructor();
    private onAdd(key);
    private onRemove(key);
    /**
     * 添加键值对应数据
     * @param key 		添加数据的键
     * @param value		添加数据键对应的值		 *
     */
    Gput(key: string | number, value: V): void;
    /**
     * 查找当前是否存在该键对应的数据
     * @param key		待查找的键值
     * @returns			如果存在则返回TRUE 否则返回FALSE
     */
    GhasKey(key: string | number): boolean;
    /**
     * 查找当前是否存在该值
     * @param 		value		待查找的值
     * @returns		如果存在则返回TRUE 否则返回FALSE
     */
    GhasValue(value: V): boolean;
    /**
     * 根据键移除对应数据
     * @param key		待移除的键值名称
     * @returns			如果移除成功则返回对应的值 否则返回NULL
     */
    GremoveByKey(key: string | number): V;
    /**
     * 移除指定值
     * @param value		待移除的值对象
     * @returns			移除成功则返回TRUE 否则返回FALSE
     */
    GremoveByValue(value: V): Boolean;
    /**
     * 获取指定键对应的值
     * @param	key		要获得的值对应的键名称
     * @returns			如果当前Map包含指定键值则返回对应值,否则返回Null
     */
    Gget(key: string | number): V;
    /**
     * 获得当前MAP对象长度
     */
    readonly size: number;
    /**
     * 获得当前MAP的键值数组
     * @returns			当前MAP的键值数组
     */
    readonly keys: Array<string | number>;
    /**
     * 清除所有
     */
    clear(): void;
}
interface GIGameStatus {
    enterStatus(): any;
    update(it: number): any;
    exitStatus(): any;
}
interface GIObjPool {
    clean(): any;
}
declare class GObjPool {
    static mIsCheck: boolean;
    private static _mInstance;
    static readonly getInstance: GObjPool;
    private constructor();
    Gadd2Pool(obj: any): void;
    GgetObj(obj: any): any;
    static GgetMCObj(): MDisplay.MMovieClip;
    static GgetBmObj(): egret.Bitmap;
    static GgetTimerTaskObj(): MUtils.MTimerTask;
}
declare class GTimerMag {
    private static _mInstance;
    static readonly getInstance: GTimerMag;
    private _mTaskMap;
    private _mLastTime;
    private _mCurrTime;
    private constructor();
    addTimerTask(name: string, total: number, delayed: number, callFun: Function, thisObj: any): void;
    GremoveTimerTask(name: string): void;
    update(): number;
    getCurrTime(): number;
}
declare class GTips {
    static confirm(massage: any): boolean;
    static alert(message: any): void;
}
declare class GUtil {
    static colorMatrixIsNormal(arr: Array<number>): boolean;
    static to20ColorMatrix(arr: Array<number>): boolean;
    /**滤镜：发亮（底） */
    static COLOR_FILTER_LIGHT: egret.ColorMatrixFilter;
    /**滤镜：发亮（高） */
    static COLOR_FILTER_LIGHT3: egret.ColorMatrixFilter;
    /**滤镜：暗化 */
    static COLOR_FILTER_DARK: egret.ColorMatrixFilter;
    /**滤镜：灰化 */
    static COLOR_FILTER_GRAY: egret.ColorMatrixFilter;
    static getFileType(url: string): string;
    /**
     * 秒数转成时分秒 带前缀0
     * @param sec 	总秒数
     * @returns 秒数换成 00:00:00 格式
     */
    static secondToDate(sec: number): string;
    /**
     * 移除显示容器的所有子级
     * @param objContainer
     */
    static removeAllChildrens(objContainer: egret.DisplayObjectContainer): void;
}
declare class GUtilMath {
    static TempPoint: egret.Point;
    /**
     * 求两点间距离
     * @param x1	起始点X坐标
     * @param y1	起始点Y坐标
     * @param x2	结束点X坐标
     * @param y2	结束点Y坐标
     * @return		返回二点之间线段的长度
     */
    static getDistance(x1: number, y1: number, x2: number, y2: number): number;
    /** 角度换弧度
     * @param angle 角度
     * @return		角度转换成的弧度值
     */
    static angle2Radian(angle: number): number;
    /** 获取两点角度
     * @param x1  	起点X坐标
     * @param y1	起点Y坐标
     * @param x2 	结束点X坐标
     * @param y2	结束点Y坐标
     * @return		获得两点连线角度
     */
    static getAngle(x1: number, y1: number, x2: number, y2: number): number;
    /**
     * 在线段上根据长度取点坐标
     * @param x1  	起点X坐标
     * @param y1	起点Y坐标
     * @param x2 	结束点X坐标
     * @param y2	结束点Y坐标
     * @param len	距离起点的长度
     * @return		返回该长度在线段上的坐标点
     */
    static getLenByLine(x1: number, y1: number, x2: number, y2: number, len: number): egret.Point;
    /**获取min-max的随机数
     * @param min 起始数 从哪个数开始
     * @param max 结束数 到哪个数结束
     */
    static randomNum(min: number, max: number): number;
}
/**MD5加密 */
declare class MD5 {
    private static _mInstance;
    static readonly getInstance: MD5;
    constructor();
    safe_add(x: any, y: any): number;
    rol(num: any, cnt: any): number;
    cmn(q: any, a: any, b: any, x: any, s: any, t: any): number;
    ff(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
    gg(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
    hh(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
    ii(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
    coreMD5(x: any): number[];
    binl2hex(binarray: any): string;
    binl2b64(binarray: any): string;
    str2binl(str: any): any[];
    strw2binl(str: any): any[];
    hexMD5(str: any): string;
    hexMD5w(str: any): string;
    b64MD5(str: any): string;
    b64MD5w(str: any): string;
    calcMD5(str: any): string;
}
declare namespace MUtils {
    class MTimerTask implements GIObjPool {
        mName: string;
        mTotal: number;
        mCurrentTime: number;
        private _mDelayed;
        private _mDeplete;
        private _mCallFun;
        private _mThisObj;
        constructor();
        Minit(name: string, total: number, delayed: number, callFun: Function, thisObj: any): void;
        Mupdate(it: number): void;
        clean(): void;
    }
}
