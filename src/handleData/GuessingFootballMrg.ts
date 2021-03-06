/**
 * 足球竞彩管理类
 */
class GuessingFootballMrg {
	private static _mInstance: GuessingFootballMrg;
	public static get getInstance(): GuessingFootballMrg {
		if (GuessingFootballMrg._mInstance == undefined)
			GuessingFootballMrg._mInstance = new GuessingFootballMrg();
		return GuessingFootballMrg._mInstance;
	}

	private constructor() {
		// let a:zqObjData = new zqObjData();
		// a.dlxId = 1;
		// a.xlxIdList = [1,2,3];

		// let b:zqObjData = new zqObjData();
		// b.dlxId = 2;
		// b.xlxIdList = [4,5,6];

		// let c:zqObjData = new zqObjData();
		// c.dlxId = 3;
		// c.xlxIdList = [7];

		// let d:zqObjData = new zqObjData();
		// d.dlxId = 4;
		// d.xlxIdList = [8];

		// let e:zqObjData = new zqObjData();
		// e.dlxId = 5;
		// e.xlxIdList = [9];

		// let f:zqObjData = new zqObjData();
		// f.dlxId = 6;
		// f.xlxIdList = [10];

		// let g:zqObjData = new zqObjData();
		// g.dlxId = 7;
		// g.xlxIdList = [11];

		// let h:zqObjData = new zqObjData();
		// h.dlxId = 8;
		// h.xlxIdList = [12];

		// let zqList:Array<zqObjData> = new Array<zqObjData>();
		// zqList.push(a,b,c,d,e,f,g,h);
		// let list = this.getGuessingList(zqList,false);
		// this.getAllZSByList(list,[1,2,3]);
	}

	/**
	 * 获取当前所有注码 
	 * 不是单关 == 至少选中2条数据
	*/
	public getGuessingList(zqList:Array<zqObjData>, isDG?:boolean):Array<Strand> {
		if(zqList.length < 2 && isDG != true) {
			return undefined;
		}
		let list:Array<Strand> = new Array<Strand>();
		let data:Strand;
		for(let i=0;i<zqList.length;i++) {
			data = new Strand();
			list.push(data)
		}

		if(isDG == true) {
			for(let i=0;i<zqList.length;i++) {
				for(let j=0;j<zqList[i].xlxIdList.length;j++) {
					
					list[0].injectionNum += 1;
					list[0].typeStrand = 1;
					list[0].listStrand.push([this.getList(zqList,i,j)]);
				}
			}
		}

		for(let i=0;i<zqList.length;i++) {
			for(let j=0;j<zqList[i].xlxIdList.length;j++) {
				for(let k=i+1;k<zqList.length;k++) {
					for(let l=0;l<zqList[k].xlxIdList.length;l++) {//2串1
						list[1].injectionNum += 1;
						list[1].typeStrand = 2;
						list[1].listStrand.push([this.getList(zqList,i,j), this.getList(zqList,k,l)]);

							for(let m=k+1;m<zqList.length;m++) {
								for(let n=0;n<zqList[m].xlxIdList.length;n++) {//3串1
									list[2].injectionNum += 1;
									list[2].typeStrand = 3;
									list[2].listStrand.push([this.getList(zqList,i,j), this.getList(zqList,k,l), this.getList(zqList,m,n)]);

									for(let o=m+1;o<zqList.length;o++) {
										for(let p=0;p<zqList[o].xlxIdList.length;p++) {//4串1
											list[3].injectionNum += 1;
											list[3].typeStrand = 4;
											list[3].listStrand.push([this.getList(zqList,i,j), this.getList(zqList,k,l), this.getList(zqList,m,n), this.getList(zqList,o,p)]);

											for(let q=o+1;q<zqList.length;q++) {
												for(let r=0;r<zqList[q].xlxIdList.length;r++) {//5串1
													list[4].injectionNum += 1;
													list[4].typeStrand = 5;
													list[4].listStrand.push([this.getList(zqList,i,j), this.getList(zqList,k,l), this.getList(zqList,m,n), this.getList(zqList,o,p), this.getList(zqList,q,r)]);
													
													for(let s=q+1;s<zqList.length;s++) {
														for(let t=0;t<zqList[s].xlxIdList.length;t++) {//6串1
															list[5].injectionNum += 1;
															list[5].typeStrand = 6;
															list[5].listStrand.push([this.getList(zqList,i,j), this.getList(zqList,k,l), this.getList(zqList,m,n), this.getList(zqList,o,p), this.getList(zqList,q,r), this.getList(zqList,s,t)]);

															for(let u=s+1;u<zqList.length;u++) {
																for(let v=0;v<zqList[u].xlxIdList.length;v++) {//7串1
																	list[6].injectionNum += 1;
																	list[6].typeStrand = 7;
																	list[6].listStrand.push([this.getList(zqList,i,j), this.getList(zqList,k,l), this.getList(zqList,m,n), this.getList(zqList,o,p), this.getList(zqList,q,r), this.getList(zqList,s,t), this.getList(zqList,u,v)]);

																	for(let w=u+1;w<zqList.length;w++) {
																		for(let y=0;y<zqList[w].xlxIdList.length;y++) {//8串1
																			list[7].injectionNum += 1;
																			list[7].typeStrand = 8;
																			list[7].listStrand.push([this.getList(zqList,i,j), this.getList(zqList,k,l), this.getList(zqList,m,n), this.getList(zqList,o,p), this.getList(zqList,q,r), this.getList(zqList,s,t), this.getList(zqList,w,y), this.getList(zqList,u,v)]);

																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
					}
				}
			}
		}
		return list;
	}

	public getList(zqList:Array<zqObjData>,i:number,j:number):any {
		return [zqList[i].dlxId,zqList[i].xlxIdList[j],1];
	}

	/**通过
	 * list(所有串数列表) 列表获取
	 * llist[0,1,2,3   ] == (单关,2串1 3串1 4串1) 总注数
	*/
	public getAllZSByList(list:Array<Strand>,llist:number[]):number {
		let all:number = 0;
		for(let i = 0;i<list.length;i++) {
			for(let j=0;j<llist.length;j++) {
				if(list[i].typeStrand - 1 == llist[j]) {
					all += list[i].injectionNum;
				}
			}
		}

		return all;
	}

	/**通过当前串获得奖金波段 */
	public getGoldByList(list:Array<Strand>,llist:number[],zqOrLq:number,isDG:boolean):number[] {
		let min:number = 0;
		let temp:number = 1
		let max:number = 0;
		let bs:number = 1;
		for(let i = 0;i<list.length;i++) {
			for(let j=0;j<llist.length;j++) {
				if(list[i].typeStrand - 1 == llist[j]) {
					for(let k=0;k<list[i].listStrand.length;k++) {
						temp = 1;
						bs = 1;
						for(let l=0;l<list[i].listStrand[k].length;l++) {
							let id:number = list[i].listStrand[k][l][0];
							let xb:number = list[i].listStrand[k][l][1];
							bs = list[i].listStrand[k][l][2];
							if(zqOrLq == 0) {
								if(isDG == true) {
									temp *= FootballDataMrg.getInstance.getDataDGByIdAndXB(id, xb);
								} else {
									temp *= FootballDataMrg.getInstance.getDataByIdAndXB(id, xb);
								}
							} else if(zqOrLq == 1) {
								if(isDG == true) {
									temp *= BasketballDataMrg.getInstance.getDataDGByIdAndXB(id, xb);
								} else {
									temp *= BasketballDataMrg.getInstance.getDataByIdAndXB(id, xb);
								}
							} else if(zqOrLq == 2) {
								if(isDG == true) {
									temp *= FootballDataMrg.getInstance.getCJDataDGByIdAndXB(id, xb);
								} else {
									temp *= FootballDataMrg.getInstance.getCJDataByIdAndXB(id, xb);
								}
							} else if(zqOrLq == 3) {
								if(isDG == true) {
									temp *= BasketballDataMrg.getInstance.getCJDataDGByIdAndXB(id, xb);
								} else {
									temp *= BasketballDataMrg.getInstance.getCJDataByIdAndXB(id, xb);
								}
							}
						}
						temp = Math.round(temp * 100 * bs) * 2;
        				temp /= 100;
						if(min == 0 || min > temp) {
							min = temp;
						}

						max += temp;
						// if(max == 0 || max < temp) {
						// 	max = temp;
						// }
						temp = 1;
					}
					
				}
			}
		}
		max = Math.round(max*100);
		max /= 100;
		return [min, max];
	}

	/**设置当前串倍数 
	 * list当前所有串数据列表
	 * cType 几串几
	 * cIndex 串下标
	 * bs 设置倍数
	*/
	public setGoldBS(list:Array<Strand>,bs:number):void {
		for(let i = 0;i<list.length;i++) {
			for(let k=0;k<list[i].listStrand.length;k++) {
				for(let l=0;l<list[i].listStrand[k].length;l++) {
					list[i].listStrand[k][l][2] = bs;
				}
			}
		}
	}

	/**
	 * zqOrLq 0足球 1篮球
	 */
	public getStrandList(list:Array<Strand>,llist:number[],zqOrLq:number,isDG:boolean):Array<BSYHData> {
		let listStrand:Array<BSYHData> = new Array<BSYHData>();
		let data:BSYHData;
		for(let i = 0;i<list.length;i++) {
			for(let j=0;j<llist.length;j++) {
				if(list[i].typeStrand - 1 == llist[j]) {
					for(let k=0;k<list[i].listStrand.length;k++) {
						data = new BSYHData();
						data.cType = list[i].typeStrand;
						data.listC1 = i;
						data.listC2 = k;
						data.len = list[i].listStrand[k].length;
						for(let l=0;l<list[i].listStrand[k].length;l++) {
							let fb:Subscription = new Subscription();
							if(zqOrLq == 0) {
								if(isDG == true) {
									fb.obj = FootballDataMrg.getInstance.getDataDGById(list[i].listStrand[k][l][0]);
								} else {
									fb.obj = FootballDataMrg.getInstance.getDataById(list[i].listStrand[k][l][0]);
								}
								
							} else if(zqOrLq == 1) {
								if(isDG == true) {
									fb.obj = BasketballDataMrg.getInstance.getDataDGById(list[i].listStrand[k][l][0]);
								} else {
									fb.obj = BasketballDataMrg.getInstance.getDataById(list[i].listStrand[k][l][0]);
								}
							} else if(zqOrLq == 2) {
								if(isDG == true) {
									fb.obj = FootballDataMrg.getInstance.getCJDataDGById(list[i].listStrand[k][l][0]);
								} else {
									fb.obj = FootballDataMrg.getInstance.getCJDataById(list[i].listStrand[k][l][0]);
								}
							} else if(zqOrLq == 3) {
								if(isDG == true) {
									fb.obj = BasketballDataMrg.getInstance.getCJDataDGById(list[i].listStrand[k][l][0]);
								} else {
									fb.obj = BasketballDataMrg.getInstance.getCJDataById(list[i].listStrand[k][l][0]);
								}
							}
							
							
							fb.xb = list[i].listStrand[k][l][1];
							data.list.push(fb);
						}
						listStrand.push(data);
					}
				}
			}
		}
		return listStrand;
	}

	/**获取优化倍数 */
	public getYHBS (list:Array<Strand>, bsYHData:BSYHData,zqOrLq:number):number {
		if(bsYHData != undefined) {
			let id:number = list[bsYHData.listC1].listStrand[bsYHData.listC2][0][0];
			let xb:number = list[bsYHData.listC1].listStrand[bsYHData.listC2][0][1];
			if(zqOrLq == 0) {
				return FootballDataMrg.getInstance.getDataByIdAndXB(id, xb);
			} else {
				return BasketballDataMrg.getInstance.getDataByIdAndXB(id, xb);
			}
		} else {
			return 1;
		}
	}

	/**设置优化倍数 */
	public setYHBS(list:Array<Strand>, bsYHData:BSYHData, bs:number):void {
		if(bsYHData != undefined) {
			for(let i=0;i<bsYHData.len;i++) {
				list[bsYHData.listC1].listStrand[bsYHData.listC2][i][2] = bs;
			}
		}
	}
}

/**倍数优化显示 */
class BSYHData {
	/**修改Strand 列表倍数的键值 总共两层*/
	public listC1:number = 0;
	public listC2:number = 0;
	public len:number = 0;

	/**串类型 */
	public cType:number;
	/**对象格子对象数据列表*/
	public list:Array<Subscription> = new Array<Subscription>();
}

/**对象 下标*/
class Subscription {
	public xb:number;
	public obj:any;
}

/**当前列表 */
class zqObjData{
	/**足球大类型id */
	public dlxId:number;
	/**小类型id列表 第一位(场次id) 第二位(下标位置) 第三位(下注倍数)*/
	public xlxIdList:number[] = [];
}

/**每串对应数据对象 */
class Strand {
	/**足球大类型id */
	public dlxId:number;
	/**注数 */
	public injectionNum:number = 0;
	/**投注倍数 默认为1*/
	public injectionMul:number = 1;
	/**类型几串几 2:(2串1) 3:(3串1) 4:(4串1) .... 最大8*/
	public typeStrand:number;
	/**排序列表 */
	public listStrand:Array<any> = new Array<any>();
}