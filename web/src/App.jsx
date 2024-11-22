import { Route, Routes } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar.jsx";
import Section from "./components/Section.jsx";
import Calendar from "./components/sectionComponents/calendar.jsx";
import Activity from "./components/sectionComponents/activity.jsx";
import CreateProject from "./components/createProject.jsx";
import Login from "./components/login.jsx";
import DetailView from "./components/detailsView.jsx";
import Registeruser from "./components/registerUser.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Registeruser />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route path="/history" element={<Activity />}></Route>
        <Route path="/create" element={<CreateProject />}></Route>
        <Route path="/detailView/:id" element={<DetailView />}></Route>
      </Routes>
    </>
  );
}

function Home() {
  return (
    <div className="App">
      <LeftSideBar></LeftSideBar>
      <Section></Section>
    </div>
  );
}

export default App;
