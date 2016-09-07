app_name = 'cellout'

default['app_name'] = app_name

default['php']['server_name'] = "#{app_name}.dev"
default['php']['url'] = "http://#{app_name}.dev"
default['php']['docroot'] = "/var/www/#{app_name}/"

default['apache']['mpm'] = 'prefork'

default['db']['user'] = app_name
default['db']['name'] = app_name
default['db']['pass'] = app_name

default['nodejs']['version'] = '5.9.0'
default['nodejs']['install_method'] = 'binary'
default['nodejs']['binary']['checksum'] = '99c4136cf61761fac5ac57f80544140a3793b63e00a65d4a0e528c9db328bf40'

default['redisio']['servers'] = [
    {
        'name' => 'master',
        'port' => '6379',
        'unixsocket' => '/tmp/redis.sock',
        'unixsocketperm' => '755'
    }
]
