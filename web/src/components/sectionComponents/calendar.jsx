import { Box } from "@mui/material";
import LeftSideBar from "../LeftSideBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

function CalendarInstance() {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
}

function Calendar() {
  return (
    <div className="App">
      <LeftSideBar></LeftSideBar>
      <Box sx={{ flex: 10, paddingY: 5, marginRight: 2}}>
        <CalendarInstance></CalendarInstance>
      </Box>
    </div>
  );
}

export default Calendar;
