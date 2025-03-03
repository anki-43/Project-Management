import { Box } from "@mui/material";
import LeftSideBar from "../LeftSideBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import CommonHeader from "./commonHeader";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

function CalendarInstance() {
  const [list, setList] = useState({});
  const [events, setEvents] = useState([]);
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

  return (
    <Box className="section">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        // events={[
        //   { title: "event 1", date: "2025-04-01" },
        //   { title: "event 2", date: "2025-04-02" },
        // ]}
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
