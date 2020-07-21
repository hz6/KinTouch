import React, { Suspense, lazy } from "react"
import { Route, BrowserRouter } from "react-router-dom"
import MainPage from "./pages/main";
import UserPage from "./pages/user";
import DetailPage from "./pages/details";
import Header from "./components/partials/header";
import Footer from "./components/partials/footer";
import { setCurrentUser } from "./redux/user/actions";
import axios from "axios";
import { connect } from "react-redux";

class App extends React.Component {
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
        <Header />
        <Route exact path="/" component={MainPage} />
        <Route exact path="/user" component={UserPage} />
        <Route path="/post/:id" component={DetailPage} />
        <Footer />
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