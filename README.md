# Github Reader

Uses Octokit REST sdk - https://octokit.github.io/rest.js/v17

```javascript
/**
 * get users following -> octokit.users.listFollowedByAuthenticated();
 * get users followers -> octokit.users.listFollowersForAuthenticatedUser();
 * get issues assigned to user -> octokit.issues.list();
 * get gists owned by user -> octokit.gists.list();
 * get gist owned by user ->
 * octokit.gists.get({
 *   gist_id,
 * });
 * get notifications for user -> octokit.activity.listNotificationsForAuthenticatedUser();
 */
```