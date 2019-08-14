/**
 * 自定义事件
 */
class CustEventMrg extends egret.EventDispatcher {
	private static mInstance:CustEventMrg;
	public static get getInstance():CustEventMrg{
		if(this.mInstance == undefined)
			this.mInstance = new CustEventMrg();
		return this.mInstance;
	}

	private constructor() {
		super();
	}

	public addEvent(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{
		if(CustEventMrg.getInstance.hasEventListener(type)) {//已存在事件
			return;
		}
		CustEventMrg.getInstance.addEventListener(type, listener, thisObject, useCapture, priority);
	}

	public removeEvent(type: string, listener: Function, thisObject: any, useCapture?: boolean): void{
		if(!CustEventMrg.getInstance.hasEventListener(type)) {//不已存在事件
			return;
		}
		 CustEventMrg.getInstance.removeEventListener(type, listener, thisObject, useCapture);
	}

	/**
	 * 派发一个带数据的事件。
	 * @param type {string} 事件类型
	 * @param data {any} 事件data
	 * @param bubbles {boolean} 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
	 * @param cancelable {boolean} 确定是否可以取消 Event 对象。默认值为 false。
	 */
	public dispatch(type: string, data?: any, bubbles?: boolean, cancelable?: boolean): boolean{
		CustEventMrg.getInstance.dispatchEventWith(type, bubbles, data, cancelable);
		return true;
	}
}