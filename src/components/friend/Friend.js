import React from 'react';

export default function Friend({ friends, dragStart, buttonClick}){

    return (
        <div>
            {friends
                .map(item =>
                    <div className={`friends-item flex flex_a-c ${item.className}`} 
                        draggable
                        key={item.id} 
                        data-id={item.id} 
                        onDragStart={e=>dragStart(e, item.id)}                       
                        >
                        <div className="friends-item__img flex">
                            <img src={item.photo_100} alt="" />
                        </div>
                        <div className="friends-item__title">
                            <p>{item.first_name} {item.last_name}</p>
                        </div>
                        <div className="friends-item__button flex">
                            <button className="button button-item js-button" onClick={buttonClick}></button>
                        </div>
                    </div>
                )}
        </div>            
    )
}