import React, {useState,useEffect} from 'react';
import BookCover from '@/components/BookCover/index';
import {Radio} from 'antd'
import { fabric } from "fabric";
import './eraser_brush.mixin.js'
import './index.scss'
export default function Recommend () {
  const url = 'https://zyb-kunpeng-mkstatic-1253445850.cos.ap-beijing.myqcloud.com/%E5%B0%8F%E5%AD%A6%E4%B8%89%E5%B9%B4%E7%BA%A7%E8%AF%AD%E6%96%87%E9%83%A8%E7%BC%96%E7%89%88%E4%B8%8A%E5%86%8C_00.jpg?imageMogr2/thumbnail/200x'
  let cvs: any = {}
  const stateArr:any[] = []
  useEffect(()=> {
     cvs = new fabric.Canvas('canvasWrapper',{
      isDrawingMode: true
    })
    cvs.setBackgroundColor('#4F868A', undefined, { erasable: false })
    initPencil()
    cvs.renderAll()
  })
 
  const initPencil = () => {
    cvs.freeDrawingBrush = new fabric.PencilBrush(cvs);
    cvs.freeDrawingBrush.strokeLineCap = 'round'; // butt  round  square
    cvs.freeDrawingBrush.strokeLineJoin = 'round'; // bevel  round  miter
    cvs.freeDrawingBrush.color = 'red';
    cvs.freeDrawingBrush.width = 10;
    cvs.isDrawingMode = true;
    cvs.on('after:render', () => {
      console.log('1')
      stateArr.push(JSON.stringify(cvs))
    })
    // cvs.on('mouse:down',(e)=>{
    //   console.log(e)
    // })
    // cvs.on('mouse:move',(e)=>{
    //   console.log(e, 'move')
    // })
    // cvs.on('mouse:up',(e)=>{
    //   console.log(e, 'up')
    // })
  }
  const initEraser = () => {
    cvs.freeDrawingBrush = new fabric.EraserBrush(cvs);
    cvs.freeDrawingBrush.width = 50;
    cvs.isDrawingMode = true;
  }
  const fallback = () => {
    cvs.loadFromJSON(stateArr[stateArr.length])
  }
  const setMode = (mode: string) => {
    cvs.isDrawingMode = false;
    switch(mode) {
      case 'erase':
        initEraser()
        break;
      case 'pencil':
        initPencil();
        break;
      case 'fallback':
        fallback();
        break;
      default:
        initPencil()
    }
  }
  return (
    <div className='recommend'>
      <BookCover src={url}></BookCover>
      <div className="option">
        <Radio.Group defaultValue="pencil" buttonStyle="solid" onChange={(e)=>setMode(e.target.value)}>
          <Radio.Button value="erase">擦除</Radio.Button>
          <Radio.Button value="pencil">画笔</Radio.Button>
          <Radio.Button value="fallback">还原</Radio.Button>
        </Radio.Group>
      </div>
      <canvas id='canvasWrapper' width="800" height="600"></canvas>
    </div>
  )
}