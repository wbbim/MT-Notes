
Mt.Notes

## About

A blog/documents Site Running on NodeJS Server.

- 一个基于Github的文档站。
- 一个随手发发牢骚的轻博客。
- 一个前端学习过程的演示站。

### 干嘛造轮子呢？

曾经是wordpress死忠，但日常学习工作中需要记录一些东西，每次登录去发布，实在是有点累；而随手记录的东西，日子长了又总会找不到，于是在本地建了一个文件夹，每次存储的时候按照分类保存，时间长了发现东西好像真的很多，但更新博客又变成一件很痛苦的事情，于是乎...

看到了hexo，也使用了一下，感觉很好，但我确实比较懒，于是想想要不自己找一种更方便自己的吧，怎么方便呢？直接存好了，然后push到Github上吧；然后，问题来了，博客呢，要不要更新呢，想了想，要不就用Github的Api吧...

再者，本人前端，经常会在本地写一些测试的东西——自定义H5播放器、低版本浏览器升级提示什么，直接在公司项目上改，错了也比较麻烦，另外，每次然后lessc也是真的累，干脆就搭了NodeJS本地服务器；这里加一点，那边加一点，就变成这样一个大坑了！


### so，有啥特色？

* Css打包使用了gulp，所以，放在对应的目录下，在根目录输入gulp less即可编译压缩。
* JavaScript基于SeaJS进行模块化，所以要熟悉下SpmJs的打包和使用。
* AngularJS，前端的后台是基于AngularJS，所以如果想改东西，还是要了解一点的~

### 废话一次说完吧~

基于ExpressJS构建，文档源自Github，博客依赖MongoDB，认证模块使用PassportJS。

感谢用到类库作者的无私奉献以及Github。

附：

* [再来讨论前后端分离的实践。](https://www.v2ex.com/t/149090#reply84) （v2ex）
* [Trying-For-Separating-FrontEnd-From-BackEnd](http://www.thonatos.com/docs/MT-Experimentations/Trying-For-Separating-FrontEnd-From-BackEnd.md)


## Change

- 2015.01.16

	- 权限设置问题，邮箱与配置邮箱相同时role为管理员，其他为普通用户。
	- 登录默认进入资料页面（样式内容还没定，回头去纠缠设计师。）
	- 加了一个低版本浏览器提示的东东，暂时还没添加到所有页面。

## Config

默认配置在conf/config_app.js,如果在root目录发现config_local.json则优先使用私有配置。

### Private Config


```
{
    "site":{
        "name":"Thonatos.Yang"
    } ,
    "docRepo": {
        "github": {
            "doc_user": "thonatos",
            "doc_project": "Mt.Notes.And.Documents"
        },
        "coding": {
            "doc_user": "thonatos",
            "doc_project": "Mt.Notes.And.Documents"
        },
        "GC": "C"
    },
    "secure": {
        "cookie": {
            "name": "MT.NODE_"
        },
        "session": {
            "name": "MT.Name",
            "secret": "MT.Secret"
        },
        "administartor": {
            "email": "whatever@you.like",
        }
    },
    "runEnv": {
        "DEV": true,
        "PORT": 8084,
        "LOCAL": false,
        "SEAJS": true,
        "DEBUG": false
    }
}
```

## Api

这里的Api主要是指公共的查询接口和私有接口（私有接口都是需要登录后才能使用的）。

### Public Api

METHOD:GET

* /posts/
* /posts/:pid
* /posts/page/:currentPage

### Private Api

METHOD:POST

* /users/post/

METHOD:PUT

* /users/post/:pid

METHOD:DELETE

* /users/post/:pid