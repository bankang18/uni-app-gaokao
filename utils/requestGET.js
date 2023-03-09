const BASE_URL = 'http://10.1.44.246:8999/api';
function requestGET({ url, data, method }) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: BASE_URL + url,
            data,
            method,
            success: ({ data }) => {
                if (data.success) {
                    resolve(data);
                } else {
                    uni.showToast({
                        title: data.message,
                        icon: 'none',
                        mask: true,
                        duration: 3000
                    });
                    reject(data.message);
                }
            },
            fail: (error) => {
                reject(error);
            },
            complete: () => {
                // 关闭加载
                uni.hideLoading();
            }
        });
    });
}

export default requestGET;