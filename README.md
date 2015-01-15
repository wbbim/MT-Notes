
A blog/documents Site Running on NodeJS Server.

### About

关于前端不得不说的那点事：

* Css打包使用了gulp，所以，放在对应的目录下，在根目录输入gulp less即可编译压缩。
* JavaScript基于SeaJS进行模块化，所以要熟悉下SpmJs的打包和使用。
* AngularJS，前端的后台是基于AngularJS，所以如果想改东西，还是要了解一点的~

本人前端，所以很多东西，并非为了一个个人的博客站点而做，这个小东西准确的说是在工作中用来测试各种各样乱七八糟的功能的，所以你可能发现突然有个h5-player什么的，请不要骂娘，谢谢~

基于ExpressJS构建，文档源自Github，博客依赖MongoDB，认证模块使用PassportJS。

感谢用到类库作者的无私奉献以及Github。

附：

这个东西源自：

* v2ex:

	[再来讨论前后端分离的实践。](https://www.v2ex.com/t/149090#reply84)

* 我的文档站：

	[Trying-For-Separating-FrontEnd-From-BackEnd](http://www.thonatos.com/docs/MT-Experimentations/Trying-For-Separating-FrontEnd-From-BackEnd.md)
	
同时也没完全写完，但是坑好像玩得有点大，所以，先分享了，有兴趣的一起玩，没兴趣了我就自己慢慢玩..

---

### Config

默认配置在conf/config_app.js,如果在root目录发现config_local.json则优先使用私有配置。

#### Private Config


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
            "email": "thonatos",
            "passwd": "vzhibo"
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

### Api

这里的Api主要是指公共的查询接口和私有接口（私有接口都是需要登录后才能使用的）。

#### Public Api

METHOD:GET

* /posts/
* /posts/:pid
* /posts/page/:currentPage

#### Private Api

METHOD:POST

* /users/post/

METHOD:PUT

* /users/post/:pid

METHOD:DELETE

* /users/post/:pid