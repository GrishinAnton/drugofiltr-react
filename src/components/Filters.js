import React from 'react';

function Filters ({onChange}) {
    
    return (
        <div className="filer-search flex flex_jc-sb flex_a-c p">
            <input className="input_img input-friends-vk" type="text" placeholder="Начните вводить имя друга" onChange={onChange} />
            <input className="input-friends-save" type="text" placeholder="Название" />
        </div>
    )
}

export default Filters