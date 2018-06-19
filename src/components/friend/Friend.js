import React from 'react';

function Friend(props){
    console.log(props, 'frined')
    return (
        <div className="friends-item flex flex_a-c" draggable="true" data-id="">
            <div className="friends-item__img flex">
                <img src="" alt="" />
            </div>
            <div className="friends-item__title">
                <p></p>
            </div>
            <div className="friends-item__button flex">
                <button className="button button-item js-button"></button>
            </div>
        </div>
    )
}

export default Friend