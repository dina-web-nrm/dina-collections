# Contributing guidelines

This first version only aims to meet the current needs in the DINA Collections team.

## Commit messages

Start commits with a prefix saying which part of the repo the commit pertains to, for example:

* [BACKEND]
* [COMMON]
* [MODELS]
* [ROOT]
* [STYLE]
* [SCRIPTS]
* [UI]
* [-] (i.e. changes applies to many parts, e.g. updating file trees)

The first line in a commit message should be maximum 50 characters long (so it fits without linebreak in commit lists, e.g. on GitHub). Lines after the first may be up to 72 characters long. 

Phrase the commit as an imperative phrase, e.g. "Add X" or "Fix Y" rather than "Adding X" or "Fixed Y".

## Git workflow

In any given pull request, only the final solution should be committed, i.e. if you add X, then change X, and then replace X with Y, it is only interesting to have "Add Y" in the final version of the PR. This does not mean everything should be one big commit. Divide into smaller commits whenever it makes sense (yes, it can be debated what this means, but let's see how it goes before we write longer guidelines).

This likely means you will need to do fixups and rebases. If you are new to that, read the [Beginner's guide to rebasing](https://github.com/servo/servo/wiki/Beginner's-guide-to-rebasing-and-squashing). Note that you can ignore steps 1-2 under "Rebasing" where they talk about setting a new upstream remote. You just need to fetch latest `master` and rebase on master. Using the interactive rebase and the autosquash option is probably helpful, so remember this: `git rebase -i master --autosquash`

Sometimes it is easier to undo all/some commits and just make new commits with the last version of the code, instead of trying to fixup later changes into previous commits. You can google more about `git reset` to see how you can reset to different commits, but a quick tip is to use `git reset HEAD^` to undo the last commit. Undoing here means that the commit is undone, but the changes that the commit contained will still be in your working tree. So you can run that command for as many commits as you want to undo and then you can commit again, with the last version of those files.

It is probably also helpful to have a git GUI to easily inspect commits and different branches. The biggest one is probably Sourcetree, and there's GitHub Desktop, but there are loads more. Just pick any of them if it can help.
