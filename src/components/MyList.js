import React, { useState, useEffect } from 'react';
import { Card, Timeline, Tag, Space, Row, Col, Empty, Breadcrumb } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import '../static/style/components/content.css'
import servicePath from '../config/apiUrl'
import axios from 'axios'
import { useParams, useNavigate } from "react-router-dom";
  

function MyList () {
    const navigate = useNavigate();
    const params = useParams();
    const [articleList, setArticleList] = useState([])
    useEffect(() => {
      const fetchData = async () => {
          const result = await axios(servicePath.getListById + params.id).then(
              (res) => {
                return res.data
              }
          )
          setArticleList(result)
      }
      fetchData()
    }, [params.id])
    const toDetailed = (id)=>{
        navigate('/blog/'+id)
    }
    const tagColors = ['gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple', 'magenta', 'red', 'volcano', 'orange']
    let colorIndex = 0
    if (articleList.length) {
        return (
            <div className='content'>
                <Card>
                    <div className="bread-div">
                        {
                            function showBreadCrumb () {
                                if (articleList.length > 0) {
                                    return (
                                        <Breadcrumb>
                                        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                        <Breadcrumb.Item>{articleList[0].typeName}</Breadcrumb.Item>
                                        </Breadcrumb>
                                    )
                                }
                            }()
                        }
                    </div>
                    <Timeline>
                        {
                            articleList.map(item => {
                                return (
                                    <Timeline.Item color="#777" dot={<SendOutlined />}>
                                        <div className="content-timer">Post on {item.addTime}</div>
                                        <Card onClick={()=>toDetailed(item.id)}>
                                            <Row>
                                                <Col xs={0} sm={0} md={24} lg={24} xl={24}>
                                                    <Space>
                                                        <div className="content-title">{item.title}</div>
                                                        {
                                                            item.tags.split(',').map( tag => {
                                                                if (colorIndex === tagColors.length) {
                                                                    colorIndex = 0
                                                                }
                                                                return (
                                                                    <Tag color={tagColors[colorIndex++]}>{tag}</Tag>
                                                                )
                                                            })
                                                        }
                                                    </Space>
                                                </Col>
                                                <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                                                    <div className="content-title">{item.title}</div>
                                                    <div className="content-tag">
                                                        {
                                                            item.tags.split(',').map( tag => {
                                                                if (colorIndex === tagColors.length) {
                                                                    colorIndex = 0
                                                                }
                                                                return (
                                                                    <Tag color={tagColors[colorIndex++]}>{tag}</Tag>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div className="content-intro">
                                                {item.introduce}
                                            </div>
                                        </Card>
                                    </Timeline.Item>
                                )
                            })
                        }
                    </Timeline>
                </Card>
            </div>
        )
    } else {
        return (
            <Empty />
        )
    }
    
}

export default MyList;