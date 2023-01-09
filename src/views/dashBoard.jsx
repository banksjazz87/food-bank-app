import "../assets/styles/App.scss";
import "../assets/styles/root.scss";
import "../assets/styles/library.scss";
import "../assets/styles/dashboard.scss";
import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar.jsx";
import Footer from "../components/footer.jsx";

export default function Dashboard() {

const [currentStats, setStats] = useState({
  totalServed: 0,
  totalSeniors: 0,
  totalAdults: 0,
  totalChildren: 0,
  tableName: 'testing',
  allRetrieved: false,
});

useEffect(() => {
  fetch('/most-recent-fb-list')
    .then(data => data.json())
    .then((result) => {
      setStats({...currentStats, 
        tableName: result.allData.title, 
      });
      fetch(`/dashboard-statistics/${result.allData.title}`)
        .then(data => data.json())
        .then(final => {
          console.log(final);
        })
      
    });
}, []);

  return (
    <div>
      <div class="header_wrapper">
        <h1>Dashboard</h1>
      </div>
      <NavBar />
    <h1>{currentStats.tableName}</h1>

      <Footer />
    </div>
  );

}
