// class Choose implements IProHandle {
// 	private static _mInstance: Choose;
// 	public static get getInstance(): Choose {
// 		if (Choose._mInstance == undefined)
// 			Choose._mInstance = new Choose();
// 		return Choose._mInstance;
// 	}
// 	/**对象key */
// 	private data: HttpData;
// 	private constructor() {
// 		this.data = new HttpData();
// 		this.data.mKey = "Choose";
// 	}
// 	public sendHttp(pid,contentText?:string): void {
// 		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/choose.php";
// 		// let content = "id=" + UserData.getInstance.userId + "&o=" + UserData.getInstance.orderId+"&rkey="+UserData.getInstance.key+"&ver="+HTTPRequest.getInstance.Ver+"&pid="+pid;
// 		let content = `pid=${pid}&sign=${UserData.getInstance.orderId}&rkey=${UserData.getInstance.key}&ver=${GameValue.Ver}`;
// 		if(contentText!=undefined)
//             HTTPRequest.getInstance.proSend(url,content+contentText, this.data);
//         else
//             HTTPRequest.getInstance.proSend(url, content, this.data);
// 	}
// 	public backHTTP(res: boolean, httpObj: egret.HttpRequest, data: HttpData): void {
//         if (res == true && httpObj.response != "") {//请求成功
//             let text: Object;
//             // window["alertMsg"]("返回："+httpObj.response);
//             try {
// 				text = JSON.parse(httpObj.response);
// 			} catch (error) {
// 				// Alertpaner.getInstance.show(`请求失败：${text['p']}`);
// 				return;
// 			}
//             if(text["res"]!="0"){
//                 Alertpaner.getInstance.show(text["res"]+":"+text["msg"]);
//             }
//             let pid = text["pid"];
//         }
//     }
// } 
//# sourceMappingURL=Choose.js.map