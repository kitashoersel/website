service=kite

if ! [[ -f "/home/$USER/.ssh/${service}_id" ]]; then
  echo; echo "No correlating ssh credentials mathch. Generating a fresh key pair now..."
  echo; read -p "Please enter your email address: " ssh_email_input

  # Generate ssh key with elliptical curve algorithm signed with users email
  ssh-keygen -t ed25519 -C $ssh_email_input -f "/home/$USER/.ssh/${service}_id" -q -N ""

  # Only owner can read/write ssh key files
  chmod 600 "/home/$USER/.ssh/${service}_id"
  chmod 600 "/home/$USER/.ssh/${service}_id.pub"
fi

# Because this gets embedded into a yaml file, some characters need to get escaped
echo $(printf '%s\n' "$(cat /home/$USER/.ssh/${service}_id.pub)" | sed -e 's/[\/&]/\\&/g')
