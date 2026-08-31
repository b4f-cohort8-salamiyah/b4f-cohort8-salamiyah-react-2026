# Git & GitHub Handbook

This is your reference for using Git and GitHub throughout the React phase — not just for Session
05 homework. Keep it handy; every future session's homework will point back here instead of
repeating these steps.

---

## The repository model

The React repository has three kinds of branches:

- **`main`** — instructor-controlled. You never work here.
- **`group-1`** / **`group-2`** — your group's official branch. The instructor publishes course
  updates here. You never work here directly either.
- **Your personal branch** — this is where YOU write, commit, and push your own work: class
  coding, teamwork, and homework, all together.

The instructor updates your group branch over time. You bring those updates **into** your personal
branch yourself, whenever you need them. You never work directly on `group-1` or `group-2` — you
only pull updates from it.

**Group 1:**

```
group-1
  |
  |  merge latest instructor updates
  v
your personal branch
  |
  |  your class work + homework
  v
git push
```

**Group 2:**

```
group-2
  |
  |  merge latest instructor updates
  v
your personal branch
  |
  |  your class work + homework
  v
git push
```

---

## Checkout your personal branch

First, update your local information about what's on GitHub:

```
git fetch
```

You can see the available branches with:

```
git branch -r
```

Use the **exact** personal branch assigned to you — never guess it or make one up.

**If it doesn't exist on your computer yet** (this is usually your very first checkout):

```
git checkout -b <your-student-branch> origin/<your-student-branch>
```

What this does:

- `<your-student-branch>` (the first one) — the local branch this command creates for you.
- `origin/<your-student-branch>` — the branch that already exists on GitHub, created by the
  instructor.
- This command creates your local branch **from** that GitHub branch, and connects the two, so Git
  always knows where your `git push` should go.

**If it already exists on your computer:**

```
git checkout <your-student-branch>
```

Either way, confirm you're on the right branch:

```
git branch --show-current
```

---

## Get the latest instructor updates

Do this at the start of every session, and before homework too.

**First**, make sure you're on your own branch:

```
git checkout <your-student-branch>
```

**Then check your status:**

```
git status
```

If you have unfinished changes, commit them first — don't start a merge with uncommitted work
sitting around.

**Then fetch and merge:**

```
git fetch
```

Group 1:

```
git merge origin/group-1
```

Group 2:

```
git merge origin/group-2
```

What this does:

- `git fetch` downloads information about new commits on GitHub — it does not change your files
  yet.
- `git merge origin/group-1` (or `origin/group-2`) brings those instructor changes into the branch
  you're currently on.

You stay checked out on **your own personal branch** the whole time. You never need to checkout
`group-1` or `group-2` yourself.

---

## "Already up to date"

If Git prints:

```
Already up to date.
```

nothing is wrong. It simply means your personal branch already has every commit that's currently
on the group branch — there was nothing new to bring in.

---

## Merge conflicts

Sometimes your changes and the instructor's changes touch the same lines. Git can't guess which
one you want, so it shows you both and asks you to decide. This is normal — it is not an error.

A conflicted file looks like this:

```
code coming from the group branch
```

- **`HEAD`** — your current code, on your personal branch.
- **The bottom section** (after `=======`, up to `>>>>>>>`) — the incoming version from the group
  branch.

**What to do:**

1. Read both versions.
2. Decide: keep your version, keep the incoming version, or combine both by hand.
3. Edit the file so it contains only the final result you want.
4. **Remove the marker lines themselves** — the `<<<<<<<` line, the `=======` line, and the
   `>>>>>>>` line all need to go. Only your final code should remain.

**Then:**

```
git status
```

Git will tell you which files still need attention and which are resolved.

**Stage the resolved files:**

```
git add .
```

**Validate:**

```
npm run build
```

**If Git is still waiting for you to finish the merge**, it will say so — in that case:

```
git commit
```

Git doesn't always need this — a merge with no real conflicts sometimes finishes automatically
when you run `git merge`. Use `git status` to see what Git is actually waiting for, rather than
assuming you always need an extra commit.

**Finally:**

```
git push
```

---

## If the merge goes wrong

If a merge is still in progress and you want to back out completely, back to how things were
before you started:

```
git merge --abort
```

Then check:

```
git status
```

If you're not sure what state you're in, **stop and ask the instructor** — don't guess your way
out with more commands.

---

## Normal daily workflow

A compact reference you'll use constantly.

**Group 1:**

```
git checkout <your-student-branch>
git status
git fetch
git merge origin/group-1

# work on the exercise/homework

npm run build
git add .
git commit -m "Describe your changes"
git push
```

**Group 2:**

```
git checkout <your-student-branch>
git status
git fetch
git merge origin/group-2

# work on the exercise/homework

npm run build
git add .
git commit -m "Describe your changes"
git push
```

Once your branch is tracking its GitHub branch (this happens automatically the first time you use
`git checkout -b <your-student-branch> origin/<your-student-branch>`), plain `git push` is enough —
you don't need to type the branch name every time.

---

## Homework

Homework is done on the **same personal branch** as everything else. There is no separate homework
branch.

```
git checkout <your-student-branch>
git status
git fetch
git merge origin/<your-group-branch>

# complete the homework

npm run build
git add .
git commit -m "Session 05 homework"
git push
```

Do **not** create a branch named `homework/session-05`, `homework/session-06`, or
`homework/session-NN` — that is not how this course works. Your homework belongs directly on your
personal branch, right alongside your class work.

---

## Things you must NOT do

- Do not push directly to `main`.
- Do not push directly to `group-1`.
- Do not push directly to `group-2`.
- Do not work on another student's branch.
- Do not delete any branch.
- Do not guess your branch name — use the exact one assigned to you.
- Do not use `git push --force`.
- Do not use destructive reset commands (like `git reset --hard`) just because you hit a conflict.

**When confused, first run:**

```
git status
git branch --show-current
```

Then ask the instructor.
