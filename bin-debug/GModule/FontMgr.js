var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FontMgr = (function () {
    function FontMgr() {
    }
    FontMgr.preloadRes = function (loadMod) {
        // loadMod.GaddItem('resource/assets/font/' + FontMgr.FONT_1 + '.fnt');
        // loadMod.GaddItem('resource/assets/font/' + FontMgr.FONT_3 + '.fnt');
    };
    FontMgr.getText = function (font) {
        var text = new egret.BitmapText();
        // text.font = GResCache.getRes('resource/assets/font/' + font + '.fnt');
        RES.getResByUrl('resource/assets/font/' + font + '.fnt', function (e) {
            text.font = e;
        }, this);
        return text;
    };
    /**Din 40px 0x999999 */
    FontMgr.FONT_1 = 'Din400x999999';
    /**Din 32 0xffffff */
    FontMgr.FONT_2 = 'Din320xffffff';
    /**0xf72e52 */
    FontMgr.FONT_3 = '0xf72e52';
    return FontMgr;
}());
__reflect(FontMgr.prototype, "FontMgr");
//# sourceMappingURL=FontMgr.js.map