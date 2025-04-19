import { Box, Button } from "@mui/material";
import LeftSideBar from "../LeftSideBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import CommonHeader from "./commonHeader";
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import axios from "axios";

function CalendarInstance() {
  const [list, setList] = useState({});
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const fetchList = async () => {
    const response = await axios.get(
      "http://localhost:8081/proj/getAppointments"
    );
    if (response.data.status) {
      setList(response.data.list);
      calculateEvents();
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  function calculateEvents() {
    let milestonesEvents =
      list?.milestones?.map((el) => {
        return {
          title: el.name,
          date: dayjs(el.dueDate).format("YYYY-MM-DD"),
        };
      }) || [];

    let tasksEvents =
      list?.tasks?.map((el) => {
        return {
          title: el.name,
          date: dayjs(el.dueDate).format("YYYY-MM-DD"),
        };
      }) || [];
    console.log([...milestonesEvents, ...tasksEvents]);
    setEvents([...milestonesEvents, ...tasksEvents]);
  }

  // Function to change the view programmatically
  const handleViewChange = (view) => {
    const calendarApi = calendarRef.current.getApi(); // Access FullCalendar API
    calendarApi.changeView(view); // Change the view
  };

  return (
    <Box className="section">
      <Box
        sx={{
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => handleViewChange("dayGridMonth")}
        >
          Month
        </Button>
        <Button
          variant="contained"
          onClick={() => handleViewChange("timeGridWeek")}
        >
          Week
        </Button>
        <Button
          variant="contained"
          onClick={() => handleViewChange("timeGridDay")}
        >
          Day
        </Button>
      </Box>
      <FullCalendar
        ref={calendarRef} // Attach the ref to FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth" // Set the default view
        events={events}
      />
    </Box>
  );
}

function Calendar() {
  return (
    <div className="App">
      <Box sx={{ padding: "10px 0 0 40px" }}>
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
