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

