import { Box } from "@mui/material";
import LeftSideBar from "../LeftSideBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import CommonHeader from "./commonHeader";

function CalendarInstance() {
  return (
    <Box className="section">
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
    </Box>
  );
}

function Calendar() {
  return (
    <div className="App">
      <Box sx={{ padding: "10px 0 0 40px", flex: 1 }}>
        <CommonHeader className="headerClass" />
      </Box>
      <Box sx={{ display: "flex", gap: "20px", flex: 9, height: "90vh" }}>
        <LeftSideBar></LeftSideBar>
        <CalendarInstance> </CalendarInstance>
      </Box>
    </div>
  );
}

export default Calendar;
