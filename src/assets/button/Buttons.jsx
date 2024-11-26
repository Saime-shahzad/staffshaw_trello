import React from 'react'
import { Button } from 'antd';
import colors from '../colors/color';
export const Buttons = ({text,  onClick , className }) => {
  return (
    <div className='ant-btn-parrent'>

<Button onClick={onClick}  className={className} style={{backgroundColor:colors.buttonColor}}>{text}</Button>
   </div>
  )
}
