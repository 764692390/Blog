var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose.connect(DB_URL);

/*QQ用户消息*/
var Userqq = new mongoose.Schema({
    name: String,
    ret: String,
    msg: String,
    is_lost: String,
    nickname: String,
    gender: String,
    province: String,
    city: String,
    year: String,
    figureurl: String,
    figureurl_1: String,
    figureurl_2: String,
    figureurl_qq_1: String,
    figureurl_qq_2: String,
    is_yellow_vip: String,
    vip: String,
    yellow_vip_level: String,
    level: String,
    is_yellow_year_vip: String,
    openid: String,
    addtimer: String,
    updatatimer: String,
    speak: String, //发言次数
});

/*热门评论*/
var HotComment = new mongoose.Schema({
    Replyid: String, //帖子ID
    ReplyTitle: String, //帖子标题
    ReplyConten: String, //回复内容
    AddTimer: String, //回复时间
    UserName: String, //用户名称
    UserImg: String, //用户头像
    ip: {
        area: String, // "华北"
        area_id: String, //"100000"
        city: String, // "北京市"
        city_id: String, //"110100"
        country: String, //"中国"
        country_id: String, // "CN"
        county: String, //""
        county_id: String, // "-1"
        ip: String, // "106.38.41.154"
        isp: String, //"电信"
        isp_id: String, //"100017"
        region: String, // "北京市"
        region_id: String, // "110000"
    }
})

/*用户信息*/
var User = new mongoose.Schema({
    username: String, //用户名
    password: String, //密
    userimg: String, //用户头像
    state: String, //用户状态
    addtime: String, //添加时间
});

/*文章详情*/
var Article = new mongoose.Schema({
    title: String, //文章标题
    addtime: String, //文章添加时间
    abstract: String, //文章摘要
    content: String, //文章内容全部
    state: String, //状态
    stick: Boolean, //置顶
    recommend: Boolean, //推荐
    username: String, //发布者
    categoryvalue: String, //分类id
    categoryname: String, //分类名称
    coverImg: String, //文章封面
    look: String, //查看次数
    msgleng: String, //留言条数
});

/*文章分类 */
var Category = new mongoose.Schema({
    value: String, //类似id
    name: String, //分类名称
    addtime: String, //分类添加时间
    username: String, //发布者
});

/*用户列表 */
var UserList = new mongoose.Schema({
    arriveDate: String,
    blacklistState: String,
    buId: String,
    buName: String,
    cellphone: String,
    companyId: String,
    companyName: String,
    createdate: String,
    createuser: String,
    deptId: String,
    deptName: String,
    education: String,
    entryDate: String,
    firstTec: String,
    graduateDate: String,
    graduateSchool: String,
    hrState: String,
    idCard: String,
    infoex1: String,
    infoex2: String,
    infoex3: String,
    infoex4: String,
    infoex5: String,
    jobCateory: String,
    leaveDate: String,
    levelWage: String,
    listSysMngmoduleinfo: String,
    listSysMngroleinfo: String,
    loanAmount: String,
    mailbox: String,
    manageLevel: String,
    muti_buId: String,
    muti_deptId: String,
    password: String,
    personBase: String,
    positionLevel: String,
    probationWage: String,
    profession: String,
    projectState: String,
    projectStates: String,
    reportManagerId: String,
    reportManagerName: String,
    requirementId: String,
    roleId: String,
    roleName: String,
    secondTec: String,
    sex: String,
    sexName: String,
    staffCode: String,
    standardCost: String,
    supplierId: String,
    supplierName: String,
    tecCategory: String,
    telphone: String,
    urFlag: String,
    userAttribute: String,
    userAttributeName: String,
    userName: String,
    userState: String,
    userType: String,
    usercode: String,
    userid: String,
    wage: String,
    wageUnit: String,
    welfareCost: String,
    workStartTime: String,
    workYear: String,
});
/*消息列表 */
var MsgList = new mongoose.Schema({
    Replyid: String, //帖子id
    ReplyTitle: String, //帖子标题
    ReplyConten: String, //回复内容
    AddTimer: String, //回复时间
    UserName: String, //用户名称
    UserImg: String, //用户头像
    ReplyChild: [{
        ParentUser: String, //回复的父级
        ChildReplyTitle: String, //帖子标题
        ChildReplyConten: String, //回复内容
        ChildAddTimer: String, //回复时间
        ChildUserName: String, //用户名称
        ChildUserImg: String, //用户头像
    }],
    ip: {
        area: String, // "华北"
        area_id: String, //"100000"
        city: String, // "北京市"
        city_id: String, //"110100"
        country: String, //"中国"
        country_id: String, // "CN"
        county: String, //""
        county_id: String, // "-1"
        ip: String, // "106.38.41.154"
        isp: String, //"电信"
        isp_id: String, //"100017"
        region: String, // "北京市"
        region_id: String, // "110000"
    }
});

/*留言墙guestbook */
var guestbook = new mongoose.Schema({
    ReplyConten: String, //回复内容
    AddTimer: String, //回复时间
    UserName: String, //用户名称
    UserImg: String, //用户头像
    ReplyChild: [{
        ChildReplyConten: String, //回复内容
        ChildAddTimer: String, //回复时间
        ChildUserName: String, //用户名称
        ChildUserImg: String, //用户头像
        ip: {
            area: String, // "华北"
            area_id: String, //"100000"
            city: String, // "北京市"
            city_id: String, //"110100"
            country: String, //"中国"
            country_id: String, // "CN"
            county: String, //""
            county_id: String, // "-1"
            ip: String, // "106.38.41.154"
            isp: String, //"电信"
            isp_id: String, //"100017"
            region: String, // "北京市"
            region_id: String, // "110000"
        }
    }],
    ip: {
        area: String, // "华北"
        area_id: String, //"100000"
        city: String, // "北京市"
        city_id: String, //"110100"
        country: String, //"中国"
        country_id: String, // "CN"
        county: String, //""
        county_id: String, // "-1"
        ip: String, // "106.38.41.154"
        isp: String, //"电信"
        isp_id: String, //"100017"
        region: String, // "北京市"
        region_id: String, // "110000"
    }
})

/*访问日志*/
var Log = new mongoose.Schema({
    ip: {
        // area: String, // "华北"
        // area_id: String, //"100000"
        // city: String, // "北京市"
        // city_id: String, //"110100"
        // country: String, //"中国"
        // country_id: String, // "CN"
        // county: String, //""
        // county_id: String, // "-1"
        // ip: String, // "106.38.41.154"
        // isp: String, //"电信"
        // isp_id: String, //"100017"
        // region: String, // "北京市"
        // region_id: String, // "110000"
    },
    qquser: [{
        name: String,
        ret: String,
        msg: String,
        is_lost: String,
        nickname: String,
        gender: String,
        province: String,
        city: String,
        year: String,
        figureurl: String,
        figureurl_1: String,
        figureurl_2: String,
        figureurl_qq_1: String,
        figureurl_qq_2: String,
        is_yellow_vip: String,
        vip: String,
        yellow_vip_level: String,
        level: String,
        is_yellow_year_vip: String,
        openid: String,
        addtimer: String,
        updatatimer: String,
    }],
    useragent: String,
    referer: String,
    timer: String,
})

/*友链*/
var Link = new mongoose.Schema({
    LinkUrl: String,
    LinkName: String,
    LinkImg: String,
    LinkTimer: String,
    AddUser: String,
    LinkState: String
})

/*登录日志*/
var LoginLog = new mongoose.Schema({
    UserName: String,
    LoginTimer: String,
    ip: {},
    LoginState: String
})

var Models = {
    Category: mongoose.model('categorys', Category),
    User: mongoose.model('User', User),
    Userqq: mongoose.model('userqq', Userqq),
    Article: mongoose.model('articles', Article),
    UserList: mongoose.model('userlist', UserList),
    MsgList: mongoose.model('msgList', MsgList),
    HotComment: mongoose.model('hotcomment', HotComment),
    GuestBook: mongoose.model('guestbook', guestbook),
    Log: mongoose.model('log', Log),
    Link: mongoose.model('link', Link),
    LoginLog: mongoose.model('loginlog', LoginLog),
}

module.exports = Models