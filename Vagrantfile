# -*- mode: ruby -*-
# vi: set ft=ruby :

application_name = "cellout"

required_plugins = %w(vagrant-share vagrant-vbguest vagrant-triggers vagrant-berkshelf vagrant-omnibus)

plugins_to_install = required_plugins.select { |plugin| not Vagrant.has_plugin? plugin }
if not plugins_to_install.empty?
    puts "Installing plugins: #{plugins_to_install.join(' ')}"
    if system "vagrant plugin install #{plugins_to_install.join(' ')}"
        exec "vagrant #{ARGV.join(' ')}"
    else
        abort "Installation of one or more plugins has failed. Aborting."
    end
end

Vagrant.require_version '>= 1.5.0'

Vagrant.configure('2') do |config|

    if Vagrant.has_plugin?("vagrant-omnibus")
        config.omnibus.chef_version = '12.5.1'
    end

    config.vm.box = 'chef/ubuntu-14.04'
    config.vm.hostname = application_name
    config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.synced_folder "./app", "/var/www/#{application_name}"

    config.berkshelf.enabled = true

    config.trigger.before [:reload, :up, :provision], stdout: true do
        SYNCED_FOLDER = ".vagrant/machines/default/virtualbox/synced_folders"
        info "Trying to delete folder #{SYNCED_FOLDER}"
        begin
            File.delete(SYNCED_FOLDER)
        rescue Exception => ex
            warn "Could not delete folder #{SYNCED_FOLDER}."
            warn ex.message
        end
    end

    config.vm.provision :chef_solo do |chef|

        # chef.custom_config_path = "Vagrantfile.chef"

        chef.json = {
            mysql: {
                server_root_password: 'rootpass',
                server_debian_password: 'debpass',
                server_repl_password: 'replpass'
            }
        }

        chef.run_list = [
            'recipe[cellout::default]'
        ]

    end

end
