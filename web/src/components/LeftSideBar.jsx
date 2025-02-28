import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveTabname } from "../features/mainTabs/mainTabsStore";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";

function LeftSideBar() {
  const [drawerState, updateState] = useState(true);
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
  ];

  return (
    <div
      className={
        drawerState ? "openDrawer leftSideBar" : "closeDrawer leftSideBar"
      }
    >
      <div className="content">
        {drawerState ? (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <ArrowBackIcon
              sx={{
                marginTop: "20px",
                marginRight: "20px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "end",
              }}
              onClick={() => updateState(!drawerState)}
            ></ArrowBackIcon>
          </Box>
        ) : (
          <ArrowForwardIcon
            sx={{
              marginTop: "20px",
              marginRight: "20px",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={() => updateState(!drawerState)}
          ></ArrowForwardIcon>
        )}
        <Divider sx={{ mt: 2 }} />
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{ textAlign: "center" }}
          className="longerTabs"
        >
          {propsArr.map((el, i) => (
            <Link to={`/${el.name}`} key={el.name}>
              {drawerState ? (
                <Tab
                  label={el.label}
                  value={i}
                  key={el.label}
                  sx={{ width: "100%" }}
                  icon={
                    el.name == "home" ? <HomeIcon /> : <CalendarMonthIcon />
                  }
                  iconPosition="start"
                />
              ) : (
                <Tab
                  label={""}
                  value={i}
                  key={el.label}
                  sx={{ width: "100%" }}
                  icon={
                    el.name == "home" ? <HomeIcon /> : <CalendarMonthIcon />
                  }
                  iconPosition="start"
                />
              )}
            </Link>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default LeftSideBar;
