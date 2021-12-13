import React,{useState, useEffect} from 'react'
import {Row, Col , List, Icon, Breadcrumb} from 'antd'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import axios from 'axios'
import servicePath from '../config/apiUrl'

import 'antd/dist/antd.css'
import '../static/style/pages/comm.css'

function ArticleList (props) {

  const [ mylist , setMyList ] = useState([])

  let tmpId = props.match.params.id

  useEffect(() => {
    const getArticleListByID = async () =>{
      const result = await axios({
              method:'get',
              url: servicePath.getListById + tmpId,
              withCredentials: true,
              header:{ 'Access-Control-Allow-Origin':'*' }
      }).then(
        res => {
          return res.data.data
        }
      )
      setMyList(result)
    }
    getArticleListByID()
  },[tmpId])

  document.title = "文章列表 - 邱健珲的个人博客"

  const toDetailed = (id,checked)=>{
    props.history.push('/blog/'+id)
  }

  return(
    <div>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div className="bread-div">
            {
              function showBreadCrumb () {
                if (mylist.length > 0) {
                  return (
                    <Breadcrumb>
                      <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                      <Breadcrumb.Item>{mylist[0].typeName}</Breadcrumb.Item>
                    </Breadcrumb>
                  )
                }
              }()
            }
            </div>
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
export default ArticleList