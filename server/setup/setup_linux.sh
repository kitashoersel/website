#!/bin/bash -uxe

#* ------ INITIALIZE HELPER FUNCTIONS ------

function confirm_dialog() {
  echo; read -p "$1 [y/N]: " confirm_input

  until [[ "$confirm_input" =~ ^[yYnN]*$ ]]; do
    echo "$confirm_input: invalid selection."
    read -p "[y/N]: " confirm_input
  done

  echo "$confirm_input"
}

function confirmed() {
  [[ "$1" =~ [yY] ]] && return 1 || return 0;
}

function echo_exit() {
  echo $1
  exit
}


#* ------ INITIALIZE  GLOBAL VARIABLES ------

# Initialitze a sudo global variable
if [[ $EUID -ne 0 ]]; then
  if [[ ! -z "$1" ]]; then
    SUDO='sudo -E -H'
  else
    SUDO='sudo -E'
  fi
else
  SUDO=''
fi

# Other global constants
service=kite


#* ------ CHECK THE OS SYSTEM ------

if ! [[ "$OSTYPE" =~ ^linux ]]; then
	echo_exit "This installer seems to be running on an unsupported system. The supported system is linux."
fi


#* ------ INSTALL ANSIBLE  ------

if ! [ -x "$(command -v ansible-playbook)" ]; then
  echo "Seems like ansible isn't installed on this system, installing it now..."

  # Disable user interaction while installing
  export DEBIAN_FRONTEND=noninteractive

  # Update apt database, all packages and install Ansible + dependencies.
  # While installing, ignore interaction and force config overwrites
  $SUDO apt update -y;
  yes | $SUDO apt-get -o Dpkg::Options::="--force-confold" -fuy dist-upgrade;
  yes | $SUDO apt-get -o Dpkg::Options::="--force-confold" -fuy install software-properties-common curl git python3 python3-setuptools python3-apt python3-pip apitude -y;
  yes | $SUDO apt-get -o Dpkg::Options::="--force-confold" -fuy autoremove;
  yes | $SUDO add-apt-repository --yes --update ppa:ansible/ansible
  yes | $SUDO apt install ansible
  yes | $SUDO python3 -m pip install ansible

  ansible-galaxy install -r ./ansible/requirements.yml

  # Enable user interaction again
  export DEBIAN_FRONTEND=
else
  echo "Seems like ansible is already installed. Skipping this step..."; echo;
fi


#* ------ CONFIGURATION GUIDE  ------

# copy the template file to the main directory
cp -n ./ansible/templates/inventory.template.yml ./ansible/inventory.yml

# generate and/or read the ssh token pair and save them into the template file
ssh_public_key=$(bash scripts/gen_ssh.sh)
sed "s/{{ SSH_PUBLIC_KEY }}/$ssh_public_key/g" ./ansible/inventory.yml > ./ansible/_inventory.yml && mv ./ansible/_inventory.yml ./ansible/inventory.yml

# ask the user to fill in the remaining credentials
confirmed $(confirm_dialog "Please fill in the blank (__________) credentials in the ansible/inventory.yml file. \n Press any key if done..."); echo;


#* ------ RUN THE PLAYBOOK ------
cd ansible

# Test the ansible connection
ansible all -m ping;

# Runs the setup playbook for the server
confirmed $(confirm_dialog "Would you like to setup the server now?")
if [ $? -eq 1 ]; then
  ansible-playbook setup.yml

  # Replace the initial credentials with the new ssh ones if needed
  username=$(awk '/username: /{print $2}' inventory.yml | cut -d "\"" -f 2)
  sshport=$(awk '/ssh_port: /{print $2}' inventory.yml | cut -d "\"" -f 2)

  sed "s/ansible_ssh_user:.*$/ansible_ssh_user: $username/g" inventory.yml > _inventory.yml && mv _inventory.yml inventory.yml
  sed "s/ansible_ssh_pass:.*$/ansible_ssh_private_key_file: \/home\/$USER\/.ssh\/${service}_id/g" inventory.yml > _inventory.yml && mv _inventory.yml inventory.yml
  sed "s/:22/:$sshport/g" inventory.yml > _inventory.yml && mv _inventory.yml inventory.yml
fi


# Starts the services
confirmed $(confirm_dialog "Would you like to (re)start the services now?")
if [ $? -eq 1 ]; then
  ansible-playbook services.yml
fi
