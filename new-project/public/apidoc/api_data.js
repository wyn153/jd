define({ "api": [
  {
    "group": "商品信息",
    "type": "get",
    "url": "/api/pro",
    "title": "获取商品数据",
    "version": "0.0.0",
    "description": "<p>请求所有商品数据，哈哈</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})\nres.send({\n    code:201,\n    title:\"请求失败\",\n    msg:\"NOT DATA\"\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/pro"
      }
    ],
    "filename": "api/pro.js",
    "groupTitle": "商品信息",
    "name": "GetApiPro"
  },
  {
    "group": "商品信息",
    "type": "get",
    "url": "/api/pro/detail",
    "title": "获取商品详情数据",
    "version": "0.0.0",
    "description": "<p>请求指定商品详情数据，嘿嘿</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>要获取的商品详情的商品id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data[0]\n})\nres.send({\n    code:201,\n    title:\"请求失败\",\n    msg:\"NOT DATA\"\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/pro/detail"
      }
    ],
    "filename": "api/pro.js",
    "groupTitle": "商品信息",
    "name": "GetApiProDetail"
  },
  {
    "group": "商品信息",
    "type": "get",
    "url": "/api/pro/kind",
    "title": "获取商品分类",
    "version": "0.0.0",
    "description": "<p>获取商品分类</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/pro/kind"
      }
    ],
    "filename": "api/pro.js",
    "groupTitle": "商品信息",
    "name": "GetApiProKind"
  },
  {
    "group": "商品信息",
    "type": "get",
    "url": "/api/pro/page",
    "title": "获取指定分页数据",
    "version": "0.0.0",
    "description": "<p>获取指定分页数据</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num",
            "defaultValue": "10",
            "description": "<p>单页要显示的数据条数，默认单页10条</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "index",
            "defaultValue": "0",
            "description": "<p>查询的页码，默认为0，表示第一页</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/pro/page"
      }
    ],
    "filename": "api/pro.js",
    "groupTitle": "商品信息",
    "name": "GetApiProPage"
  },
  {
    "group": "商品信息",
    "type": "get",
    "url": "/api/pro/search",
    "title": "模糊搜索商品名称",
    "version": "0.0.0",
    "description": "<p>模糊搜索商品名称，嘻嘻</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sKey",
            "description": "<p>要搜索的关键字</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})\nres.send({\n    code:201,\n    title:\"请求成功，但是没有数据\",\n    msg:\"NOT DATA\"\n})\nres.send({\n    code:202,\n    title:\"请求失败\",\n    msg:\"NOT DATA\"\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/pro/search"
      }
    ],
    "filename": "api/pro.js",
    "groupTitle": "商品信息",
    "name": "GetApiProSearch"
  },
  {
    "group": "商品信息",
    "type": "get",
    "url": "/api/pro/sort",
    "title": "获取根据指定字段排序数据",
    "version": "0.0.0",
    "description": "<p>获取根据指定字段排序数据</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "col",
            "defaultValue": "price",
            "description": "<p>要排序的字段</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "direct",
            "defaultValue": "1",
            "description": "<p>升序或降序，1表示升，-1表示降</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/pro/sort"
      }
    ],
    "filename": "api/pro.js",
    "groupTitle": "商品信息",
    "name": "GetApiProSort"
  },
  {
    "group": "搜索关键字",
    "type": "get",
    "url": "/api/search",
    "title": "获取搜索关键字",
    "version": "0.0.0",
    "description": "<p>获取搜索关键字</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>正在搜索商品的用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/search"
      }
    ],
    "filename": "api/search.js",
    "groupTitle": "搜索关键字",
    "name": "GetApiSearch"
  },
  {
    "group": "搜索关键字",
    "type": "post",
    "url": "/api/search/add",
    "title": "添加搜索关键字",
    "version": "0.0.0",
    "description": "<p>添加搜索关键字</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>正在搜索商品的用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>搜索关键字</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/search/add"
      }
    ],
    "filename": "api/search.js",
    "groupTitle": "搜索关键字",
    "name": "PostApiSearchAdd"
  },
  {
    "group": "用户信息管理",
    "type": "get",
    "url": "/api/user/exit",
    "title": "退出",
    "version": "0.0.0",
    "description": "<p>退出</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"退出成功\",\n    msg:\"无\"\n})\nres.send({\n    code:201,\n    title:\"登录信息失效，请重新登录\",\n    msg:err\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/exit"
      }
    ],
    "filename": "api/user.js",
    "groupTitle": "用户信息管理",
    "name": "GetApiUserExit"
  },
  {
    "group": "用户信息管理",
    "type": "get",
    "url": "/api/user/login",
    "title": "登录",
    "version": "0.0.0",
    "description": "<p>登录</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"登录成功\",\n    msg:data[0].userId,\n    token\n})\nres.send({\n    code:201,\n    title:\"用户名或手机号未注册\",\n    msg:\"无\"\n})\nres.send({\n    code:202,\n    title:\"密码不匹配\",\n    msg:\"无\"\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/login"
      }
    ],
    "filename": "api/user.js",
    "groupTitle": "用户信息管理",
    "name": "GetApiUserLogin"
  },
  {
    "group": "用户信息管理",
    "type": "get",
    "url": "/api/user/msg",
    "title": "获取个人信息",
    "version": "0.0.0",
    "description": "<p>获取个人信息</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:data1,\n    msg:data2[0]\n})\nres.send({\n    code:201,\n    title:\"登录信息失效，请重新登录\",\n    msg:err\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/msg"
      }
    ],
    "filename": "api/user.js",
    "groupTitle": "用户信息管理",
    "name": "GetApiUserMsg"
  },
  {
    "group": "用户信息管理",
    "type": "get",
    "url": "/api/user/send",
    "title": "发送短信验证码",
    "version": "0.0.0",
    "description": "<p>根据手机号发送短信验证码</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>手机号</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code: 200,\n    title: \"短信验证码发送成功\",\n    msg: code  // 测试环境使用，项目环境要改掉\n});\nres.send({\n    code: 201,\n    title: \"短信验证码再次发送成功\",\n    msg: code  // 测试环境使用，项目环境要改掉\n});\nres.send({\n    code: 202,\n    title: \"手机号已被注册\",\n    msg: \"无\"\n});\nres.send({\n    code: 203,\n    title: err.data.Message,\n    msg: \"无\"\n});",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/send"
      }
    ],
    "filename": "api/user.js",
    "groupTitle": "用户信息管理",
    "name": "GetApiUserSend"
  },
  {
    "group": "用户信息管理",
    "type": "post",
    "url": "/api/user/register",
    "title": "注册",
    "version": "0.0.0",
    "description": "<p>注册</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "tel",
            "description": "<p>手机号</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"注册成功\",\n    msg:{}\n})\nres.send({\n    code:201,\n    title:\"用户名重复\",\n    msg:\"无\"\n})\nres.send({\n    code:202,\n    title:\"请先发送验证码\",\n    msg:\"无\"\n})\nres.send({\n    code:203,\n    title:\"一个手机号只能对应一个用户\",\n    msg:\"无\"\n})\nres.send({\n    code:204,\n    title:\"验证码错误\",\n    msg:\"无\"\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/user/register"
      }
    ],
    "filename": "api/user.js",
    "groupTitle": "用户信息管理",
    "name": "PostApiUserRegister"
  },
  {
    "group": "订单信息",
    "type": "get",
    "url": "/api/order",
    "title": "获取订单",
    "version": "0.0.0",
    "description": "<p>获取订单</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>要添加订单的用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/order/"
      }
    ],
    "filename": "api/order.js",
    "groupTitle": "订单信息",
    "name": "GetApiOrder"
  },
  {
    "group": "订单信息",
    "type": "get",
    "url": "/api/order/pay",
    "title": "去支付",
    "version": "0.0.0",
    "description": "<p>去支付</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>要添加订单的用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>要添加订单的用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>订单的总价格(暂无，二期功能)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/order/pay"
      }
    ],
    "filename": "api/order.js",
    "groupTitle": "订单信息",
    "name": "GetApiOrderPay"
  },
  {
    "group": "订单信息",
    "type": "post",
    "url": "/api/order/add",
    "title": "创建订单",
    "version": "0.0.0",
    "description": "<p>创建订单</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>要添加订单的用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "proData",
            "description": "<p>要添加到订单的所有的商品数据(含id和num)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addressId",
            "description": "<p>收货地址的id(暂无，二期功能)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/order/add"
      }
    ],
    "filename": "api/order.js",
    "groupTitle": "订单信息",
    "name": "PostApiOrderAdd"
  },
  {
    "group": "购物车信息",
    "type": "get",
    "url": "/api/cart",
    "title": "获取购物车数据",
    "version": "0.0.0",
    "description": "<p>获取购物车数据</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>要添加购物车数据的用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"首次添加购物车成功\",\n    msg:data\n})\nres.send({\n    code:400,\n    title:\"登录信息失效\",\n    msg:err\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/cart"
      }
    ],
    "filename": "api/cart.js",
    "groupTitle": "购物车信息",
    "name": "GetApiCart"
  },
  {
    "group": "购物车信息",
    "type": "post",
    "url": "/api/cart/add",
    "title": "添加购物车数据",
    "version": "0.0.0",
    "description": "<p>添加购物车数据</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>要添加购物车数据的用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "proId",
            "description": "<p>要添加到购物车的商品id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num",
            "description": "<p>数量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"首次添加购物车成功\",\n    msg:\"ok\"\n})\nres.send({\n    code:201,\n    title:\"更新购物车成功\",\n    msg:\"ok\"\n})\nres.send({\n    code:202,\n    title:\"商品不存在\",\n    msg:\"no\"\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/cart/add"
      }
    ],
    "filename": "api/cart.js",
    "groupTitle": "购物车信息",
    "name": "PostApiCartAdd"
  },
  {
    "group": "购物车信息",
    "type": "post",
    "url": "/api/cart/del",
    "title": "删除购物车内的商品数据",
    "version": "0.0.0",
    "description": "<p>删除购物车内的商品数据</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>要修改购物车数据的用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "proId",
            "description": "<p>要修改购物车的商品数据的id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"删除成功\",\n    msg:data\n})\nres.send({\n    code:400,\n    title:\"登录信息失效\",\n    msg:err\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/cart/del"
      }
    ],
    "filename": "api/cart.js",
    "groupTitle": "购物车信息",
    "name": "PostApiCartDel"
  },
  {
    "group": "购物车信息",
    "type": "post",
    "url": "/api/cart/flag",
    "title": "修改购物车数据的选中状态",
    "version": "0.0.0",
    "description": "<p>修改购物车数据的选中状态</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>要修改购物车数据的用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "proId",
            "description": "<p>要修改购物车的商品数据的id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "flag",
            "description": "<p>要修改的状态</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"修改成功\",\n    msg:data\n})\nres.send({\n    code:400,\n    title:\"登录信息失效\",\n    msg:err\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/cart/flag"
      }
    ],
    "filename": "api/cart.js",
    "groupTitle": "购物车信息",
    "name": "PostApiCartFlag"
  },
  {
    "group": "购物车信息",
    "type": "post",
    "url": "/api/cart/num",
    "title": "修改购物车数据的数量",
    "version": "0.0.0",
    "description": "<p>修改购物车数据的数量</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>要修改购物车数据的用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "proId",
            "description": "<p>要修改购物车的商品数据的id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num",
            "description": "<p>要修改的商品的数量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"修改成功\",\n    msg:data\n})\nres.send({\n    code:400,\n    title:\"登录信息失效\",\n    msg:err\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/cart/num"
      }
    ],
    "filename": "api/cart.js",
    "groupTitle": "购物车信息",
    "name": "PostApiCartNum"
  },
  {
    "group": "轮播图信息",
    "type": "get",
    "url": "/api/banner",
    "title": "获取所有轮播图",
    "version": "0.0.0",
    "description": "<p>获取所有轮播图</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "code",
            "description": "<p>请求状态</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>请求说明</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "msg",
            "description": "<p>请求数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "res.send({\n    code:200,\n    title:\"请求成功\",\n    msg:data\n})",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/api/banner"
      }
    ],
    "filename": "api/banner.js",
    "groupTitle": "轮播图信息",
    "name": "GetApiBanner"
  }
] });
