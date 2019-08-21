namespace MDisplay {
	export class MUISprite extends egret.DisplayObjectContainer {
		public static readonly UIConfigUrl = 'resource/assets/uiconfig/';
		public static readonly UIImageUrl = 'resource/assets/images/ui/';

		private _mLoadMod: GLoadModule;
		private _mUIConfigUrl: string;
		protected _mInit: boolean = false;
		protected _mPater: egret.DisplayObjectContainer;
		public constructor() {
			super();
			this._mLoadMod = new GLoadModule();
		}

		protected beforeLoad(url: string, type?: string): void {
			if (type != undefined && (type == GLoadModule.GroupType_UI || type == GLoadModule.GroupType_Flash
				|| type == GLoadModule.GroupType_SheetUI || type == GLoadModule.GroupType_SheetFlash)) {
				this._mLoadMod.GaddGroupRes(url, type);
			} else
				this._mLoadMod.GaddItem(url);
		}

		public GinitUIConfig(url: string): void {
			if (url && url != "") {
				let uiName: string = url + '.json';
				if (this._mLoadMod.GaddGroupRes(uiName, GLoadModule.GroupType_UI)) {
					this._mUIConfigUrl = MUISprite.UIConfigUrl + uiName;
				}
			}
			this._mLoadMod.Gbegin(this.onLoadedItems, this);
		}

		private onLoadedItems(): void {
			this._mInit = true;
			this.initUI();
			this.onInit();
		}

		private initUI(): void {
			if (!this._mUIConfigUrl || this._mUIConfigUrl == "")
				return;
			let configData: Object = GResCache.getRes(this._mUIConfigUrl);
			let list: Array<any> = configData['list'];
			for (let i = 0, l = list.length; i < l; i++) {
				let child: egret.Bitmap = new egret.Bitmap(
					GResCache.getRes(MUISprite.UIImageUrl + list[i]['path'])
				);
				child.x = list[i]['x'];
				child.y = list[i]['y'];
				if (list[i]['skx'] != list[i]['sky']) {
					child.skewX = list[i]['skx'];
					child.skewY = list[i]['sky'];
					child.rotation = 0;
				} else {
					child.rotation = list[i]['r'];
					child.skewX = 0;
					child.skewY = 0;
				}
				child.scaleX = list[i]['sx'];
				child.scaleY = list[i]['sy'];
				child.name = list[i]['n'];
				this.addChild(child);
			}

		}

		protected onInit(): void {

		}


	}
}