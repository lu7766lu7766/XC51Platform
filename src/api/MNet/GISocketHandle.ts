interface GISocketHandle {
	handlePro(data:egret.ByteArray);
	closeCall();
	completeCall();
}

interface GIProHandle{
	handleData(data:egret.ByteArray);
}
