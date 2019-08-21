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
//# sourceMappingURL=GMaskObj.js.map