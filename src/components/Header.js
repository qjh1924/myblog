import React, {useState, useEffect} from 'react'
import {Row, Col, Menu, Icon} from 'antd'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import servicePath from '../config/apiUrl'
import '../static/style/components/header.css'

function Header () {
    const history = useHistory()
    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])

    const handleClick = (e) => {
        if(e.key < 1) {
            history.push('/')
        }else{
            history.push('/list/'+e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={18} sm={12} md={12} lg={12} xl={12}>
                    <span className="header-logo"><a href="/">小邱学技术</a></span>
                    <span className="header-txt">记录成长，分享感悟。</span>
                </Col>

                <Col className="memu-div" xs={6} sm={12} md={12} lg={12} xl={12}>
                    <Menu  mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <Icon type="home" />
                            主页
                        </Menu.Item>
                        {
                            navArray.map(item => {
                                return (
                                    <Menu.Item key={item.id}>
                                        <Icon type={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header