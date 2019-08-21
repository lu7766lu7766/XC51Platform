class FontMgr {
	/**Din 40px 0x999999 */
	public static FONT_1: string = 'Din400x999999';
	/**Din 32 0xffffff */
	public static FONT_2: string = 'Din320xffffff';
	/**0xf72e52 */
	public static FONT_3: string = '0xf72e52';

	public static preloadRes(loadMod: GLoadModule): void {
		// loadMod.GaddItem('resource/assets/font/' + FontMgr.FONT_1 + '.fnt');
		// loadMod.GaddItem('resource/assets/font/' + FontMgr.FONT_3 + '.fnt');
	}

	public static getText(font: string): egret.BitmapText {
		let text = new egret.BitmapText();
		// text.font = GResCache.getRes('resource/assets/font/' + font + '.fnt');
		RES.getResByUrl('resource/assets/font/' + font + '.fnt',(e)=>{
			text.font = e;
		},this);
		return text;
	}
}