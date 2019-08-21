var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MDisplay;
(function (MDisplay) {
    var MMovieClipData = (function () {
        function MMovieClipData() {
            this.mIsInit = false;
            this._mIsLoading = false;
            this.framesArr = {};
            this._mLoader = new GLoadModule();
        }
        MMovieClipData.prototype.MloadConfig = function (url) {
            if (this.mIsInit) {
                return;
            }
            if (this._mIsLoading)
                return;
            this._mIsLoading = true;
            var groupName = url + '.json';
            if (this._mLoader.GaddGroupRes(groupName, GLoadModule.GroupType_Flash)) {
                this.mURL = MMovieClipData.configFileBaseUrl + groupName;
                this._mLoader.Gbegin(this.onLoadedImage, this);
            }
        };
        MMovieClipData.prototype.onLoadedImage = function () {
            var data = GResCache.getRes(this.mURL);
            this.handleData(data);
            this.mIsInit = true;
        };
        MMovieClipData.prototype.handleData = function (data) {
            var imageArr = data['imageArr'];
            var frameArr = data['frames'];
            this.mFrameTotal = frameArr.length;
            for (var i1 = 0, l1 = frameArr.length; i1 < l1; i1++) {
                var frame = frameArr[i1];
                var temp = new MDisplay.MFramData(frame['index'], frame['eventStr']);
                for (var i = 0, l = frame['list'].length; i < l; i++) {
                    var display = frame['list'][i];
                    temp.MaddDisplay(new MDisplay.MDisplayConfig(MMovieClipData.imageFileBaseUrl + imageArr[display[0]], display[1], display[2], display[3], display[4], display[5], display[6], display[7], display[8], display[9], display[10]));
                }
                this.framesArr[frame['index']] = temp;
            }
        };
        MMovieClipData.prototype.GgetFrameData = function (index) {
            var temp = this.framesArr[index];
            return temp == undefined ? null : temp;
        };
        MMovieClipData.configFileBaseUrl = 'resource/assets/flashconfig/';
        MMovieClipData.imageFileBaseUrl = 'resource/assets/images/flash/';
        return MMovieClipData;
    }());
    MDisplay.MMovieClipData = MMovieClipData;
    __reflect(MMovieClipData.prototype, "MDisplay.MMovieClipData");
})(MDisplay || (MDisplay = {}));
//# sourceMappingURL=MMovieClipData.js.map