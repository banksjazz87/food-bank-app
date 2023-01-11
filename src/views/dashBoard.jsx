import "../assets/styles/App.scss";
import "../assets/styles/root.scss";
import "../assets/styles/library.scss";
import "../assets/styles/dashboard.scss";
import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar.jsx";
import Footer from "../components/footer.jsx";
import StatisticCard from "../components/statisticCard";

export default function Dashboard() {
  const[tableName, setTableName] = useState("");
  const [currentStats, setStats] = useState({});
  const [uniqueStats, setUniqueStats] = useState({});

  useEffect(() => {
    fetch("/most-recent-fb-list")
      .then((data) => data.json())
      .then((result) => {
        setTableName(result.allData.title);
        fetch(`/dashboard-statistics/${result.allData.title}`)
          .then((data) => data.json())
          .then((final) => {
            setStats({
              ...currentStats,
              totalServed: final.allData.totalPeople,
              totalSeniors: final.allData.totalSeniors,
              totalAdults: final.allData.totalAdults,
              totalChildren: final.allData.totalChildren,
              totalFamilies: final.allData.totalFamilies,
              generalRetrieved: true,
            });
          });

        fetch(`/dashboard-statistics-unique/${result.allData.title}`)
          .then((data) => data.json())
          .then((final) => {
            setUniqueStats({
              ...uniqueStats,
              totalUniqueFamilies: final.allData.totalFamilies,
              totalUniquePersons: final.allData.totalFamilies,
              uniqueRetrieved: true,
            });
          });
      });
  },[]);

 
    return (
      <div>
        <div class="header_wrapper">
          <h1>Dashboard</h1>
        </div>
        <NavBar />
        <div id="content_wrapper">
        <h2 id="table_name">{`Statistics for ${tableName}`}</h2>
        <div id="general_statistics">
          <StatisticCard title="Total Served" data={currentStats.totalServed} />
          <StatisticCard title="Total Families" data={currentStats.totalFamilies} />
          <StatisticCard title="Total Seniors" data={currentStats.totalSeniors} />
          <StatisticCard title="Total Adults" data={currentStats.totalAdults} />
          <StatisticCard title="Total Children" data={currentStats.totalChildren} />
          </div>
        </div>

        <Footer />
      </div>
    );
}
