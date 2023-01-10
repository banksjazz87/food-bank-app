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
  totalFamilies: 0,
  totalUniqueFamilies: 0,
  totalUniquePersons: 0,
  tableName: 'testing',
  uniqueRetrieved: false,
  generalRetrived: false
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
          setStats({...currentStats, 
            totalServed: final.allData.totalPeople,
            totalSeniors: final.allData.totalSeniors,
            totalAdults: final.allData.totalAdults,
            totalChildren: final.allData.totalChildren,
            totalFamilies: final.allData.totalFamilies, 
            generalRetrieved: true
          });
        })

      fetch(`/dashboard-statistics-unique/${result.allData.title}`)
        .then(data => data.json())
        .then(final => {
          setStats({...currentStats,
            totalUniqueFamilies: final.allData.totalFamilies,
            totalUniquePersons: final.allData.totalFamilies, 
            uniqueRetrieved: true 
          })
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
    <p>{`Total people served ${currentStats.totalServed}`}</p>

      <Footer />
    </div>
  );

}
