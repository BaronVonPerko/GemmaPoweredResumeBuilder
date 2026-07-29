# GitHub PR and CI/CD Babysitting Workflow

This workflow provides instructions and context to help AI agents manage, monitor, and resolve blockers for GitHub pull requests to ensure a green CI/CD pipeline.

## Core Objective

When this workflow is referenced, the agent must inspect the specified pull request, convert it to a draft PR on GitHub, monitor the pipeline tests, troubleshoot any test failures, push fixes, and repeat until the checks pass.

## Execution Steps

### 1. Set PR to Draft Mode

To prevent accidental merging while troubleshooting and to indicate that the PR is undergoing active maintenance:
- Check if the PR is currently a draft.
- If it is not a draft, convert it to a draft PR on GitHub using the following CLI command:
  ```bash
  gh pr ready --draft <pr-number-or-branch>
  ```

### 2. Inspect the PR and Tests

- Use the GitHub CLI to view active checks and status:
  ```bash
  gh pr checks <pr-number-or-branch>
  ```
- If any check is failing, retrieve detailed logs or comments about the failures. For instance, view PR diffs or run diagnostics using standard tools.

### 3. Diagnose and Solve Blockers

- Look for failing tests, linter errors, or build issues.
- Isolate the cause of the failure:
  - If a test is broken by changes in the PR, edit the code or the test to fix the regression.
  - If the failure is caused by an outdated branch, merge or rebase with the latest base branch.
  - If the issue is due to dependency mismatch, resolve the package dependencies.
- Verify fixes locally first (e.g. run local test commands like `npm test` or `ng build`).

### 4. Push and Poll

- Commit and push the resolved fixes to the remote branch:
  ```bash
  git add .
  git commit -m "fix: resolve CI blocker"
  git push origin HEAD
  ```
- Monitor the pipeline checks again by polling. You can run a background watcher or loop to check status:
  ```bash
  gh pr checks <pr-number-or-branch> --watch
  ```
- Keep monitoring until the entire pipeline is green.
