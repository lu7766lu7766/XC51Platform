var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
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
//# sourceMappingURL=GUtilMath.js.map