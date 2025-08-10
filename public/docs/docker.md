### 参数
```
    -i 交互式操作
    -t 终端
    -d 后台运行
    -p 5000:5000  指定端口
```

### 安装

### Uninstall
```
$ sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```
### Install
```
$ sudo yum install -y yum-utils

官方源
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
阿里源
$ sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
清华大学源
$ sudo yum-config-manager \
    --add-repo \
    https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
    
安装指定版本的containerd
yum install -y https://mirrors.aliyun.com/docker-ce/linux/centos/7/x86_64/edge/Packages/containerd.io-1.3.7-3.1.el7.x86_64.rpm

sudo yum install docker-ce docker-ce-cli containerd.io

$ sudo systemctl start docker
```

### 开机启动
```
    systemctl enable docker.service
```
### 重启
```
    systemctl restart docker
```
### 守护进程重启
```
    systemctl daemon-reload
```

### 关闭
```
    docker service docker stop / docker systemctl stop docker
```

## 容器
### 查看容器
```
    docker ps      //查看活动容器
    docker ps -a   //查看所有容器
    docker ps -aq  //显示所有容器ID
```

### 删除容器
```
    docker rm 容器ID   //可选 -f
    docker container prune  //删除所有停止状态的容器
    docker rm $(docker ps -aq)  //删除所有容器
```

### 运行容器
```
    docker run -t -i ubuntu:TAG /bin/bash
    docker run -itd  --name=devitem_8601 -p 8601:80 devitem:01
    --设置时区
    docker run -itd -e TZ=Asia/Shanghai --name=bi-report -p 8030:80 ams-bi-report

```

### 停止容器
```
    docker stop 容器ID
    docker stop $(docker ps -aq) //停止所有容器
```

### 进入容器
```
    docker exec   //此命令退出容器后不会停止容器
    docker attach
```

### 更新容器
```
    docker update --restart=always 容器ID //更新容器添加自动重启容器指令
```

### 查看日志
```
    docker logs -f 容器ID
```

### 启动容器
```
    docker start $(docker ps -a | awk '{ print $1}' | tail -n +2)
```

## 镜像
### 查看镜像
```
    docker images
```

### 删除镜像
```
    docker rmi 镜像名称
    docker rmi $(docker images -q)  //删除所有镜像
    docker image prune --force --all  //删除所有镜像
```

### 构建镜像
```
    docker build -t dev:01  .
```

## 网络
### 查看网络
```
    docker network ls
```
### 创建网络
```
    docker netword create -d bridge test-net
```
### 加入网络
```
    docker run -itd --name test1 --network test-net ubuntu /bin/bash
```

host.docker.internal

### 复制文件
```
    docker cp bi-report-8050:/app/Logs/2020-12-01 /www
```