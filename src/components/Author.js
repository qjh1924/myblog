import {Avatar,Divider} from 'antd'
import '../static/style/components/author.css'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="http://qiujianhui.top/pic/avatar/avatar.png" /></div>
            <div className="author-introduction">
                一只不断学习中的前端小菜鸡<br />
                会点C/C++/Python/JS/ASP<br />
                立志做一个对社会有用的人<br />
                欢迎关注我的个人公众号：小邱学技术
                <Divider>社交账号</Divider>
                <a href="https://github.com/qjh1924"><Avatar size={28} icon="github" className="account"/></a>
                <div className="showCode">
                    <Avatar size={28} icon="qq"  className="account" />
                    <img src="http://qiujianhui.top/pic/qrcode/QQCode.png" className="displayQQCode" alt="myQQCode" />
                </div>
                <div className="showCode">
                    <Avatar size={28} icon="wechat"  className="account" />
                    <img src="http://qiujianhui.top/pic/qrcode/WechatCode.jpg" className="displayQQCode" alt="myWechatCode" />
                </div>
            </div>
        </div>
    )
}

export default Author