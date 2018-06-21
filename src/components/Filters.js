import React from 'react';

function Filters({ onChange, leftFilter, rightFilter}) {     
    
    return (
        <div className="filer-search flex flex_jc-sb flex_a-c p">
            <input className="input_img input-friends-vk" type="text" placeholder="Начните вводить имя друга" 
                onChange={onChange}
                value={leftFilter}
                name='leftFilter'
            />
            <input className="input-friends-save" type="text" placeholder="Название" 
                onChange={onChange}
                value={rightFilter}
                name='rightFilter'
            />
        </div>
    )
}

export default Filters