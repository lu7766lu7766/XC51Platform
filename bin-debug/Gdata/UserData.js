var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UserData = (function () {
    function UserData() {
        /**玩家id */
        this.userId = "";
        /**玩家账号 */
        this.account = "";
        /**玩家密码 */
        this.password = "";
        /**用户绑定手机 */
        this.photo = "";
        /**玩家登陆code */
        this.code = "";
        /**用户头像 */
        this.userImgUrl = "";
        /**用户昵称 */
        this.userName = "未登录";
        /**性别 1男 2女*/
        this.gender = "1";
        /**省 */
        this.province = "";
        /**市 */
        this.city = "";
        /**当前金币 */
        this._mGold = 0;
        /**当前奖金*/
        this._mBonus = 0;
        /**当前代金券*/
        this._mDJQGold = 0;
        /**发单佣金*/
        this._YJGold = 0;
        /**代理佣金 */
        this._DLGold = 0;
        /**当前返现 */
        this._mRetCash = 0;
        /**提现流水当前积累值 */
        this._defaultLSmoney = 0;
        /**提现流水限额值 */
        this._xzLSmoney = 0;
        /**等级 */
        this._Lv = 0;
        /**真实姓名*/
        this._readName = "";
        /**身份证号码 */
        this._card = "";
        /**是否是认证用户（0 没有认证用户 1认证用户）*/
        this.useddd = 0;
        /**获取用户id缓存 */
        this.userId = CacheMrg.getInstance.getYJTime("userId");
        this.account = CacheMrg.getInstance.getYJTime("account");
        this.password = CacheMrg.getInstance.getYJTime("password");
    }
    Object.defineProperty(UserData, "getInstance", {
        get: function () {
            if (UserData._mInstance == undefined)
                UserData._mInstance = new UserData();
            return UserData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**设置缓存 (如果清缓存直接传0,0,0)*/
    UserData.prototype.setYJTime = function (userId, account, password) {
        if (userId != undefined && account != undefined && password != undefined) {
            this.userId = userId;
            this.account = account;
            this.password = password;
            CacheMrg.getInstance.addYJTime("userId", userId);
            CacheMrg.getInstance.addYJTime("account", account);
            CacheMrg.getInstance.addYJTime("password", password);
        }
    };
    /**当前是否有缓存 */
    UserData.prototype.isLogin = function () {
        if (this.userId != undefined && this.userId != "0") {
            return true;
        }
        else {
            return false;
        }
    };
    /**金币 */
    UserData.prototype.getGold = function () {
        return this._mGold;
    };
    UserData.prototype.setGold = function (value) {
        this._mGold = value;
    };
    UserData.prototype.addGold = function (value) {
        this._mGold += value;
    };
    UserData.prototype.subGold = function (value) {
        this._mGold -= value;
        return true;
    };
    UserData.prototype.multGold = function (value) {
        this._mGold *= value;
        return true;
    };
    UserData.prototype.divGold = function (value) {
        this._mGold /= value;
        return true;
    };
    UserData.prototype.getDJQGold = function () {
        return this._mDJQGold;
    };
    UserData.prototype.setDJQGold = function (obj) {
        this._mDJQGold = obj;
    };
    UserData.prototype.getBonus = function () {
        return this._mBonus;
    };
    UserData.prototype.setBonus = function (obj) {
        if (obj == "" || obj == undefined) {
            this._mBonus = 0;
        }
        else {
            this._mBonus = obj;
        }
    };
    UserData.prototype.getYJGold = function () {
        return this._YJGold;
    };
    UserData.prototype.setYJGold = function (obj) {
        this._YJGold = obj;
    };
    UserData.prototype.getDLGold = function () {
        return this._DLGold;
    };
    UserData.prototype.setDLGold = function (obj) {
        this._DLGold = obj;
    };
    UserData.prototype.getRetCash = function () {
        return this._mRetCash;
    };
    UserData.prototype.setRetCash = function (obj) {
        this._mRetCash = obj;
    };
    UserData.prototype.getLv = function () {
        return this._Lv;
    };
    UserData.prototype.setLv = function (obj) {
        this._Lv = obj;
    };
    UserData.prototype.getLSDefaultmoney = function () {
        return this._defaultLSmoney;
    };
    UserData.prototype.setLSDefaultmoney = function (obj) {
        this._defaultLSmoney = obj;
    };
    UserData.prototype.getLSxzmoney = function () {
        return this._xzLSmoney;
    };
    UserData.prototype.setLSxzmoney = function (obj) {
        this._xzLSmoney = obj;
    };
    /**设置姓名*/
    UserData.prototype.setrealName = function (str) {
        this._readName = str;
    };
    /**获取姓名*/
    UserData.prototype.getrealName = function () {
        return this._readName;
    };
    /**设置身份证*/
    UserData.prototype.setcard = function (str) {
        this._card = str;
    };
    /**获取身份证*/
    UserData.prototype.getcard = function () {
        return this._card;
    };
    /**设置用户*/
    UserData.prototype.setused = function (type) {
        this.useddd = type;
    };
    /**获取用户*/
    UserData.prototype.getused = function () {
        return this.useddd;
    };
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
//# sourceMappingURL=UserData.js.map