class GameValue {
	private static _mInstance: GameValue;
	public static get getInstance(): GameValue {
		if (GameValue._mInstance == undefined)
			GameValue._mInstance = new GameValue();
		return GameValue._mInstance;
	}
	private constructor() {
	}

	/**服务器是否为调试模式 true:测试服 false:正式服 ===重点===*/
	public static isDebug: boolean = false;

	/**游戏版本 */
	public static gameVer:string = "10.3";
	/**php版本 */
	public static verPhp:string = "1.1";

	/**socket地址 */
	public static socketUrl: string = "ws://106.75.130.10:8880/dddddd";
	/**当前用户时间(当前服务器时间) */
	public static nowTime:number;

	/**连接服务器成功 1成功 2失败 3(99初始化)*/
	public static severType: number = 1;
	/**屏幕适配值(顶部) */
	public static adaptationScreen:number = 0;

	/**客服二维码路径 */
	public static codeURL: string = "";
	/**当前键盘所在位置 */
	public static keydownNum:number=0;
	/**霸占全部佣金 0:否 1:是*/
	public static isBZQBYJ:number = 0;
	/**0:普通用户   1:认证大神 2正在申请 */
	public static isDryingList:number = 0;
	/**请求间隔 10s*/
	public static httpSendTime:number = 10000;
	/**支付订单key */
	public static orderKey:string = "";

	/**排三期数 */
	public static threeQS:number = 0;
	/**排五期数 */
	public static fiveQS:number = 0;
	/**截止时间 */
	public static stopTime:number = 0;
	/**1销售中 0停止销售 */
	public static typeQS:number = 0;
	/**是否可以打开竞猜 0不能打开 1可打开*/
	public static isJ:number = 1;

	/**单倍下注 反水比例*/
	public static fsRate:number = 10;

	/**客服跳转 */
	public static kfUrl:string = "https://vm.providesupport.com/0o9t1ktmxghcq1oagixycxoww1";
}
