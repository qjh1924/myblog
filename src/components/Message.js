import React, {useState, useEffect, useRef} from 'react'
import { List, Input, Button, Form, Avatar, Skeleton, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/style/components/message.css'

function Message (props) {
    const [ messages, setMessages] = useState([])
    const [ loading, setLoading] = useState(true)
    let articleId = props.id
    const firstUpdate = useRef(true);
    
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;  // 渲染时不执行，因为id还没拿到
            return;
        } else {
            const fetchData = async () => {
                const result = await axios(servicePath.getMessagesById + articleId).then(
                    (res) => {
                        return res.data.data
                    }
                )
                setMessages(result)
                setLoading(false)
            }
            fetchData()
        }
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
        addTime: 0,
        article_id: 0,
        if_display: 0
    }

    const submitMessage = () => {
        if (postData.message === ''){
            message.error('留言内容为空')
            return false
        } else if (postData.nickname === ''){
            message.error('昵称为空')
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

    // function debounce(fn,delay){  // 想给输入框加个防抖的，还有点问题，待完成。。。
    //     let timer = null //借助闭包
    //     return function () {
    //         if(timer){
    //             clearTimeout(timer) 
    //         }
    //         timer = setTimeout(fn,delay) // 简化写法
    //     }
    // }

    const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
    return (
        <div>
            <Skeleton loading={loading} active paragraph={{ rows: 8 }} >
                <div className="creatMessage-box">
                    <Form {...formItemLayout}>
                        <Form.Item name="message" label="留言" rules={[{ required: true, message: '留言内容为空!' }]}>
                            <TextArea placeholder="在此输入留言，审核通过后予以展示" onInput={getMessage} />
                        </Form.Item>
                        <Form.Item name="nickname" label="昵称" rules={[{ required: true, message: '昵称为空!' }]}>
                            <Input placeholder="在此输入您的昵称" onInput={getNickName}/>
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
                            <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: ColorList[parseInt(Math.random()*4)], verticalAlign: 'middle' }} size="large">{item.nickName[0]}</Avatar>}
                                title={item.nickName}
                                description={item.messageInfo}
                            />
                            <div className='message-time'>
                                提交于:&nbsp;{item.addTime}
                            </div>
                        </List.Item>
                        )}
                    />
                </div>
            </Skeleton>
        </div>
    )
}
export default Message