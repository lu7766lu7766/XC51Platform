var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Tint_ on 2017/9/23.
 */
var ProSendMagaer = (function () {
    function ProSendMagaer() {
    }
    /**
     * 心跳协议
        ID:0	c->s		定时保持心跳在线
      玩家对象ID(INT)
     */
    ProSendMagaer.sendHeartbeat = function () {
        var byteArr = new egret.ByteArray();
        byteArr.writeShort(6);
        //发送协议号
        byteArr.writeShort(0);
        byteArr.writeInt(Number(UserData.getInstance.userId));
        ProManager.getInstance.sendPro(byteArr, 0);
    };
    /**
     * ID:1	c->s		请求登陆
     * 玩家ID(INT) + 密钥(String 32) + 版本号(INT 格式为:2018010399)
     */
    // public static sendLogin(): void {
    //     let byteArr = new egret.ByteArray();
    //     //协议长度
    //     byteArr.writeShort(42);
    //     //发送协议号
    //     byteArr.writeShort(1);
    //     byteArr.writeInt(Number(UserData.getInstance.userId));
    //     byteArr.writeBytes(ProManager.getStr32(GameValue.orderId));
    //     byteArr.writeInt(GameValue.version);
    //     ProManager.getInstance.sendPro(byteArr,1);
    // }
    /**
     * ID:1001		c->s	//请求进入房间
     * 玩家对象ID(INT) +  房间类型(Byte 1:免费场 /2:普通付费场/3:付费场2/4:付费场3)
     */
    ProSendMagaer.send1001 = function (type) {
        var byteArr = new egret.ByteArray();
        //协议长度
        byteArr.writeShort(7);
        //发送协议号
        byteArr.writeShort(1001);
        byteArr.writeInt(Number(UserData.getInstance.userId));
        byteArr.writeByte(type);
        ProManager.getInstance.sendPro(byteArr, 1001);
    };
    /**
     * ID:1002		C->S 	//点击
     * 玩家对象ID(INT)
     */
    ProSendMagaer.send1002 = function () {
        var byteArr = new egret.ByteArray();
        //协议长度
        byteArr.writeShort(6);
        //发送协议号
        byteArr.writeShort(1002);
        byteArr.writeInt(Number(UserData.getInstance.userId));
        ProManager.getInstance.sendPro(byteArr, 1002);
    };
    /**
     * ID:1003		C->S 	//过一个柱子加一分
     * 玩家对象ID(INT)
     */
    ProSendMagaer.send1003 = function () {
        var byteArr = new egret.ByteArray();
        //协议长度
        byteArr.writeShort(6);
        //发送协议号
        byteArr.writeShort(1003);
        byteArr.writeInt(Number(UserData.getInstance.userId));
        ProManager.getInstance.sendPro(byteArr, 1003);
    };
    /**
     * ID:1004 		c->s 	//玩家请求退出房间
     *  玩家对象ID(INT)
     */
    ProSendMagaer.send1004 = function () {
        var byteArr = new egret.ByteArray();
        //协议长度
        byteArr.writeShort(6);
        //发送协议号
        byteArr.writeShort(1004);
        byteArr.writeInt(Number(UserData.getInstance.userId));
        ProManager.getInstance.sendPro(byteArr, 1004);
    };
    /**
     * ID:1005		C->s	//我挂了
     * 玩家对象ID(INT)
     */
    ProSendMagaer.send1005 = function () {
        var byteArr = new egret.ByteArray();
        //协议长度
        byteArr.writeShort(6);
        //发送协议号
        byteArr.writeShort(1005);
        byteArr.writeInt(Number(UserData.getInstance.userId));
        ProManager.getInstance.sendPro(byteArr, 1005);
    };
    /**
     * ID:1006		C->S	//请求玩家当前生命跟连赢数
     * 玩家对象ID(INT)
     */
    ProSendMagaer.send1006 = function () {
        var byteArr = new egret.ByteArray();
        //协议长度
        byteArr.writeShort(6);
        //发送协议号
        byteArr.writeShort(1006);
        byteArr.writeInt(Number(UserData.getInstance.userId));
        ProManager.getInstance.sendPro(byteArr, 1006);
    };
    /**
     * ID:1007		c->s 	//取消匹配
     * 玩家对象ID(INT)
     */
    ProSendMagaer.send1007 = function () {
        var byteArr = new egret.ByteArray();
        //协议长度
        byteArr.writeShort(6);
        //发送协议号
        byteArr.writeShort(1007);
        byteArr.writeInt(Number(UserData.getInstance.userId));
        ProManager.getInstance.sendPro(byteArr, 1007);
    };
    return ProSendMagaer;
}());
__reflect(ProSendMagaer.prototype, "ProSendMagaer");
//# sourceMappingURL=ProSendMagaer.js.map