import React, { Component, Suspense, lazy } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import ErrorBoundary from "./components/errors/ErrorBoundary";
import { setCurrentUser } from "./redux/user/actions";
import axios from "axios";
import { connect } from "react-redux";
import Header from "./components/partials/header";
import Footer from "./components/partials/footer";
const MainPage = lazy(() => import("./pages/main"));
const UserPage = lazy(() => import("./pages/user"));
const DetailPage = lazy(() => import("./pages/details"));
const ErrorPage = lazy(() => import("./components/errors/ErrorPage"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "hello",
    };
  }

  componentDidMount = async () => {
    const user = await axios.get("/auth/current_user");
    this.props.setCurrentUser(user.data);
  }

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
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  // action名 setCurrentUser
  setCurrentUser: (user) => { dispatch(setCurrentUser(user)); }//dispatch(setCurrentUser)这个setCurrentUser是从上面导入的
})

// connect(param1--从redux里面拿出数据,param2--向redux里面写入数据)
export default connect(null, mapDispatchToProps)(App);