import React from 'react';

function Filters ({onChange, value}) {   
    
    return (
        <div className="filer-search flex flex_jc-sb flex_a-c p">
            <input className="input_img input-friends-vk" type="text" placeholder="Начните вводить имя друга" 
                onChange={onChange}
                value={value.left}
                name='left'
            />
            <input className="input-friends-save" type="text" placeholder="Название" 
                onChange={onChange}
                value={value.right}
                name='right'
            />
        </div>
    )
}

export default Filters