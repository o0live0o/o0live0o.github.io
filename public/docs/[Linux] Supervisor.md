### 安装Supervisor
##### CentOS
###### 方法一
```
    yum install supervisor
```
###### 方法二
1.安装Python包管理工具
```
    yum install python-setuptools
```
2.安装Supervisor
```
    easy_install supervisor
```

### 配置

### 1 创建文件夹
```
    mkdir /etc/supervisor
    mkdir /etc/supervisor/conf.d
    mkdir /etc/supervisor/log
```

### 2 创建初始配置文件
```
    echo_supervisord_conf > /etc/supervisor/supervisord.conf
```

### 3 修改配置文件
在文件末尾找到下面的配置
```
    ;[include]
    ;files = relative/directory/*.ini
```
修改为
```
    [include]
    files = etc/supervisor/conf.d/*.conf
```

### 4 创建配置文件
```
    cd /etc/supervisor/conf.d
    touch configName.conf
    vi configName.conf
```
在配置文件中输入
```
[program:ProcessName]                                         ;自定义进程名称, 根据自己喜好命名
command=dotnet dllName.dll                          ;程序启动命令 使用dotnet 命令(dll是你的项目文件)
directory=/root/Documents/NETCore                         ;命令执行的目录 你.NET Core 程序存放目录
autostart=true                                            ;在Supervisord启动时，程序是否启动
autorestart=true                                          ;程序退出后自动重启
startretries=5                                            ;启动失败自动重试次数，默认是3
startsecs=1                                               ;自动重启间隔
user=root                                                 ;设置启动进程的用户，默认是root
priority=999                                              ;进程启动优先级，默认999，值小的优先启动
stderr_logfile=/etc/supervisor/log/logName.err.log  ;标准错误日志 路径可以自定义,文件夹要建好
stdout_logfile=/etc/supervisor/log/logName.out.log  ;标准输出日志 路径可以自定义，文件夹要建好
environment=ASPNETCORE_ENVIRONMENT=Production             ;进程环境变量
stopsignal=INT                                            ;请求停止时用来杀死程序的信号
```

### 启动服务
```
    supervisord -c /etc/supervisor/supervisord.conf
```

```
如出现
Unlinking stale socket /tmp/supervisor.sock
执行命令
unlink /tmp/supervisor.sock
```
### 开机自动启动
```
cd /usr/lib/systemd/system/
touch supervisord.service
vi supervisord.service
```
```
[Unit]
Description=Supervisor daemon
 
[Service]
Type=forking
ExecStart=/usr/bin/supervisord -c /etc/supervisor/supervisord.conf
ExecStop=/usr/bin/supervisorctl $OPTIONS shutdown
ExecReload=/usr/bin/supervisorctl $OPTIONS reload
KillMode=process
Restart=on-failure
RestartSec=42s
 
[Install]
WantedBy=multi-user.target
```
```
systemctl enable supervisord.service
systemctl is-enabled supervisord
```

### 常用命令
##### 重启服务
```
    supervisorctl reload
```
##### 查看进程
```
    supervisorctl status
```
##### 启动某个进程
```
    supervisorctl start xxxx
```
##### 停止某个进程
```
    supervisorctl stop xxxx
```
##### 重启某个进程
```
    supervisorctl restart xxxx
```
##### 关闭所有任务
```
 supervisorctl shutdown 
```
