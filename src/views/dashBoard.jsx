import "../assets/styles/App.scss";
import "../assets/styles/root.scss";
import "../assets/styles/library.scss";
import "../assets/styles/dashboard.scss";
import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar.jsx";
import Footer from "../components/footer.jsx";
import StatisticCard from "../components/statisticCard";

export default function Dashboard() {
  const [tableName, setTableName] = useState(null);
  const [currentStats, setStats] = useState({});
  const [uniqueStats, setUniqueStats] = useState({});

  useEffect(() => {
    fetch("/most-recent-fb-list")
      .then((data) => data.json())
      .then((result) => {
        if (result.message === "success") {
          setTableName(result.allData.title);
          fetch(`/dashboard-statistics/${result.allData.title}`)
            .then((data) => data.json())
            .then((final) => {
              if (final.message === "success") {
                setStats({
                  ...currentStats,
                  totalServed: final.allData.totalPeople,
                  totalSeniors: final.allData.totalSeniors,
                  totalAdults: final.allData.totalAdults,
                  totalChildren: final.allData.totalChildren,
                  totalFamilies: final.allData.totalFamilies,
                  generalRetrieved: true,
                });
              } else {
                alert(final.message);
              }
            })
            .catch((e) => alert(e));

          fetch(`/dashboard-statistics-unique/${result.allData.title}`)
            .then((data) => data.json())
            .then((final) => {
              if (final.message === "success") {
                setUniqueStats({
                  ...uniqueStats,
                  totalFamilies: final.allData.totalFamilies,
                  totalPersons: final.allData.totalPeople,
                  uniqueRetrieved: true,
                });
              } else {
                alert(final.message);
              }
            })
            .catch((e) => alert(e));
        } else {
          alert(result.message);
        }
      });
  }, []);

  if (tableName) {
    return (
      <div>
        <div class="header_wrapper">
          <h1>Dashboard</h1>
        </div>
        <NavBar />
        <div id="content_wrapper">
          <div class="header_wrapper">
            <h2 id="table_name">{tableName}</h2>
          </div>
          <StatisticCard
            heading="General Statistics"
            dataArray={[
              { title: "Total Served", data: currentStats.totalServed },
              { title: "Total Families", data: currentStats.totalFamilies },
              { title: "Total Seniors", data: currentStats.totalSeniors },
              { title: "Total Adults", data: currentStats.totalAdults },
              { title: "Total Children", data: currentStats.totalChildren },
            ]}
          />
          <StatisticCard
            heading="Unique Statistcs"
            dataArray={[
              { title: "Total Families", data: uniqueStats.totalFamilies },
              { title: "Total People", data: uniqueStats.totalPersons },
            ]}
          />
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <div class="header_wrapper">
          <h1>Dashboard</h1>
        </div>
        <NavBar />
        <div id="content_wrapper">
          <div class="header_wrapper">
            <h2 id="table_name">No Current Table</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
