import React from 'react';
import { Checkbox } from 'antd';
// const onChange = (e) => {
//   console.log(`checked = ${e.target.checked}`);
// };
const CheckBox = (({label , icon , onChange }) => {

return(
    <div className='parrent d-flex   '>
        <Checkbox onChange={onChange} className=''> 
        </Checkbox>
    <div className='iconParrent mx-2'>
        {icon}
        
        </div> 
    
    <div className='labelParrent'>

    {label}
    </div>

    </div>

)

})
export default CheckBox;