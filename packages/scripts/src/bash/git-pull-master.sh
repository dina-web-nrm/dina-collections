if [[ -z $(git status -s) ]]
then
  echo "tree is clean. pulling changes"
  git fetch
  echo "fetch done"
  git pull origin master
  echo "pull master done"
else
  echo "tree is dirty, stashing changes before pulling"
  git stash
  echo "stash done"
  git fetch
  echo "fetch done"
  git pull origin master
  echo "pull master done"
  git stash pop
  echo "stash pop done"
fi



