import React from 'react';
import Friend from 'components/friend/Friend';
// import FriendList from 'components/friend/FriendList';


const VK = window.VK
export default class Friends extends React.Component {

    state = {
        friends: null
    }

    componentDidMount() {

        (async () => {
            await this.auth()
            const friends = await this.getUsers({ fields: 'photo_100', count: 20 });

            this.setState({
                friends: friends
            })
        })();
    }  

    render() {

        return (
            <div className="filter-body flex flex_jc-sb p">
                <div className="left-column">
                    <p className="filter-body__title">Ваши друзья</p>
                    <div className="friends-wrapper">
                        {this.state.friends &&  
                            <Friend friends={this.state.friends}/>}
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

    auth() {
        return new Promise((resolve, reject) => {

            VK.init({
                apiId: 6487256
            });
            VK.Auth.login(data => {
                if (data.session) {
                    resolve();
                } else {
                    reject(new Error('Не шмогла'));
                }
            }, 2);
        });
    }

    callAPI(method, params) {
        params.v = '5.76';

        return new Promise((resolve, reject) => {
            VK.api(method, params, (data) => {
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data.response);
                }
            });
        });
    }

    getUsers(params) {
        return this.callAPI('friends.get', params)
    }

}