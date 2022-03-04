import Auxiliary from "../../hoc/Auxiliary";

const Layout = (props) => {
  return (
    <Auxiliary>
      <div>Toolbar,SideDrawer and Backdrops</div>
      <main>
        {props.children}
      </main>
    </Auxiliary>
  );
}
export default Layout;