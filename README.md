Tic-Tac-Toe game
================

Github
------
Currently all sources are located on GitHub. There are 2 branches: *master*
and *gh-pages*. GitHub automatically provides web-hosting for the files in
*gh-pages* branch, [GitHub hosted game](http://curoles.github.io/x0game/web/x0g.html).

Game development is happening in *master* branch, periodically next stable version
is copied to *gh-pages*.

Create a remote named "origin" pointing at the GitHub repository
and pull sources from *master* branch:
```
git remote add origin https://github.com/curoles/x0game.git
git pull origin master
```

Merge from *master* to *gh-pages*:
```
mkdir gh-pages/
cd gh-pages/
git init 
git remote add origin https://github.com/curoles/x0game.git
git checkout -b gh-pages origin/gh-pages
git fetch
git merge origin/master
git commit -a -m "master->gh-pages"
git push
```
 
