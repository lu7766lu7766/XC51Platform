class GHashMap<V> {
	private readonly _mkeys: Array<string | number>;
	public constructor() {
		this._mkeys = [];
	}

	private onAdd(key: string | number): void {
		if (this[key] == undefined) {
			this._mkeys.push(key);
		}
	}

	private onRemove(key: string | number): void {
		if (this[key] != undefined) {
			for(let i = 0,l = this._mkeys.length; i < l ; i++){
				if(this._mkeys[i] == key){
					this._mkeys.splice(i,1);
					return;
				}
			}
		}
	}


	/**
	 * 添加键值对应数据
	 * @param key 		添加数据的键
	 * @param value		添加数据键对应的值		 * 
	 */
	public Gput(key: string | number, value: V): void {
		if (key == undefined)
			return;
		this.onAdd(key);
		this[key] = value;
	}


	/**
	 * 查找当前是否存在该键对应的数据
	 * @param key		待查找的键值
	 * @returns			如果存在则返回TRUE 否则返回FALSE
	 */
	public GhasKey(key: string | number): boolean {
		return this[key] != undefined;
	}

	/**
	 * 查找当前是否存在该值
	 * @param 		value		待查找的值
	 * @returns		如果存在则返回TRUE 否则返回FALSE
	 */
	public GhasValue(value: V): boolean {
		if (value == undefined)
			return false;
		for (let k of this._mkeys) {
			if (this[k] == value)
				return true;
		}
		return false;
	}

	/**
	 * 根据键移除对应数据
	 * @param key		待移除的键值名称
	 * @returns			如果移除成功则返回对应的值 否则返回NULL
	 */
	public GremoveByKey(key: string | number): V {
		if (this.GhasKey(key) == false)
			return null;
		this.onRemove(key);
		let temp: V = this[key];
		delete this[key];
		return temp;
	}

	/**
	 * 移除指定值
	 * @param value		待移除的值对象
	 * @returns			移除成功则返回TRUE 否则返回FALSE
	 */
	public GremoveByValue(value: V): Boolean {
		if (value == undefined)
			return false;
		for (let k of this._mkeys) {
			if (this[k] == value) {
				this.GremoveByKey(k);
				return true;
			}
		}
		return false;
	}

	/**
	 * 获取指定键对应的值
	 * @param	key		要获得的值对应的键名称
	 * @returns			如果当前Map包含指定键值则返回对应值,否则返回Null
	 */
	public Gget(key: string | number): V {
		let temp: V = this[key];
		return temp == undefined ? null : temp;
	}

	/**
	 * 获得当前MAP对象长度
	 */
	public get size() {
		return this._mkeys.length;
	}


	/**
	 * 获得当前MAP的键值数组
	 * @returns			当前MAP的键值数组
	 */
	public get keys(): Array<string | number> {
		return this._mkeys;
	}

	/**
	 * 清除所有
	 */
	public clear(): void {
		let keys: Array<any> = this._mkeys;
		let length = keys.length;
		for (let i:number = length - 1; i >= 0; i--) {
			this.GremoveByKey(keys[i]);
		}
	}
}
