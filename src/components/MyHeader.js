import React, { useState, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import servicePath from '../config/apiUrl'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../static/style/components/header.css'

function MyHeader () {
  const navigate = useNavigate();
  const [articleTypes, setArticleTypes] = useState([{key: '0', label: '加载中'}]);
  useEffect(() => {
    const fetchData = async () => {
        const result = await axios(servicePath.getTypeInfo).then(
            (res) => {
                return res.data
            }
        )
        articleTypes.pop()
        result.forEach(element => {
          articleTypes.push({ key: element.id, label: element.type})
        });
        setArticleTypes(articleTypes)
    }
    fetchData()
  }, [])
  const toList = (e) => {
    navigate('/list/'+e.key)
  };
  const menu = (
    <Menu
      onClick={toList}
      items={articleTypes}
    />
  )
  return (
      <div>
          <span className="header-logo"><a href="/">Qiu's Blog</a></span>
          <Dropdown overlay={menu} className="header-archive">
              <a onClick={(e) => e.preventDefault()}>
                  <Space>
                      分类<DownOutlined />
                  </Space>
              </a>
          </Dropdown>
      </div>
  )
}

export default MyHeader