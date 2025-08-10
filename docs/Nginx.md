### 安装Nginx
#### CentOS安装
```
    yum -y install nginx
```
#### Docker安装
```
    version: '3.1'
    services:
        nginx:
            restart: always
            image: daocloud.io/library/nginx:latest
            container_name: nginx
            prots:
                
```

### 配置文件

```
    worker_processes    1;   //数值越大并发能力越强
    
    error_log   /var/log...   //日志位置
    pid  /var...
    
    http{
        server{
            
        }
    }
```
```
    server{
        listen  80;
        server_name localhost;
        
        location / {
            proxy_pass http://*:prot; # 转发的地址    
        }
    }
```
### 正向代理
```
    - 由客户端设立
    - 客户端了解代理服务器和目标服务器都是谁
    - 帮我们实现突破访问权限 提高访问速度 对目标服务器隐藏客户端IP地址
```

### 反向代理
```
    配置在服务器
    客户端不知道访问哪台服务器
    负载均衡 隐藏服务器真正的IP地址 
```

### 路径映射规则
```
    # 1. = 匹配
    location = / {
        # 精准匹配，主机名后面不能带任何字符串
    }
    
    # 2. 通用匹配
    
    # 3. 正则匹配
    
    # 4. 匹配开头路径
```


### 负债均衡
```
    轮询
    权重
    ip_hash
```
```
upstream my-server{
    server ip1;
    server ip2;
}
server{
    listen 80;
    server_name localhost;
    
    location / {
        proxy_pass http://my-server/;
    }
}
```
```
upstream my-server{
    server ip1 weight=10;
    server ip2 weight=2;
}
server{
    listen 80;
    server_name localhost;
    
    location / {
        proxy_pass http://my-server/;
    }
}
```
```
upstream my-server{
    ip_hash;
    server ip1;
    server ip2;
}
server{
    listen 80;
    server_name localhost;
    
    location / {
        proxy_pass http://my-server/;
    }
}
```
