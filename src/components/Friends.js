import React from 'react';
import Friend from 'components/friend/Friend';

export default function Friends (props) {
       
    return (
        <div className="filter-body flex flex_jc-sb p">
            <div className="left-column">
                <p className="filter-body__title">Ваши друзья</p>
                <div className="friends-wrapper"
                    onDrop={(e) => props.drop(e, 'leftColumn')}
                    onDragOver={e => e.preventDefault()}>
                    {props.friends.leftColumn &&
                        <Friend 
                            friends={props.friends.leftColumn}
                            buttonClick={props.buttonClick}
                            dragStart={props.dragStart}
                            />}
                </div>
            </div>
            <div className="right-column">
                <p className="filter-body__title">Друзья в списке</p>
                <div className="friends-wrapper"
                    onDrop={(e) => props.drop(e, 'rightColumn')}
                    onDragOver={e => e.preventDefault()}>
                    {props.friends.rightColumn &&
                        <Friend 
                            friends={props.friends.rightColumn}
                            buttonClick={props.buttonClick}
                            dragStart={props.dragStart}
                        />
                    }                        
                </div>
            </div>
        </div>
    )
}