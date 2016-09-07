#
# Cookbook Name:: cellout
# Recipe:: default
#
# Copyright (C) 2016
#
# All rights reserved - Do Not Redistribute
#
include_recipe 'curl'
include_recipe 'git'
include_recipe 'cron'

include_recipe 'redisio::install'
include_recipe 'redisio::enable'

include_recipe 'cellout::mysql'
include_recipe 'cellout::node'

#include_recipe 'cellout::php'
