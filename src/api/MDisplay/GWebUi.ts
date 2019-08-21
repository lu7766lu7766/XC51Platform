class GWebUi extends egret.Sprite {
		private static type_text:number = 1;
		private static type_image:number = 2;
		public static UIWidth:number = 680;
		public static UIHeight:number = 960;
		private static _lineSpacing:number =5;
		private static _tagStart:RegExp = /<tag_\d{1}>/;
		private static _tagEnd:RegExp = /<\/tag_\d{1}>\s*/;
		private static _num:RegExp = /\d{1}/;
		private static _newLine:RegExp = /<br>/g;

		private static _instance:GWebUi = null;

		public static get getInstance():GWebUi{
			if(GWebUi._instance == null)
				GWebUi._instance = new GWebUi();
			return GWebUi._instance;
		}

		private _contents:Array<any> = new Array();
		private _url:string = '';
		private _scollView:egret.ScrollView;
		private _contentsBox:egret.Sprite = new egret.Sprite();
		private _fontSize:number;
		

		private constructor() {
			super();
			this._scollView = new egret.ScrollView();
			//设置滚动内容
			this._scollView.setContent(this._contentsBox);
			this._scollView.bounces = true;
			this._scollView.verticalScrollPolicy = 'on';
			this._scollView.horizontalScrollPolicy = 'off';
			this._scollView.scrollSpeed = 0;
			
			this.addChild(this._scollView);
			
		}

		public show(path:string,width:number,height:number,fontSize:number = 20){
			this.clean();
			GWebUi.UIWidth = width;
			GWebUi.UIHeight = height;	
			this._fontSize = fontSize;		
			//设置滚动区域宽高
			this._scollView.width = width;
			this._scollView.height = height;	//55 留出下面底部菜单栏区域
			this._scollView.scrollTop = 0;
			GResCache.loadResByUrl(path,this.onLoadPath,this,RES.ResourceItem.TYPE_TEXT);
		}

		public hide():void{
			if(this.parent != undefined)
				this.parent.removeChild(this);
			this.clean();			
		}

		private onLoadPath(data:any){
			if(data != null)
				this.analysis(data);
		}


		private analysis(webStr:string):void{
			let list:Array<string> =  webStr.split(GWebUi._tagStart);
			for(let i = 0,l = list.length; i < l; i++){
				this.addList(list[i]);
			}
			this.display();
			this.update();
		}

		private addList(str:string):void{
			let arr = GWebUi._tagEnd.exec(str);
			if(arr == null || arr.length < 1)
				return;			
			let arr2 = GWebUi._num.exec(arr[0]);
			if(arr == null || arr.length < 1)
				return;
			let type = arr2[0];
			let res = str.replace(GWebUi._tagEnd,'');
			this._contents.push([type,res]);
		}

		private display():void{
			for(let i = 0,l = this._contents.length; i < l; i++){
				let temp:Array<any> = this._contents[i];
				if(temp[0] == GWebUi.type_text){
					let tf:egret.TextField = new egret.TextField();
					tf.width = GWebUi.UIWidth;
					tf.text = temp[1].replace(GWebUi._newLine,"\n");
					tf.size = this._fontSize;
					tf.textColor = 0;
					tf.lineSpacing = GWebUi._lineSpacing;
					this._contentsBox.addChild(tf);
					this._contents[i][2] = tf;
				}else if(temp[0] == GWebUi.type_image){
					let bm:egret.Bitmap = new egret.Bitmap();
					this._contentsBox.addChild(bm);
					this._contents[i][2] = bm;
					GResCache.loadResByUrl(this._contents[i][1],this.onImageLoaded,this);
				}
			}
		}

		private onImageLoaded(data:any){
			for(let i = 0,l = this._contents.length; i < l; i++){
				let temp:Array<any> = this._contents[i];
				if(temp[2] instanceof egret.Bitmap){
					let bm:egret.Bitmap = temp[2];
					if(bm.$bitmapData != null)
						continue;
					let bmd:any = GResCache.getEgretRes(temp[1]);
					if(bmd != null)
						bm.$setBitmapData(bmd);
				}
			}
			this.update();
		}

		private update():void{
			let cy:number = 0;
			for(let i = 0,l = this._contents.length; i < l; i++){
				let temp:Array<any> = this._contents[i];
				if(temp[2] instanceof egret.TextField){
					temp[2].y = cy;
					cy += (<egret.TextField>temp[2]).textHeight + GWebUi._lineSpacing;
				}else if(temp[2] instanceof egret.Bitmap){
					let bm:egret.Bitmap = temp[2];
					if(bm.$bitmapData == null)
						continue;
					bm.y = cy;
					cy += (<egret.Bitmap>temp[2]).height + GWebUi._lineSpacing;
				}
			}
		}

		private clean():void{
			this._contentsBox.removeChildren();
			for(let i = 0,l = this._contents.length; i < l; i++){
				let temp:Array<any> = this._contents[i];
				if(temp[2] instanceof egret.Bitmap){
					(<egret.Bitmap>temp[2]).$bitmapData = null;
					GResCache.delete(temp[1]);
				}
			}
			this._contents = [];
		}
	}
