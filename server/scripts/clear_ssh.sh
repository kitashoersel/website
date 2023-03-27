service=kite

echo Before cleaning  keys
ls "/home/$USER/.ssh/"

rm "/home/$USER/.ssh/${service}_id"
rm "/home/$USER/.ssh/${service}_id.pub"

echo After cleaning  keys
ls "/home/$USER/.ssh/"
