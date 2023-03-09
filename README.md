# 高考志愿推荐系统小程序端

## 1、创建`uni-app`项目

在`Hbuilderx`创建`uni-app`项目，选择`vue2`，`uni-ui`

## 2、创建 *我的* 页面

### 新建页面

### 创建`tabBar`

- `pages.json`添加

```json
"tabBar": {
	    "selectedColor": "#FF6500",
	    "list": [
	      {
	        "pagePath": "pages/index/index",
	        "text": "首页",
	        "iconPath": "static/icon/index.png",
	        "selectedIconPath": "static/icon/index-active.png"
	      },
	      {
	        "pagePath": "pages/my/my",
	        "text": "我的",
	        "iconPath": "static/icon/my.png",
	        "selectedIconPath": "static/icon/my-active.png"
	      }
	    ]
	  }
```

------

## 3、实现登录功能

### 1、`my`页面

1. `my`页面

   ```vue
   <template>
   	<view calss="my-container">
   		<!-- 上部个人信息 -->
   		<my-info class="my-info-container"></my-info>
   		<!-- 下部各页面 -->
   		<my-tab></my-tab>
   	</view>
   </template>
   ```

2. `my-info`组件

   ```vue
   <template>
   	<!-- 未登录 -->
   	<view class="my-info-box" :style="{ backgroundImage: bg_image }" @click="onItemClick">
   		<!-- 头像 -->
   		<view class="my-info">
   			<view class="my-info-right">
   				<image src="@/static/image/default-avatar.png" mode="scaleToFill" class="avatar" />
   			</view>
   			<view class="my-info-left">
   				<text class="my-nickname">点击一键登录</text>
   				<text class="my-more"> > </text>
   			</view>
   		</view>
   	</view>
   </template>
   
   <script>
   export default {
   	name: "my-info",
   	data() {
   		return {
   			bg_image: 'url(../../static/image/my-info-bg.png)',
   		};
   	},
   	methods: {
   		onItemClick: function () {
   			uni.navigateTo({
   				url: '/pages/login/login'
   			})
   		}
   	}
   }
   </script>
   
   <style lang="scss" scoped>
   .my-info-box {
   	position: sticky;
   	top: 0;
   	background-size: contain;
   
   	.my-info {
   		height: 215rpx;
   		width: 700rpx;
   		padding-left: 50rpx;
   		padding-top: 85rpx;
   
   		.my-info-right {
   			float: left;
   
   			.avatar {
   				height: 130rpx;
   				width: 130rpx;
   				border-radius: 50%;
   				border: 5px solid #FFF;
   			}
   		}
   
   		.my-info-left {
   			float: left;
   			height: 130rpx;
   			padding-top: 45rpx;
   
   			.my-nickname {
   				margin-left: 30rpx;
   				font-size: 20px;
   				font-weight: bold;
   			}
   
   			.my-more {
   				margin-left: 20px;
   				font-size: 20px;
   				font-weight: bold;
   				line-height: 20px;
   				color: rgba(0, 0, 0, 0.4);
   			}
   		}
   	}
   }
   </style>
   ```

------

### 2、`login`页面

1. 页面

   ```vue
   <template>
   	<view>
   		<my-login></my-login>
   	</view>
   </template>
   ```

2. `my-login`组件

   ```vue
   <template>
   	<view class="my-container">
   		<!-- 用户未登录 -->
   		<block>
   			<image class="avatar avatar-img" src="/static/icon/logo.png" mode="aspectFill" />
   			<view class="login-desc">登录后可同步数据</view>
   			<button class="login-btn"  @click="getUserInfo">微信用户一键登录</button>
   		</block>
   	</view>
   </template>
     
   <script>
   export default {
   	name: 'my-login',
   	data() {
   		return {};
   	},
   	methods: {}
   };
   </script>
     
   <style lang="scss" scoped>
   .my-container {
   	display: flex;
   	flex-direction: column;
   	align-items: center;
   	padding-top: 20%;
   
   	.avatar-img {
   		width: 240px;
   		height: 240px;
   	}
   
   	.login-desc {
   		color: $uni-text-color-grey;
   		font-size: $uni-font-size-base;
   		margin-top: $uni-spacing-col-big;
   	}
   
   	.login-btn {
   		background-color: #5AC725;
   		color: #fff;
   		margin-top: $uni-spacing-col-big;
   		width: 85%;
   	}
   }
   </style>
   ```

------

### 3.封装网络请求组件

1. 创建`utils`文件夹

2. 创建`request.js`文件

   ```javascript
   const BASE_URL = 'http://10.1.44.246:8999/api';
   function request({ url, data, method }) {
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
         }
       });
     });
   }
   
   export default request;
   ```

------

## 4、创建全局管理组件vuex

### 1、新建`store`文件夹

- `index.js`

  ```javascript
  import Vue from 'vue';
  import Vuex from 'vuex';
  
  import search from './modules/search';
  import user from './modules/user';
  
  Vue.use(Vuex);
  
  const store = new Vuex.Store({
      modules: {
          search,
          user
      }
  });
  
  export default store;
  ```

### 2、注册vuex组件

- `main.js`

  ```javascript
  // 导入 vuex 实例
  import store from './store';
  
  const app = new Vue({
      ...App,
      store
  })
  ```

------

## 5、登陆操作

### 1、`my-login`组件

```vue
<script>
import { getOpenid } from '@/api/user';
import { mapActions } from 'vuex';

export default {
	name: 'my-login',
	data() {
		return {
			code: '123'
		};
	},
	methods: {
		...mapActions('user', ['login']),
		getUserInfo: function () {
			const that = this;
			// 展示加载框
			uni.showLoading({
				title: "加载中"
			});

			//获取用户信息
			uni.getUserProfile({
				desc: "登陆后可同步数据",
				success: function (obj) {
					// 获取code
					uni.login({
						provider: uni.getProvider(), //使用微信登录
						onlyAuthorize: true,
						success: async function ({ code }) {
							const { data: res } = await getOpenid({ code: code });
							// 调用login方法进行登录
							that.login({ userProfile: obj, openid: res.openid });
						}
					});
				},
				fail: function () {
					uni.showToast({
						title: '授权已取消',
						icon: 'error',
						mask: true
					})
				}
			});

			// 关闭加载框
			uni.hideLoading();
		}
	}
};
</script>
```

### 2、store
