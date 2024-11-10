import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveTabname } from "../features/mainTabs/mainTabsStore";
import { Link } from "react-router-dom";

function LeftSideBar() {
  const value = useSelector((state) => state.mainTabsStore.tabName);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(changeActiveTabname(newValue));
  };

  const propsArr = [
    {
      name: "home",
      label: "Home",
    },
    {
      name: "calendar",
      label: "Calendar",
    },
    {
      name: "history",
      label: "History",
    },
  ];

  return (
    <div className="leftSideBar">
      <div className="content">
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{ textAlign: "center" }}
        >
          {propsArr.map((el, i) => (
            <Link to={`/${el.name}`} key={el.name}>
              <Tab label={el.label} value={el.name} key={el.label} />
            </Link>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default LeftSideBar;
