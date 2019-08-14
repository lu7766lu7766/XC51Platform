class UserData {
	private static _mInstance: UserData;
	public static get getInstance(): UserData {
		if (UserData._mInstance == undefined)
			UserData._mInstance = new UserData();
		return UserData._mInstance;
	}
	/**玩家id */
	public userId: string = "";
	/**玩家账号 */
	public account: string = "";
	/**玩家密码 */
	public password: string = "";
	/**用户绑定手机 */
	public photo: string = "";
	/**玩家登陆code */
	public code: string = "";
	/**用户头像 */
	public userImgUrl: string = "";
	/**用户昵称 */
	public userName: string = "未登录";
	/**性别 1男 2女*/
	public gender: string = "1";
	/**省 */
	public province: string = "";
	/**市 */
	public city: string = "";
	/**当前金币 */
	private _mGold: number = 0;
	/**当前奖金*/
	private _mBonus: number = 0;
	/**当前代金券*/
	private _mDJQGold: number = 0;
	/**发单佣金*/
	private _YJGold: number = 0;
	/**代理佣金 */
	private _DLGold: number = 0;
	/**当前返现 */
	private _mRetCash: number = 0;
	/**提现流水当前积累值 */
	private _defaultLSmoney: number = 0;
	/**提现流水限额值 */
	private _xzLSmoney: number = 0;
	/**等级 */
	private _Lv: number = 0;
	/**真实姓名*/
	private _readName: string = "";
	/**身份证号码 */
	private _card: string = "";
	/**是否是认证用户（0 没有认证用户 1认证用户）*/
	private useddd: number = 0;

	private constructor() {
		/**获取用户id缓存 */
		this.userId = CacheMrg.getInstance.getYJTime("userId");
		this.account = CacheMrg.getInstance.getYJTime("account");
		this.password = CacheMrg.getInstance.getYJTime("password");

	}

	/**设置缓存 (如果清缓存直接传0,0,0)*/
	public setYJTime(userId: string, account: string, password: string): void {
		if (userId != undefined && account != undefined && password != undefined) {
			this.userId = userId;
			this.account = account;
			this.password = password;

			CacheMrg.getInstance.addYJTime("userId", userId);
			CacheMrg.getInstance.addYJTime("account", account);
			CacheMrg.getInstance.addYJTime("password", password);
		}
	}

	/**当前是否有缓存 */
	public isLogin(): boolean {
		if (this.userId != undefined && this.userId != "0") {
			return true;
		} else {
			return false;
		}
	}

	/**金币 */
	public getGold(): number {
		return this._mGold;
	}

	public setGold(value: number): void {
		this._mGold = value;
	}

	public addGold(value: number): void {
		this._mGold += value;
	}

	public subGold(value: number): boolean {
		this._mGold -= value;
		return true;
	}

	public multGold(value: number): boolean {
		this._mGold *= value;
		return true;
	}

	public divGold(value: number): boolean {
		this._mGold /= value;
		return true;
	}

	public getDJQGold(): number {
		return this._mDJQGold;
	}
	public setDJQGold(obj): void {
		this._mDJQGold = obj;
	}

	public getBonus(): number {
		return this._mBonus;
	}
	public setBonus(obj): void {
		if (obj == "" || obj == undefined) {
			this._mBonus = 0;
		} else {
			this._mBonus = obj;
		}
	}

	public getYJGold(): number {
		return this._YJGold;
	}
	public setYJGold(obj): void {
		this._YJGold = obj;
	}

	public getDLGold(): number {
		return this._DLGold;
	}
	public setDLGold(obj): void {
		this._DLGold = obj;
	}

	public getRetCash(): number {
		return this._mRetCash;
	}
	public setRetCash(obj): void {
		this._mRetCash = obj;
	}

	public getLv(): number {
		return this._Lv;
	}
	public setLv(obj): void {
		this._Lv = obj;
	}

	public getLSDefaultmoney(): number {
		return this._defaultLSmoney;
	}
	public setLSDefaultmoney(obj): void {
		this._defaultLSmoney = obj;
	}

	public getLSxzmoney(): number {
		return this._xzLSmoney;
	}
	public setLSxzmoney(obj): void {
		this._xzLSmoney = obj;
	}

	/**设置姓名*/
	public setrealName(str: string): void {
		this._readName = str;
	}

	/**获取姓名*/
	public getrealName(): string {
		return this._readName;
	}


	/**设置身份证*/
	public setcard(str: string): void {
		this._card = str;
	}

	/**获取身份证*/
	public getcard(): string {
		return this._card;
	}

	/**设置用户*/
	public setused(type: number): void {
		this.useddd = type;
	}

	/**获取用户*/
	public getused(): number {
		return this.useddd;
	}
}