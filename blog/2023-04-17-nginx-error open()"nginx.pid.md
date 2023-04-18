---
slug: 'nginx: [error] open()/run/nginx.pid failed (2: No such file or directory) '
title: 'nginx: [error] open()/run/nginx.pid failed (2: No such file or directory) '
authors: Jeffrey
tags: [nginx, error]
---

> 解决报错：nginx: [error] open() "/run/nginx.pid" failed (2: No such file or directory)

> 重启 Nginx 遇到报错：nginx: [error] open() "/run/nginx.pid" failed (2: No such file or directory)
> 为什么会报错？nginx 被停止时，nginx.pid 被删除了。reload 命令需要通过 nginx.pid 获取进程号，会去找 nginx.pid ，如果不存在，就报错了。

## 解决问题方法：

### 简单粗暴，杀死 nginx 进程，然后再启动 nginx

```bash
sudo fuser -k 80/tcp #关闭占用80端口的程序（nginx默认端口80）
cd /etc/init.d
sudo nginx -c /etc/nginx/nginx.conf //  启动nginx
```
