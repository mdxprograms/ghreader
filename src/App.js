import React, { useEffect, useState, Children } from 'react';
import { Octokit } from "@octokit/rest"
import './App.css';

const octokit = new Octokit({
  auth: process.env.REACT_APP_GH_TOKEN
});

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

const Loader = () =>
  <div>Loading...</div>

function App() {
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await octokit.users.getAuthenticated()
      setUser(data)
      setLoaded(true)
    }
    fetchUser()
  }, [])

  return (
    <div>
      <h1>Github Reader</h1>
      {!loaded && <Loader />}
      {loaded && 
        <>
          {console.log(user)}
          <h3>{user.name}</h3>
          <img src={user.avatar_url} alt="profile img"/>
          <ul>
            <li>Followers: {user.followers}</li>
            <li>Following: {user.following}</li>
            <li>Public Repos: {user.public_repos}</li>
            <li>Private: {user.total_private_repos}</li>
          </ul>
        </>  
      }
    </div>
  );
}

export default App;
