import { Card, Image, Popover, Statistic } from 'antd';
import Icon from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import '../static/style/components/sider.css';
import myPic from "../static/img/myPic.jpg";
import servicePath from '../config/apiUrl'
import axios from 'axios'

const GitHub = () => (
  <svg t="1662949290102" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7925" width="32" height="32"><path d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667" fill="#231F20" p-id="7926"></path></svg>
)
const GitHubIcon = (props) => <Icon component={GitHub} {...props} />;

const WeChat = () => (
  <svg t="1662948725099" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1034" width="32" height="32"><path d="M1024.16 694.816c0-149.92-143.104-271.392-319.584-271.392-176.576 0-319.68 121.504-319.68 271.392S528 966.208 704.576 966.208c55.456 0 107.648-12.096 153.184-33.248l125.984 54.528-14.592-140.544c34.784-43.392 55.04-95.808 55.04-152.128zM596.832 621.28c-25.152 0-45.472-20.352-45.472-45.472s20.32-45.472 45.472-45.472c25.12 0 45.44 20.384 45.44 45.472s-20.384 45.472-45.44 45.472z m215.392 0c-25.056 0-45.44-20.352-45.44-45.472s20.384-45.472 45.44-45.472c25.184 0 45.536 20.384 45.536 45.472s-20.352 45.472-45.536 45.472zM704.576 387.488c49.376 0 96.416 8.8 139.264 24.64 0.32-5.728 0.992-11.232 0.992-16.992 0-198.08-189.152-358.624-422.432-358.624C189.184 36.512 0.032 197.024 0.032 395.136c0 74.496 26.816 143.776 72.704 201.12L53.472 781.92l166.432-72.096c41.216 19.2 86.784 32.16 134.88 38.784-3.616-17.504-5.824-35.424-5.824-53.792 0.032-169.44 159.552-307.296 355.616-307.296z m-139.808-209.6c33.184 0 60 26.88 60 60 0 33.184-26.816 60.064-60 60.064s-60.032-26.88-60.032-60.064c0-33.152 26.88-60 60.032-60zM280.032 297.952c-33.184 0-60-26.88-60-60.064 0-33.152 26.848-60 60-60 33.184 0 60.032 26.88 60.032 60s-26.88 60.064-60.032 60.064z" fill="#51C332" p-id="1035"></path></svg>
)
const WeChatIcon = (props) => <Icon component={WeChat} {...props} />;
const WeChatContent = (
  <div>
    <Image src="http://qiujianhui.cn/pic/qrcode/WechatCode.jpg" width={150}/>
  </div>
);

const QQ = () => (
  <svg t="1662949697973" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4804" width="35" height="35"><path d="M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z" p-id="4805" fill="#7dc5eb"></path></svg>
)
const QQIcon = (props) => <Icon component={QQ} {...props} />;
const QQContent = (
  <div>
    <Image src="http://qiujianhui.cn/pic/qrcode/QQCode.png" width={150}/>
  </div>
);

function MySider () {
  const [websiteCount, setWebsiteCount] = useState({articleCnt:0, viewCnt: 0, commentCnt: 0})
  useEffect(() => {
    const fetchData = async () => {
        const result = await axios(servicePath.getWebsiteCounts).then(
            (res) => {
              return res.data
            }
        )
        setWebsiteCount(result)
    }
    fetchData()
  }, [])
  return (
    <div className="sider">
      <Card>
        <div className="sider-about" >
          <p>关于</p>
        </div>
        <Image width={150} src={myPic} />
        <div className="sider-introduce" >
            <p>Hi，我是邱健珲~</p>
            <p>正在努力成为一名全栈开发</p>
            <p>欢迎来到我的个人博客</p>
            <p>与我联系</p>
        </div>
        <div className="sider-contact">
          <div><a href='https://github.com/qjh1924'><GitHubIcon /></a></div>
          <div><Popover content={QQContent}><QQIcon /></Popover></div>
          <div><Popover content={WeChatContent}><WeChatIcon /></Popover></div>
        </div>
      </Card>
      <Card>
        <div className="sider-count" >
          <p>网站计数</p>
          <div><Statistic title="文章：" value={websiteCount.articleCnt} /></div>
          <div><Statistic title="评论：" value={websiteCount.commentCnt} /></div>
          <div><Statistic title="访问：" value={websiteCount.viewCnt} /></div>
        </div>
      </Card>
    </div>
  )
};


export default MySider;