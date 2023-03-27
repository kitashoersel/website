#!/bin/bash -uxe

# ------ INITIALIZE HELPER FUNCTIONS ------

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

# ------ INITIALIZE  GLOBAL VARIABLES ------

username=""

# ------ CHECK THE OS SYSTEM ------

if sw_vers | grep -qs "macOS"; then
  os_version=$(sw_vers -productVersion)
else
	echo_exit "This installer seems to be running on an unsupported system. The supported system is MacOS."
fi

# ------ INSTALL ANSIBLE  ------

confirmed $(confirm_dialog "Do you want to run the ansible installer on your system?")
if [ $? -eq 1 ]; then
  brew install curl git python3 hudochenkov/sshpass/sshpass ansible
  python3 -m pip install ansible passlib
  ansible-galaxy install -r ./ansible/requirements.yml
fi

# ------ CONFIGURATION GUIDE  ------

# copy the template file to the main directory
cp -n ./ansible/templates/inventory.template.yml ./ansible/inventory.yml

# generate the token pair and set them to user read/write only
confirmed $(confirm_dialog "Do you want to generate a ssh key pair for the remote connection?")
if [ $? -eq 1 ]; then
  echo; read -p "Please enter your email address: " email_input

  ssh-keygen -t ed25519 -C $email_input -f ~/.ssh/kitas_hoersel_id -q -N ""
  chmod 600 ~/.ssh/kitas_hoersel_id
  chmod 600 ~/.ssh/kitas_hoersel_id.pub
  public_key=$(cat ~/.ssh/kitas_hoersel_id.pub)
  escaped_key=$(printf '%s\n' "$public_key" | sed -e 's/[\/&]/\\&/g')
  sed "s/{{ SSH_PUBLIC_KEY }}/$escaped_key/g" ./ansible/inventory.yml > ./ansible/_inventory.yml && mv ./ansible/_inventory.yml ./ansible/inventory.yml
fi

# run rhe inventory setup client
keys=(
  "HOST_IP"
  "HOSTNAME"
  "SSH_USER"
  "SSH_PASSWORD"
  "SSH_PORT"
  "USERNAME"
  "USER_PASSWORD"
  "SSL_EMAIL"
  "SSL_KID"
  "SSL_HMAC"
  "DIRECTUS_KEY"
  "DIRECTUS_SECRET"
  "DIRECTUS_ADMIN_EMAIL"
  "DIRECTUS_ADMIN_PASSWORD"
)
desc=(
  "Enter the ip adress of the remote server"
  "Enter the hostname of the remote server"
  "Enter your temporary/initial ssh user name"
  "Enter your temporary/initial ssh password"
  "Enter the desired ssh connection port"
  "Enter your desired UNIX username"
  "Enter your password of the UNIX user"
  "Enter the email used for the ssl certificates"
  "Enter the kid token from zero ssl"
  "Enter the hmac token from zero ssl"
  "Enter the directus project key"
  "Enter the directus secret api key"
  "Enter the directus initial admin email"
  "Enter the directus initial admin password"
)
label=(
  "Host IP: "
  "Hostname: "
  "Temporary SSH Username: "
  "Temporary SSH Password: "
  "SSH port: " "UNIX Username: "
  "UNIX Password: "
  "SSL Email: "
  "SSL kid token: "
  "SSL hmac token: "
  "Directus project key: "
  "Directus secret api key: "
  "Directus admin email: "
  "Directus admin password: "
)

for (( i=0; i<${#keys[@]}; i++ ));
do
  if grep -q "{{ ${keys[$i]} }}" "ansible/inventory.yml"; then
      echo;  echo "${desc[$i]}";
      read -p "${label[$i]}" input
      sed "s/{{ ${keys[$i]} }}/$input/g" ./ansible/inventory.yml > ./ansible/_inventory.yml && mv ./ansible/_inventory.yml ./ansible/inventory.yml

      if [ "${keys[$i]}" = "USERNAME" ]; then
        username="$input"
      fi
  fi
done


# ------ RUN THE PLAYBOOK ------

# go to the ansible main directory
cd ansible

# Test the ansible connection
ansible all -m ping

# Run the playbook whole setup playbook for new server
confirmed $(confirm_dialog "Would you like to run the playbook now?")
if [ $? -eq 1 ]; then
  ansible-playbook run.yml
fi

confirmed $(confirm_dialog "Would you like to (re)start only the services now?")
if [ $? -eq 1 ]; then
  ansible-playbook run-services.yml
fi

# ------ CONFIGURE SSH USER FOR FURTHER CONNECTIONS ------

# Read username if already defined in inventory
if [ -z "$username" ]; then
    username=$(cat ansible/inventory.yml | grep "username:" | cut -c 15-)
fi

# isable temp user/password authentication
sed "s/ansible_ssh_user:.*$/ansible_ssh_user: $username/g" inventory.yml > _inventory.yml && mv _inventory.yml inventory.yml
sed "s/ansible_ssh_pass:.*$/ansible_ssh_private_key_file: ~\/.ssh\/kitas_hoersel_id/g" inventory.yml > _inventory.yml && mv _inventory.yml inventory.yml
