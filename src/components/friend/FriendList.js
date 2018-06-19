import React from 'react';
import Friend from 'components/friend/Friend';

const VK = window.VK
export default class FriendList extends React.Component {
    
    componentWillMount(){

        (async () => {
            await this.auth()
            const friends = await this.getUsers({ fields: 'photo_100', count: 20 });
            this.friendsList(friends)
        })();
        
    }

    render () {

        return (
            <div>
                {/* <p>{ this.friendsList }</p> */}
                <Friend />
            </div>
            
        )
    }

    friendsList(friends) {
        console.log(friends.items)
        return friends.items
    }

    auth(){
        return new Promise((resolve, reject ) => {

            VK.init({
                apiId: 6487256
            }); 
            VK.Auth.login(data => {
                if (data.session) {
                    resolve();
                } else {
                    reject(new Error('Не шмогла'));
                }
            },2);
        });
    } 

    callAPI(method, params) {
        params.v = '5.76';
    
        return new Promise((resolve, reject ) => {
            VK.api(method, params, (data) => {
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data.response);
                }
            });
        });
    }

    getUsers(params){
        return this.callAPI('friends.get', params)
    }
}