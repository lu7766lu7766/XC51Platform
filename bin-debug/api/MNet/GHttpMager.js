var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
//# sourceMappingURL=GHttpMager.js.map