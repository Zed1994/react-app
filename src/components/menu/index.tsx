import React from 'react';
import {NavLink} from 'react-router-dom';
import './index.scss';
export default function Menu() {
  const nav = [{
    title: '精准备课',
    list: [{
      title: '资源推荐',
      path: 'recommend',
      icon: 'recommend',
    }]
  }, {
    title:'教学中心',
    list: [{
      title: '我的备课本',
      path: 'prepare',
      icon: 'prepare'
    }, {
      title: '我的云盘',
      path: 'cloud',
      icon: 'cloud'
    },{
      title: '我的课本',
      path: 'book',
      icon: 'book'
    }]
  }]
  return (
    <div className="menu">
      {nav.map((group, index) => {
        return(
          <div className="menu-nav-item" key={index}>
            <div className="menu-nav-item-title">{group.title}</div>
            {group.list.map((item, itemIndex) => {
              return(
              <NavLink 
                className='link' 
                to={item.path} 
                key={itemIndex}
                style={({ isActive }) => ({
                  color: isActive ? "#4781ff" : "",
                })} >
                <div className='menu-nav-item-link'>
                  <span className='nav-icon'></span>
                  {item.title}
                </div>
              </NavLink>)
            })}
          </div>
        )
      })}
    </div>
  )
}