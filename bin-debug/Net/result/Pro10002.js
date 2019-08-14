var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * ID:10002	S->C	玩家货币初始化
 *	玩家充值余额(INT)  +  玩家佣金(INT) + 奖金金额(INT) + 娃娃数量(int) + 竞技场复活卡数量(byte)
 */
var Pro10002 = (function () {
    function Pro10002() {
        this.first = true;
    }
    Pro10002.prototype.handleData = function (data) {
        // GameValue.residualGold = data.readInt();
        // GameValue.commissionGold = data.readInt();
        // GameValue.bonusdualGold = data.readInt();
        // GameValue.wwGold = data.readInt();
        // GameValue.reLife = data.readByte();
        // if(this.first == false) {
        // 	let cz:number = lift - GameValue.reLife;
        // 	if(cz > 0) {
        // 		GetReviveWnd.getInstance.show(cz);
        // 	}
        // } 
        // this.first = false;
        // GameValue.reLife = lift;
    };
    return Pro10002;
}());
__reflect(Pro10002.prototype, "Pro10002", ["GIProHandle"]);
//# sourceMappingURL=Pro10002.js.map