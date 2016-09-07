#
# Cookbook Name:: cellout
# Recipe:: mysql
#
# Copyright (C) 2016
#
# All rights reserved - Do Not Redistribute
#

mysql2_chef_gem 'default' do
  action :install
end

mysql_service "#{node['app_name']}" do
  port '3306'
  version '5.6'
  initial_root_password node['db']['pass']
  action [:create, :start]
end

mysql_config "#{node['app_name']}" do
  instance "#{node['app_name']}"
  source 'mysql-tunables.erb'
  notifies :restart, "mysql_service[#{node['app_name']}]"
  action :create
end

mysql_connection_info = {
     :host => "127.0.0.1",
     :username => 'root',
     :password => node['db']['pass'],
     :socket => "/var/run/mysql-#{node['app_name']}/mysqld.sock"
}

mysql_database "#{node['app_name']}" do
  connection(mysql_connection_info)
  action :create
end

# # copy db dump to local fs from shared drive
cookbook_file "/var/www/#{node['app_name']}.sql" do
  source "#{node['app_name']}.sql"
  owner "root"
  group "root"
  mode 00600
  action :create
end

# # import db dump
bash "import" do
  user "root"
  cwd  "/var/www"
  code <<-EOS
    mysql -u root -h 127.0.0.1 -p'#{node['db']['pass']}' #{node['app_name']} < /var/www/#{node['app_name']}.sql
  EOS
end

# create a user capable of using dbs
mysql_database_user node['app_name'] do
  connection mysql_connection_info
  password node['db']['pass']
  action :create
end

mysql_database_user node['app_name'] do
  connection mysql_connection_info
  password node['db']['pass']
  host '%'
  action :grant
end

mysql_database_user node['app_name'] do
  connection mysql_connection_info
  password node['db']['pass']
  host 'localhost'
  action :grant
end
