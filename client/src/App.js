import React, { Component, Suspense, lazy } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import ErrorBoundary from "./components/errors/ErrorBoundary";
import Header from "./components/partials/header";
import Footer from "./components/partials/footer";
const MainPage = lazy(() => import("./pages/main"));
const UserPage = lazy(() => import("./pages/user"));
const DetailPage = lazy(() => import("./pages/details"));
const ErrorPage = lazy(() => import("./components/errors/ErrorPage"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => { }

  render() {

    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Header />
          <Suspense fallback={<div style={{ margin: 10 }}>Loading ...</div>}>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/user" component={UserPage} />
              <Route path="/post/:id" component={DetailPage} />
              <Route component={ErrorPage} />
            </Switch>
          </Suspense>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    )
  }
}

export default App;