class GSocketMager {
    private static _mInstance: GSocketMager;
    public static get getInstance(): GSocketMager {
        if (GSocketMager._mInstance == undefined)
            GSocketMager._mInstance = new GSocketMager();
        return GSocketMager._mInstance;
    }

    private _mSocketMap: GHashMap<MNet.MSocketer>;

    private constructor() {
        this._mSocketMap = new GHashMap<MNet.MSocketer>();
    }

    public createSocket(url: string, handle: GISocketHandle, id: number = 1) {
        let temp: MNet.MSocketer = this._mSocketMap.Gget(id);
        if (temp === null) {
            temp = new MNet.MSocketer(url, handle);
            this._mSocketMap.Gput(id, temp);
        }
    }

    public sendByteArr(Ba: egret.ByteArray, id: number = 1) {
        let temp: MNet.MSocketer = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.sendByteArray(Ba);
        }
    }

    /**断开连接 */
    public closeSocket(id: number = 1) {
        let temp: MNet.MSocketer = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.closeSocket();
        }
    }

    /**重新连接 */
    public connectSocket(id: number = 1) {
        let temp: MNet.MSocketer = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.connectSocket();
        }
    }

    /**清空发送缓存协议 */
    public cleanCacheArr(id: number = 1){
        let temp: MNet.MSocketer = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.cleanCacheArr();
        }
    }
}