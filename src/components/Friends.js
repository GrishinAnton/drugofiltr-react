import React from 'react';
import Friend from 'components/friend/Friend';
// import FriendList from 'components/friend/FriendList';



export default class Friends extends React.Component {
    

    render() {
        return (
            <div className="filter-body flex flex_jc-sb p">
                <div className="left-column">
                    <p className="filter-body__title">Ваши друзья</p>
                    <div className="friends-wrapper">
                        <Friend friends={this.props}/>
                    </div>
                </div>
                <div className="right-column">
                    <p className="filter-body__title">Друзья в списке</p>
                    <div className="friends-wrapper">
                    </div>
                </div>
            </div>
        )
    }

    

}