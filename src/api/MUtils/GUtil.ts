class GUtil {
	public static colorMatrixIsNormal(arr: Array<number>): boolean {
		if (arr == undefined || arr.length != 8)
			return false;
		if (arr[0] == 1 && arr[1] == 0 && arr[2] == 1 && arr[3] == 0
			&& arr[4] == 1 && arr[5] == 0 && arr[6] == 1 && arr[7] == 0)
			return true;
		return false;
	}

	public static to20ColorMatrix(arr: Array<number>): boolean {
		if (GUtil.colorMatrixIsNormal(arr) == false)
			return null;

	}

	/**滤镜：发亮（底） */
	public static COLOR_FILTER_LIGHT = new egret.ColorMatrixFilter([
		1, 0, 0, 0, 50,
		0, 1, 0, 0, 50,
		0, 0, 1, 0, 50,
		0, 0, 0, 1, 0]);

	/**滤镜：发亮（高） */
	public static COLOR_FILTER_LIGHT3 = new egret.ColorMatrixFilter([
		1, 0, 0, 0, 120,
		0, 1, 0, 0, 120,
		0, 0, 1, 0, 120,
		0, 0, 0, 1, 0]);

	/**滤镜：暗化 */
	public static COLOR_FILTER_DARK = new egret.ColorMatrixFilter([
		0.3, 0, 0, 0, 0,
		0, 0.3, 0, 0, 0,
		0, 0, 0.3, 0, 0,
		0, 0, 0, 1, 0]);

	/**滤镜：灰化 */
	public static COLOR_FILTER_GRAY = new egret.ColorMatrixFilter([
		0.3, 0.6, 0, 0, 0,
		0.3, 0.6, 0, 0, 0,
		0.3, 0.6, 0, 0, 0,
		0, 0, 0, 1, 0]);


	public static getFileType(url: string): string {
		let index: number = url.lastIndexOf('.');
		if (index == -1)
			return '';
		let type: string = url.slice(index + 1);
		return type;
	}

	/**
	 * 秒数转成时分秒 带前缀0
	 * @param sec 	总秒数
	 * @returns 秒数换成 00:00:00 格式
	 */
	public static secondToDate(sec:number):string{
		let h = Math.floor(sec / 3600);
		let m = Math.floor((sec / 60 % 60));
		let s = Math.floor((sec % 60));
		return (h < 10 ? '0' + h : h.toString()) + ':' +  (m < 10 ? '0' + m : m.toString())  + ':' +   (s < 10 ? '0' + s : s.toString());
	}

	/**
	 * 移除显示容器的所有子级
	 * @param objContainer
	 */
	public static removeAllChildrens(objContainer: egret.DisplayObjectContainer) {
		let obj;
		for (let i: number = objContainer.numChildren - 1; i >= 0; i--) {
			obj = objContainer.getChildAt(i);
			if (obj instanceof egret.DisplayObject) {
				if (obj.parent != null)
					obj.parent.removeChild(obj);
			}
			if (obj instanceof egret.DisplayObjectContainer) {
				this.removeAllChildrens(obj);
			}
		}
	}
}
