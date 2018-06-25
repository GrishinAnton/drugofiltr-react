import React from 'react';

function Filters({ handlerFilterChange, leftFilter, rightFilter}) {     
    
    return (
        <form onChange={(e) => handlerFilterChange(e)} className="filer-search flex flex_jc-sb flex_a-c p">
            <input className="input_img input-friends-vk" type="text" placeholder="Начните вводить имя друга" 
                value={leftFilter}
                name='leftFilter'
            />
            <input className="input-friends-save" type="text" placeholder="Название" 
                value={rightFilter}
                name='rightFilter'
            />
        </form>
    )
}

export default Filters