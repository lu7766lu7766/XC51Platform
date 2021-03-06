/**跟单数据表 */
class GD_DetailData{
    public oid:string;
    public id:string;
    public txSrc:string;
    public txName:string;
    /**最近几场 */
    public ji:string;
    /**最近中场 */
    public zh:string;
    /**最近场数结果 [0,1,1,0,1,0] */
    public endArr:number[];
    /**回报率 */
    public lv:string;
    /**宣言 */
    public declare:string;
    /**自购金额 分 */
    public total:number;
    /**跟单金额 分 */
    public g_total:number;
    /**预计回报 分 */
    public hr:number;
    /**跟单佣金 */
    public rate:number;
    /**跟单用户数量 */
    public num:number;
    /**0不公开 1公开 2截止后公开 3保密  */
    public model:number;
    /**t:1 0待开奖 1未开奖 2已中奖 */
    public t:number;
    /**中奖金额 */
    public money:number;
    /**0不公开数据 1公开数据 */
    public k:number;
    /**1单关 2:2串1 3:3串1 */
    public _type:number;
    /**倍数 */
    public _b:number;
    /**vip */
    public vip:string;
    /**1足球串 2足球单 3篮球串 4篮球单 */
    public _typeStatic:number;
    /**截止时间 */
    public endTime:number;

    /**用户list */
    public GD_UserItem:GHashMap<GD_UserList>;
    /**方案list */
    public GD_detailItem:GHashMap<GD_detailSubdata>;

    constructor(){
        this.GD_detailItem = new GHashMap<GD_detailSubdata>();
        this.GD_UserItem = new GHashMap<GD_UserList>();
    }
}

/**详情 */
class GD_detailSubdata{
    /**联赛名称 */
    public len_name:string;
    /**日期 */
    public day:string;
    public team_a_name:string;
    public team_b_name:string;
    /**主胜 客胜 */
    public want:string[];
    /**结果 */
    public result:string[];
    /**时间 */
    public _time:number;
    /**状态 1：未开赛 2：进行中 3：已结束 */
    public _static:number;
}

/**跟单用户 */
class GD_UserList{
    public id;
    public userName:string;
    /**分 */
    public userMoney:number;
    /**时间 */
    public timeNum:number;
    /**头像 */
    public tx:string;
}