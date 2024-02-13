import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from "react-chartjs-2"
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBookOpen, faCalendar, faPlus, faShirt, faUser, faUserTie, faBox } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Chart from 'chart.js/auto';

// import dailyLoginChart from '../../../components/variables/chart.js'


const Dashboard = () => {
  // to get the one week label
  var labels = [];
  var today = new Date();
  for (var i = 6; i >= 0; i--) { // Start from 6 and decrement to 0
      // Generate the date for each label by subtracting the number of days from the current date
      var date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  // to get the total number registered
  const [registeredStudentsCount, setRegisteredStudentsCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [under18Count, setUnder18Count] = useState(0);
  const [age18to25Count, setAge18to25Count] = useState(0);
  const [age26to35Count, setAge26to35Count] = useState(0);
  const [above35Count, setAbove35Count] = useState(0);

  useEffect(() => {
      const fetchRegisteredStudentsCount = async () => {
          try {
              const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/dashboard/registered-students-count');
              console.log(response.data.count)
              setRegisteredStudentsCount(response.data.count);
          } catch (error) {
              console.error('Error fetching registered students count:', error);
          }
      };

      const fetchStudentGenderCounts = async () => {
        try {
            const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/dashboard/gender-students-count');
            setMaleCount(response.data.maleCount);
            setFemaleCount(response.data.femaleCount);
            console.log(response.data.femaleCount)
            console.log(response.data.maleCount)
        } catch (error) {
            console.error('Error fetching student gender counts:', error);
        }
      };

      const fetchStudentAgeCounts = async () => {
        try {
            const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/dashboard/age-students-count');
            setUnder18Count(response.data.under18Count);
            setAge18to25Count(response.data.age18to25Count);
            setAge26to35Count(response.data.age26to35Count);
            setAbove35Count(response.data.above35Count);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching students age counts:', error);
        }
      };

      fetchRegisteredStudentsCount();
      fetchStudentGenderCounts();
    }, []);

  return (
    <div className='dashboard'>
      <div className="chart-wrapper">  
        <Container>
          <Row>
            <Col>
              <Card style={{ height: '200px', padding: '20px' }}>
                <div className="dataCard">
                  <FontAwesomeIcon icon={faUser} className='dash-icon' />
                  <div className="data-text">
                    <p> {registeredStudentsCount} </p>
                    <p> Total Students </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col> 
              <Card style={{ height: '200px', padding: '20px' }}>
                <Doughnut 
                  data={{
                    labels: ["Under 18", "19-25", "26-35", "36 and over"],
                    datasets: [
                      {
                        label: "Age",
                        data: [under18Count, age18to25Count, age26to35Count, above35Count],
                      },
                    ],
                  }}
                />
              </Card>
            </Col>
            <Col>
              <Card style={{ height: '200px', padding: '20px' }}>
                <Doughnut 
                  data={{
                    labels: ["Male", "Female", "Others"],
                    datasets: [
                    {
                      label: "Students",
                      data: [maleCount, femaleCount, 1],
                    },
                  ],
                }}
              />
              </Card>
            
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={{ height: '300px', marginTop: '20px', padding: '20px 40px'}}>
                <Line
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        label: 'Login Per Day',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [0, 10, 5, 2, 20, 30, 45]
                    },
                  ],
                  }}
                />
              </Card >
            </Col>
            <Col>
                <Card style={{ height: '300px', marginTop: '20px', padding: '20px 40px'}}>

                </Card>
            </Col>
          </Row>
        </Container>
        {/* <div className="dataCard revenueCard">

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
        </div> */}
      </div>
    </div>
  )
}

export default Dashboard
