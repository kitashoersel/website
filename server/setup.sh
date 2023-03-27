if [[ "$OSTYPE" =~ ^darwin ]]; then
  bash setup/setup_mac.sh
fi

if [[ "$OSTYPE" =~ ^linux ]]; then
  bash setup/setup_linux.sh
fi
