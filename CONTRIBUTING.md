# Contributing guidelines

These guidelines are intended to meet the current needs in the DINA Collections
team. They may need to be expanded in the future to cover external
contributions.

## Code conventions

In general we follow
[Airbnb's style guide for JavaScript](https://github.com/airbnb/javascript). In
practice we enforce this through linting with [ESLint](https://eslint.org) and
automatic code formatting with [Prettier](https://prettier.io). The linter runs
during continuous integration to ensure no lint errors are merged.

The repo contains config files for both those tools and you probably want to set
them up to run in your editor, to show/fix errors during development. Here are
guides:

- [ESLint editor setup](https://eslint.org/docs/user-guide/integrations)
- [Prettier editor setup](https://prettier.io/docs/en/editors.html)

If you use the [VS Code](https://code.visualstudio.com/) editor, then you might
want to configure it like [this](https://youtu.be/YIvjKId9m2c) to avoid
conflicts between ESLint and Prettier.

## Commit messages

We follow the commonly used "seven rules of a great commit message:"

1. Separate subject from body with a blank line
1. Limit the subject line to 50 characters
1. Capitalize the subject line
1. Do not end the subject line with a period
1. Use the imperative mood in the subject line
1. Wrap the body at 72 characters
1. Use the body to explain what and why vs. how

You can read more about the rules and why they matter in Chris Beams'
[post](https://chris.beams.io/posts/git-commit/).

In addition to the above, we add a prefix at the beginning of the commit
message, depending on what package the commit pertains to, for example:

- [BACKEND]
- [COMMON]
- [MODELS]
- [STYLE]
- [SCRIPTS]
- [UI]

If the commit pertains to the root, e.g. updating this file, use [ROOT]. If it
makes sense for the commit to include changes to several packages, use [SHARED].

## Branch names

We prefix branch names with the first name of the developer. If there are
several developers with the same first name, add the first letter(s) of the
family name, as needed to differentiate between them. Then use a somewhat
descriptive branch name. If it is difficult to describe what is, or is intended
to be, in the branch, then maybe it is better to split up the work.

## Pull requests

When creating a pull request, edit the name of the pull request to be suitable
for the changelog, because that is where it will end up. There is no specific
maximum length requirement, but use the imperative mood (as with commits). Look
at the [CHANGELOG](CHANGELOG.md) for examples.

If a pull request is not ready for review, or needs a significant retake after
having been reviewed, then prefix the name with "WIP:" to indicate that.

## Git workflow

In any given pull request, only the final solution should be committed, i.e. if
you add X, then change X, and then replace X with Y, it is only interesting to
have "Add Y" in the final version of the PR. This does not mean that everything
should be one big commit. Split work into smaller commits whenever it makes
sense.

This likely means you will need to do fixup commits and rebase your branch. If
you are new to rebasing, read the
[Beginner's guide to rebasing](https://github.com/servo/servo/wiki/Beginner's-guide-to-rebasing-and-squashing).
Note that you can ignore steps 1-2 under "Rebasing" where they talk about
setting a new upstream remote. You just need to fetch latest `master` and rebase
on master. Using the interactive rebase and the autosquash option is probably
helpful, like this:

```
git rebase -i master --autosquash
```

Sometimes it is easier to undo all/some commits and make new commits with the
last version of the code, instead of trying to fixup later changes into previous
commits. You can google more about `git reset` to see how you can reset to
different commits, but a quick tip is to use `git reset HEAD^` to undo the last
commit. Undoing here means that the commit is undone, but the changes that the
commit contained will still be in your working tree. So you can run that command
for as many commits as you want to undo and then you can commit again, with the
last version of those files.

It can also be helpful to have a git GUI (e.g. GitHub Desktop, Gitup or
Sourcetree) to easily inspect commits and different branches.
