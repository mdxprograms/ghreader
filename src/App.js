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

const Issues = () => {
  const [loaded, setLoaded] = useState(false)
  const [issues, setIssues] = useState([])

  useEffect(() => {
    const fetchIssues = async () => {
      const { data } = await octokit.issues.list()
      setIssues(data)
      setLoaded(true)
    }
    fetchIssues()
  }, [])

  return (
    <div>
      {!loaded && <Loader />} 
      {loaded &&
        issues.map(issue => <p>{issue.title}</p>)
      }
    </div>
  )
}

const Nav = ({ setView }) => (
  <nav>
    <button onClick={() => setView("issues")}>Issues</button>
    <button onClick={() => setView("pulls")}>Pull Requests</button>
    <button onClick={() => setView("notifications")}>Notifications</button>
    <button onClick={() => setView("followers")}>Followers</button>
    <button onClick={() => setView("following")}>Following</button>
  </nav>
)

function App() {
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [view, setView] = useState("")

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
      <Nav setView={setView} />
      {!loaded && <Loader />}
      {loaded && 
        <>
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
      {view === "issues" && <Issues />}
    </div>
  );
}

export default App;
