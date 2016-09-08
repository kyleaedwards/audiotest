#
# Cookbook Name:: cellout
# Recipe:: node
#
# Copyright (C) 2016
#
# All rights reserved - Do Not Redistribute
#

Chef::Log.info("****SETTING UP NODE***")

include_recipe 'nodejs'

nodejs_npm "#{node['app_name']}" do
  path "/var/www/#{node['app_name']}"
  json true
  user "vagrant"
end

template "/var/www/#{node['app_name']}/.env" do
  source "#{node['app_name']}.env.erb"
  owner "vagrant"
  group "vagrant"
  mode "0644"
end

directory "/var/www/#{node['app_name']}/uploads" do
  owner "vagrant"
  group "vagrant"
  mode "0755"
  recursive true
  action :create
end

execute "start node app via PM2" do
  cwd "/var/www/#{node['app_name']}"
  command "sudo node_modules/pm2/bin/pm2 startOrRestart pm2.json"
end
