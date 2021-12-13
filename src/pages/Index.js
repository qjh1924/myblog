import React,{useState, useEffect} from 'react'
import {Row, Col , List, Icon} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Index (props) {
  const [ mylist , setMylist ] = useState([]);
  useEffect(() => {
    const getArticleList = async () => {
      const result = await axios(servicePath.getArticleList).then(
        (res)=>{
          return res.data.data
        }
      )
      setMylist(result)
    }
    getArticleList()
  }, [])

  document.title = "邱健珲的个人博客 - qiujianhui.top"

  //跳转文章详情页
  const toDetailed = (id,checked)=>{
    props.history.push('/blog/'+id)
  }

  return(
    <div>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
        <div>    
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title" onClick={()=>toDetailed(item.id)}>
                  {item.title}
                </div>
                <div className="list-icon">
                  <span><Icon type="calendar" /> {item.addTime}</span>
                  <span><Icon type="folder" /> {item.typeName}</span>
                  <span><Icon type="fire" /> {item.view_count}人</span>
                </div>
                <div className="list-context">{item.introduce}</div>
                  <div className="get-full-context" onClick={()=>toDetailed(item.id)}>
                    <Icon type="file" />&nbsp;
                    查看全文 &gt;
                  </div>
              </List.Item>
            )}
          />    
        </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default Index