# Contributing

## High Level Workflow

1. Fork the repo & clone to your local
1. Cut a feature branch from master
1. Make commits to your feature branch.
1. When you've finished with your fix or feature, Rebase upstream changes into your branch. 
1. Submit a [pull request][] to the master repo
1. Your pull request will be reviewed by another maintainer and merged in if approved
1. (Fix any issues raised by your code reviwer, and push your fixes as a single
   new commit.)

## Detailed Workflow

### Step 1: Fork the repo
 
Use github’s interface to make a fork of the master repo (github.com/<org_name>/<repo_name>.git). 

### Step 2: Clone the repo

Navigate to your forked repo (github.com/<your_name>/<repo_name>.git). Clone this repo locally using `git clone`. Then add the MASTER REPO (which belongs to the org, not you) as an upstream remote:

```
git remote add upstream https://github.com/<org_name>/<NAME_OF_REPO>.git
```

### Step 3: Cut a feature branch

On your local machine, create a branch and give it a name indicating what your feature is.
  
These commands will help you do this:

``` bash

# Creates your branch and brings you there
git checkout -b `your-branch-name`
```

### Step 4: Make commits to your feature branch

As you write code for your feature, commit often. Make sure you are committing to your FEATURE BRANCH not master!

If you find yourself making changes unrelated to the current feature, make a new branch for those changes.

#### Commit Message Guidelines

- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

### Step 5: Rebase upstream changes into your branch

Once you are done making changes, run this command:

```bash
git pull --rebase upstream master
```

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

If there are conflicting changes, git will start yelling at you part way
through the rebasing process. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add`ing it - you do not make commits during a
rebase.

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn’t break
anything, then run your new tests (there are new tests, right?) and
make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Step 6: 

Push your local changes to your fork on GitHub:

```bash
git push origin BRANCH_NAME
```

This ensures that your fork of the repo on GitHub gets the feature branch with all your changes.

### Step 7: Make a pull request

Go to GitHub and find YOUR FORK of the master repo. Initiate a pull request from your fork to the MASTER REPO.

In the title of your pull request, include one of these keywords: CLOSES, FIXES or RESOLVES, followed by "#", followed by the issue number you are resolving with this pull request. For ex. "Fixes #19". Please always include one of these keywords plus the issue number, so that the issue is closed automatically for us.

At least one other person MUST give your changes a code review, and once
they are satisfied they will merge your changes into upstream. Alternatively,
they may have some requested changes. You should make more commits to your
branch to fix these, then follow this process again from rebasing onwards.

Once you get back here, make a comment requesting further review and
someone will look at your code again. If they like it, it will get merged,
else, just repeat again.

### Step 8: Get everything in sync

After your pull request has been accepted, the master branches on your GitHub fork and your local machine will be out of sync with the master repo (upstream).

Run the following commands on your computer:

```bash
git checkout master
git pull --rebase upstream master
git push origin master
```

You're now ready to start a new feature! Go back to Step 3 and follow the workflow again!


### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY][].
    - Apply the [boy scout rule][].
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
1. Run the [tests][] before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
1. Your pull request is comprised of a single ([squashed][]) commit.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature brances)?
- [ ] Is my branch focused on a single main change?
 - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my
  work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I include the keywords FIXES, RESOLVES or CLOSES plus the issue number in my pull request?
- [ ] Did I get a code review?
 - [ ] Did I make any requested changes from that code review?

If you follow all of these guidelines and make good changes, you should have
no problem getting your changes merged in.


<!-- Links -->
[style guide]: https://github.com/hackreactor-labs/style-guide
[n-queens]: https://github.com/hackreactor-labs/n-queens
[Underbar]: https://github.com/hackreactor-labs/underbar
[curriculum workflow diagram]: http://i.imgur.com/p0e4tQK.png
[cons of merge]: https://f.cloud.github.com/assets/1577682/1458274/1391ac28-435e-11e3-88b6-69c85029c978.png
[Bookstrap]: https://github.com/hackreactor/bookstrap
[Taser]: https://github.com/hackreactor/bookstrap
[tools workflow diagram]: http://i.imgur.com/kzlrDj7.png
[Git Flow]: http://nvie.com/posts/a-successful-git-branching-model/
[GitHub Flow]: http://scottchacon.com/2011/08/31/github-flow.html
[Squash]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html

Edited by: Mike Yao
