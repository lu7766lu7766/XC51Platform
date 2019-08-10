class HandleData implements GXcelConfigIn {
	private static _mInstance: HandleData = null;
	public static get getInstance(): HandleData {
		if (HandleData._mInstance == null) {
			HandleData._mInstance = new HandleData();
		}
		return HandleData._mInstance;
	}

	private constructor() {
	}

	/**数据读取 */
	public readData(data: any): void {
		//设置读取配置完成 (必须要加上)
		GXcelConfig.getInstance.setFinishLoad(true);
	}
}