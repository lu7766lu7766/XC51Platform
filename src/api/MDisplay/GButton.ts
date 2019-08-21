module MDisplay {
	export class GButton extends egret.Bitmap {
		private _isAutoZoon: boolean = true;
		private _touchBeginFun: Function = undefined;
		private _touchBeginThisObj: any = undefined;
		private _isSetZoon: boolean = false;

		/**
		 * 设置位图内容  及是否自动缩放 默认为自动缩放
		 */
		public constructor(data: any, isAutoZoon?: boolean) {
			super(data);
			if (isAutoZoon != undefined) {
				this._isAutoZoon = isAutoZoon;
			}
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
			this.touchEnabled = true;
		}

		/**
		 * 添加单击事件
		 * @param fun:事件回调的方法 
		 * @param thisObj:事件回调依附的对象
		 */
		public addTouchBeginEvent(fun: Function, thisObj: any) {
			this._touchBeginFun = fun;
			this._touchBeginThisObj = thisObj;
		}

		private touchEnd(e:egret.TouchEvent):void{
			if(e.currentTarget == this){
				if(this._isAutoZoon){
					GButton.upstep(this,this._touchBeginFun,this._touchBeginThisObj,e);
				}else if(this._touchBeginFun != undefined && this._touchBeginThisObj != undefined)
					this._touchBeginFun.call(this._touchBeginThisObj, e);
			}
			e.stopImmediatePropagation;
		}

		private onClick(e: egret.TouchEvent): void {
			if(e.currentTarget == this){
				if (this._isAutoZoon) {					
					GButton.minify(this);
				} else
					this._touchBeginFun.call(this._touchBeginThisObj, e);
			}
			e.stopImmediatePropagation;
		}


		/**
		 * 设置居中缩放锚点
		 * 因为锚点跟X Y坐标有关联 如果当前锚点已经居中 则此方法不会做任何修改
		 */
		public static setZoom(obj: egret.DisplayObject): void {
			let offsetX = Math.floor(obj.width / 2 + 0.5);
			if (obj.$anchorOffsetX != 0)
				return;
			let offsetY = Math.floor(obj.height / 2 + 0.5);
			obj.anchorOffsetX = offsetX;
			obj.anchorOffsetY = offsetY;
			obj.x += obj.anchorOffsetX;
			obj.y += obj.$anchorOffsetY;
		}

		/**
		 * 缓动缩小 并且设置锚点为正中心
		 */
		public static minify(obj:egret.DisplayObject):void{
			GButton.setZoom(obj);
			egret.Tween.get(obj).to({ scaleX: 0.9, scaleY: 0.9 }, 80);
		}

		/**
		 * 缓动放大 并且设置锚点为正中心 当缓动结束后 调用指定回调方法 
		 * @param obj  要进行缓动的显示对象
		 * @param fun	缓动结束的回调方法
		 * @param funThisObj 回调方法对应的This对象
		 * @param data		回调方法需要传递的对象
		 */
		public static upstep(obj:egret.DisplayObject,fun:Function,funThisObj:any,data?:any):void{
			GButton.setZoom(obj);
			egret.Tween.get(obj).to({ scaleX: 1.1, scaleY: 1.1 },110).to({ scaleX: 1, scaleY: 1 },100).call(() => {
				if(fun != undefined && funThisObj != undefined){
					if(data != undefined)
						fun.call(funThisObj,data);
					else
						fun.call(funThisObj);
				}
			},funThisObj);
		}		
	}
}