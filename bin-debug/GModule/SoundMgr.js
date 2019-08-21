var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundMgr = (function () {
    function SoundMgr() {
        this.num = 0;
    }
    Object.defineProperty(SoundMgr, "getInstance", {
        get: function () {
            if (SoundMgr._mInstance == undefined)
                SoundMgr._mInstance = new SoundMgr();
            return SoundMgr._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SoundMgr.preloadRes = function (loadMod) {
    };
    SoundMgr.prototype.back = function (data) {
        if (data != undefined && data.url != undefined) {
            this.play(data.url, 1);
        }
    };
    /**
     * 播放音效
     * @param name       音效名
     * @param loops      循序次数，默认是0,循环播放
     * @param vol        音量 0-1, 默认是最大1
     * @param startTime  开始播放的初始位置（以秒为单位），默认值是 0
     *
     * @returns egret.SoundChannel
     */
    SoundMgr.prototype.play = function (name, loops, vol, startTime) {
        if (SoundMgr.playSound == false || SoundMgr.playSound_hp == false)
            return;
        /**使用时再加载音效 */
        var res = GResCache.getRes(name);
        if (res == undefined) {
            GResCache.loadResByUrl(name, this.back, this);
            return;
        }
        try {
            var sound = res;
            var channel = sound.play(startTime, loops);
            channel.volume = vol == undefined ? 1 : vol;
            return channel;
        }
        catch (error) {
            return;
        }
    };
    /**背景音乐切换 0是界面背景音效 1是游戏背景音效 */
    SoundMgr.prototype.playBgMusic = function (num) {
        if (num == undefined)
            num = this.num;
        else
            this.num = num;
        this.stopBgMusic();
        if (SoundMgr.isOpen == false)
            return; //不打开音效
        var sound;
        if (num == 0)
            sound = GResCache.getRes("resource/assets/sound/pai/hall_bj.mp3");
        else
            sound = GResCache.getRes("resource/assets/sound/pai/game_bj.mp3");
        this._mBG = sound.play();
        return this._mBG;
    };
    /**界面背景停止 */
    SoundMgr.prototype.stopBgMusic = function () {
        if (this._mBG != undefined) {
            this._mBG.stop();
        }
    };
    /**音效：点击抓 */
    SoundMgr.SOUND_CLICK = 'resource/assets/sound/click.mp3';
    /**是否开启音效 */
    SoundMgr.playSound = true;
    /**是否黑屏 */
    SoundMgr.playSound_hp = true;
    SoundMgr.isOpen = true;
    return SoundMgr;
}());
__reflect(SoundMgr.prototype, "SoundMgr");
//# sourceMappingURL=SoundMgr.js.map