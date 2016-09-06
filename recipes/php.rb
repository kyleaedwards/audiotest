#
# Cookbook Name:: cellout
# Recipe:: php
#
# Copyright (C) 2016
#
# All rights reserved - Do Not Redistribute
#

Chef::Log.info("****SETTING UP LAMP stack***")
include_recipe 'apache2'
include_recipe 'apache2::mod_ssl'
include_recipe 'apache2::mod_authz_core'
include_recipe 'apache2::mod_php5'
include_recipe 'apache2::mod_rewrite'
include_recipe 'apache2::mod_deflate'
include_recipe 'apache2::mod_headers'
include_recipe 'ssl_certificate'
include_recipe 'timezone-ii::default'

service 'apache' do
    supports :restart => true, :reload => true
end

# disable default vhost
apache_site '000-default' do
    enable false
end

# virtual host
web_app node['app_name'] do

    server_name node['server_name']
    docroot node['php']['docroot']

    template "#{node['app_name']}.conf.erb"
    log_dir node['apache']['log_dir']

    notifies :reload, 'service[apache2]', :immediately

end

include_recipe 'php'
include_recipe 'php::module_mysql'
include_recipe 'php::module_memcache'

package "mcrypt" do
  action :install
end

package "php5-mcrypt" do
  action :install
end

execute "php5enmod-mcrypt" do
  command "sudo php5enmod mcrypt"
end

package "php5-gd" do
  action :install
end

package "php5-curl" do
  action :install
end
