import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveTabname } from "../features/mainTabs/mainTabsStore";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { me } from "../authenticate";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HistoryIcon from "@mui/icons-material/History";

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

  let user = undefined;

  // useEffect(()=>{
  me().then(
    (res) => {
      user = res;
    },
    (err) => {
      console.log("err", err);
    }
  );
  // }, [])

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
              <Tab
                label={el.label}
                value={i}
                key={el.label}
                sx={{ width: '100%' }}
                icon={
                  el.name == "home" ? (
                    <HomeIcon />
                  ) : el.name == "calendar" ? (
                    <CalendarMonthIcon />
                  ) : (
                    <HistoryIcon />
                  )
                }
                iconPosition="start"
              />
            </Link>
          ))}
        </Tabs>
        <Box>{user?.username}</Box>
      </div>
    </div>
  );
}

export default LeftSideBar;
