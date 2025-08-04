import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { List, Input, Button, Form, Avatar, Skeleton, message, Card } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/style/components/message.css'

function MyMessage (props) {
    const params = useParams();
    const [ messages, setMessages] = useState([])
    const [ loading, setLoading] = useState(true)
    let articleId = props.id
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getMessagesById + params.id).then(
                (res) => {
                    return res.data
                }
            )
            setMessages(result)
            setLoading(false)
        }
        fetchData()
    }, [articleId])
    const { TextArea } = Input;

    const formItemLayout  =  {
        labelCol: { span: 2 },
        wrapperCol: { span: 22 },
    };

    const buttonItemLayout  = {
      wrapperCol: { span: 22, offset: 2, },
    };

    const postData = {
        message: '',
        nickname: '',
        email: '',
        addTime: 0,
        article_id: 0,
        if_display: 1
    }

    const submitMessage = () => {
        console.log(postData)
        if (postData.message === ''){
            message.error('留言内容为空')
            return false
        } else if (postData.nickname === ''){
            message.error('昵称为空')
            return false
        } else if (postData.email === ''){
            message.error('邮箱地址为空')
            return false
        } else if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(postData.email))) {
            message.error('请输入正确格式的邮箱')
            return false
        } else {
            postData.addTime = Date.parse(new Date())/1000
            postData.article_id = articleId
            axios({
                method:'POST',
                url:servicePath.addMessage,
                data:postData,
                withCredentials: true
            }).then(
                res=>{
                    if(res.data.isSuccess){
                        message.success('留言成功')
                    }else{
                        message.error('留言失败');
                    }
                }
            )
        }
    }

    const getNickName = e => {
        postData.nickname = e.target.value
    }

    const getMessage = e => {
        postData.message = e.target.value
    }
    
    const getEmail = e => {
        postData.email = e.target.value
    }
    
    function debounce(func, wait) {
        let timer;
        return function() {
          let args = arguments; // arguments中存着e
          if (timer) clearTimeout(timer);
     
          timer = setTimeout(() => {
            func.apply(this, args)
          }, wait)
        }
    }

    function beautify_time(timestamp){
        var mistiming = Math.round(new Date() / 1000)-timestamp;
        var postfix = mistiming>0 ? '前' : '后'
        mistiming = Math.abs(mistiming)
        var arrr = ['年','个月','星期','天','小时','分钟','秒'];
        var arrn = [31536000,2592000,604800,86400,3600,60,1];
    
        for(var i=0; i<7; i++){
            var inm = Math.floor(mistiming/arrn[i])
            if ( inm !== 0 ){
                return inm+arrr[i] + postfix
            }
        }
    }

    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    return (
        <Card>
            <Skeleton loading={loading} active paragraph={{ rows: 8 }} >
                <div className="creatMessage-box">
                    <Form {...formItemLayout}>
                        <Form.Item name="message" label="留言" rules={[{ required: true, message: '留言内容为空!' }]}>
                            <TextArea placeholder="在此输入留言" onInput={debounce(getMessage, 500)} />
                        </Form.Item>
                        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '邮箱为空!' }]}>
                            <Input placeholder="在此输入您的邮箱地址" onInput={debounce(getEmail, 500)}/>
                        </Form.Item>
                        <Form.Item name="nickname" label="昵称" rules={[{ required: true, message: '昵称为空!' }]}>
                            <Input placeholder="在此输入您的昵称" onInput={debounce(getNickName, 500)}/>
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" htmlType="submit" onClick={()=>{submitMessage()}}>
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="message-box">
                    <List
                        header="最新留言"
                        itemLayout="vertical"
                        dataSource={messages}
                        renderItem={item => (
                        <List.Item>
                            <span className='message-time'>{beautify_time(item.addTime)}</span>
                            <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: ColorList[parseInt(Math.random()*4)], verticalAlign: 'middle' }} size="large">{item.nickname[0]}</Avatar>}
                                title={item.nickname}
                                description={item.message}
                            />
                        </List.Item>
                        )}
                    />
                </div>
            </Skeleton>
        </Card>
    )
}
export default MyMessage