import React from 'react'
import { Chart as Chartjs} from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faCalendar, faPlus, faShirt, faUser, faUserTie, faBox } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className="chart-wrapper">  
        <div className="dataCard revenueCard">

        </div>
        <div className="dataCard revenueCard">
          <Bar 
            data={{
                labels: ["A", "B", "C"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [100, 600, 300],
                  },
                  {
                    label: "Revener",
                    data: [50, 20, 170],
                  },
                  {
                    label: "Venerue",
                    data: [300, 55, 135],
                  },
                ],
              }}
          />
        </div>
        <div className="dataCard revenueCard">
        <Doughnut 
            data={{
                labels: ["A", "B", "C"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [100, 600, 300],
                  },
                ],
              }}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
