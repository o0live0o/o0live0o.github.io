### 查看防火墙状态
```
sudo firewall-cmd --state
```
### 开放8081端口
```
sudo firewall-cmd --zone=public --add-port=8081/tcp --permanent
```
### 开放8082端口
```
sudo firewall-cmd --zone=public --add-port=8082/tcp --permanent
```
### 重启防火墙
```
sudo firewall-cmd --reload
```
### 查看防火墙开放的端口
```
sudo firewall-cmd --list-ports
```

* --permanent 永久开放 重启也不会关闭


### 防火墙常用命令
```
#关闭防火墙
systemctl stop firewalld.service

#开启防火墙
systemctl start firewalld.service

#关闭开机自启动
systemctl disable firewalld.service

#开启开机自启动
systemctl enable firewalld.service

#查看某个端口是否开启
firewall-cmd --query-port=80/tcp

#查看防火墙状态
firewall-cmd --state

#查看防火墙开放的端口
firewall-cmd --list-ports

#永久开放某个TCP端口
firewall-cmd --zone=public --add-port=80/tcp --permanent

#永久关闭某个TCP端口
firewall-cmd --zone=public --remove-port=80/tcp --permanent

#永久开放某个UDP端口
firewall-cmd --zone=public --add-port=80/udp --permanent

#永久关闭某个UDP端口
firewall-cmd --zone=public --remove-port=80/udp --permanent

#批量添加区间端口
firewall-cmd --zone=public --add-port=8081-8082/tcp --permanent
firewall-cmd --zone=public --add-port=8081-8082/udp --permanent
```