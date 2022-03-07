import { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  drawerToggleClickedHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };
  render() {
    return (
      <Auxiliary>
        <Toolbar
          drawerToggleClicked={this.drawerToggleClickedHandler}
        ></Toolbar>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.SideDrawerClosedHandler}
        ></SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}
export default Layout;
