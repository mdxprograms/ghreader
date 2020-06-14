import React, { useEffect } from "react";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { userSelect, fetchUser, loadingSelect } from "./store/userSlice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Nav from "./components/Nav";

// Views
import IssuesRoute from "./routes/Issues";
import PullRequestsRoute from "./routes/PullRequests";
import ReposRoute from "./routes/Repos";
import RepoRoute from './routes/Repo'

import "./App.css";

const { Content } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelect);
  const loading = useSelector(loadingSelect);

  useEffect(() => {
    dispatch(fetchUser());
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Router>
        {user && <Nav user={user} />}
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ overflow: "initial", height: "100vh" }}>
            <div className="site-layout-background" style={{ padding: 24 }}>
              <>
                {(loading && !user) && <Loader loaded={loading} />}
                {(!loading && user) && (
                  <Switch>
                    <Route key="3" path="/repos">
                      <ReposRoute />
                    </Route>
                    <Route key="2" path="/repo/:name">
                      <RepoRoute />
                    </Route>
                    <Route key="1" exact path="/">
                      <IssuesRoute />
                    </Route>
                  </Switch>
                )}
              </>
            </div>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
};

export default App;
