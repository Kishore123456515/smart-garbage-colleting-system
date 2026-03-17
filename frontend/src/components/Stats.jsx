import React, { useEffect, useState } from "react";
import axios from "axios";

function Stats() {

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    cleaning: 0,
    completed: 0
  });

  useEffect(() => {

    axios.get("http://localhost:8081/api/admin/stats")
      .then(res => {
        setStats(res.data);
      })
      .catch(err => console.log(err));

  }, []);

  return (

    <div style={{textAlign:"center", marginTop:"40px"}}>

      <h2>City Complaint Statistics</h2>

      <div style={{
        display:"flex",
        justifyContent:"center",
        gap:"30px",
        marginTop:"30px"
      }}>

        <div className="statCard">
          <h3>{stats.total}</h3>
          <p>Total Complaints</p>
        </div>

        <div className="statCard">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>

        <div className="statCard">
          <h3>{stats.cleaning}</h3>
          <p>Cleaning</p>
        </div>

        <div className="statCard">
          <h3>{stats.completed}</h3>
          <p>Completed</p>
        </div>

      </div>

    </div>

  );
}

export default Stats;