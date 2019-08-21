var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
            for (var i = 0, l = this._mkeys.length; i < l; i++) {
                if (this._mkeys[i] == key) {
                    this._mkeys.splice(i, 1);
                    return;
                }
            }
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
//# sourceMappingURL=GHashMap.js.map