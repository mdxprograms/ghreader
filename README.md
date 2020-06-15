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

## Development

- Create an auth token in developer settings with access to `gist, notifications, repo, user` https://github.com/settings/tokens/new
- Create a new `.env.local` in the project root directory with `REACT_APP_GH_TOKEN=<your_auth_token`
- `npm i`
- Start react `npm start`
- Start electron app `npm run start-electron`


## Future Plans
- package in electron app (request auth token on first use and store in local env file)
- graphs
- ...
