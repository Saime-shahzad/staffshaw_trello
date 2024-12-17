import { Input } from 'antd'
import "./Input.css"
import React, { forwardRef } from 'react';
import icons from '../icons';


// export const Inputs = ({
//     prefix=false,
//     placeholder,
//     value,
//     color,
//     className,
//     ref
// }) => {
//   return (
//     <div className='parantclass'  >
// <Input  prefix={prefix} ref={ref} placeholder={placeholder} className={className} style={{backgroundColor:color}}  value={value}  />


//     </div>
//   )
// }


export  const Inputs = forwardRef(({   prefix=false,
  placeholder,
  value,
  color,type,onChange,
  autoComplete,
  disabled,
  className,onCloseClick, suffix}, ref) => {

 

  return <Input  disabled={disabled ? true : false} prefix={prefix}  autoComplete={autoComplete}
  iconRender={(visible) => (visible ? icons.eyeInVisibleIcon : icons.eyeVisibleIcon)}
  onChange={onChange} ref={ref} type={type} placeholder={placeholder} suffix={
    <div onClick={onCloseClick} style={{cursor:"pointer"}}>
{suffix}
    </div>
    
    } className={className} style={{backgroundColor:color}}  value={value}  />
  
});

