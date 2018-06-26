const VK = window.VK

export default {
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
    },

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
    },

	getUsers(params) {
        return this.callAPI('friends.get', params)
    }
}