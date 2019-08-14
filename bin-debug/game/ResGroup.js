var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResGroup = (function () {
    function ResGroup() {
    }
    ResGroup.resGroupConfig = {
        "DownWnd.json": {
            "images": [
                "bs.png",
                "home_nor_tabbar.png",
                "match_nor_tabbar.png",
                "follow_nor_tabbar.png",
                "mine_nor_tabbar.png"
            ],
            "base": "resource/assets/images/ui/"
        }
    };
    return ResGroup;
}());
__reflect(ResGroup.prototype, "ResGroup");
//# sourceMappingURL=ResGroup.js.map