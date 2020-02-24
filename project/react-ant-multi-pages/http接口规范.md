# 后台系统接口规范

请按照如下定义产出接口，保持接口的规范和一致性

## 通用结构

* request请求的headers: 会显示传入如下几个请求头
  
    
		Cache-Control: no-cache
		Content-Type: application/json; charset=utf-8
		Accept: application/json
    


* post请求的body (json格式)

		  
	      {
		  	  "version": "0.0.1",
	          "id": 1,
	          "name": "finance",
	          "type": 2
	      }
		  

* response

    - code，0代表成功，非0整型代表失败
    - data，一定为对象或null或undefined
		  
		  {
		      "code": 0,
		      "msg": "成功",
		      "data": {
		          "name": "finance"
		      }
		  }	  






## /list `列表类、列表分页类`

使用get请求

#### request

| 字段 | 类型 | 描述 |
| ---- |:----:| :----------:|
| **`currentPage`** | `number` |  当前第几页 |
| **`pageSize`** | `number` |  每一页显示的条数 |

示例：

	{
		version: '1.1.1',
		a: 'a',
		currentPage: 2,
		pageSize: 30
	}

#### response **`仅限data中的字段`**

| 字段 | 类型 | 描述 |
| ---- |:----:| :----------:|
| **`list`** | `Array` |  列表数据 |
| **`total`** | `number` |  总条数 |

示例：

	{
		code: 0,
		msg: '',
		data: {
			list: [{},{},{}...],
			total: 85
		}
	}


