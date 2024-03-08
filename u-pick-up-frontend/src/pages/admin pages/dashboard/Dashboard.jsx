import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from "react-chartjs-2"
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Chart from 'chart.js/auto';


const Dashboard = () => {

  const [adminName, setAdminName] = useState("");

  const [registeredStudentsCount, setRegisteredStudentsCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [nonBinaryCount, setNonBinaryCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const [prefNotToSayCount, setPrefNotToSayCount] = useState(0);

  const [under18Count, setUnder18Count] = useState(0);
  const [age18to25Count, setAge18to25Count] = useState(0);
  const [age26to35Count, setAge26to35Count] = useState(0);
  const [above35Count, setAbove35Count] = useState(0);
  const [loginData, setLoginData] = useState([]);

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
            setNonBinaryCount(response.data.nbCount);
            setOtherCount(response.data.otherCount);
            setPrefNotToSayCount(response.data.prefNotCount);
            console.log(response.data.femaleCount)
            console.log(response.data.maleCount)
            console.log(response.data.nbCount)
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
        } catch (error) {
            console.error('Error fetching students age counts:', error);
        }
      };

      const fetchLoginData = async () => {
        try {
          const response = await axios.get('https://u-pick-up-y7qnw.ondigitalocean.app/api/dashboard/login-data');
          const modifiedLoginData = response.data.map(item => {
            const dateParts = item.date.split('-');
            const newDate = new Date(dateParts[0], parseInt(dateParts[1]) - 1, dateParts[2]);
            const monthName = newDate.toLocaleString('default', { month: 'long' });
            return { ...item, date: `${monthName} ${dateParts[2]}` };
          });
          setLoginData(modifiedLoginData);
          console.log(modifiedLoginData);
        } catch (error) {
          console.error('Error fetching login data:', error);
        }
      };

      fetchRegisteredStudentsCount();
      fetchStudentGenderCounts();
      fetchStudentAgeCounts();
      fetchLoginData();
    }, []);

    useEffect(() => {
      const adminName = localStorage.getItem('admin_name');
      setAdminName(adminName);
    }, []);

  const dateLabels = loginData.map(data => data.date);
  const loginCounts = loginData.map(data => data.count);

  return (
    <div className='dashboard'>
      <Card className='dashboard-header' style={{ height: '60px', display: 'flex' }}>
        <h2> Dashboard </h2>
      </Card>
      <h5 className='hi-text'> Hi, {adminName}! </h5>
      <div className="chart-wrapper">  
        <Container className='dash-container'>
          <Row>
            <Col>
              <Link to="/admin/dashboard-department" style={{ textDecoration: 'none' }}> 
                <Card className='totalStudents' style={{ height: '220px', padding: '20px', display: 'flex', flexDirection: 'row' }}>
                  <Col>
                    <FontAwesomeIcon icon={faUser} className='dash-icon students-icon-dashboard' />
                  </Col>
                  <Col className='data-text'>
                    <p> Total Students Registered </p>
                    <h4> {registeredStudentsCount} </h4>
                  </Col>
                </Card>
              </Link>
            </Col>
            <Col> 
            <Card style={{ height: '220px', padding: '20px', display: 'flex', alignItems: 'center' }}>
              <div style={{ maxWidth: '100%', maxHeight: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                  <p className='dash-label'> Students by Age </p>
                </div>
                <Doughnut style={{margin: '5px'}}
                  data={{
                    labels: ["Under 18", "19-25", "26-35", "36 and over"],
                    datasets: [
                      {
                        label: "Age",
                        data: [under18Count, age18to25Count, age26to35Count, above35Count],
                        backgroundColor: [ '#163020', '#304D30', '#B6C4B6', '#EEF0E5'],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                      },
                    },
                    maintainAspectRatio: false, 
                  }}
                />
              </div>
            </Card>
            </Col>
            <Col>
            <Card style={{ height: '220px', padding: '20px', display: 'flex', alignItems: 'center' }}>
              <div style={{ maxWidth: '100%', maxHeight: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                  <p className='dash-label'> Students by Gender </p>
                </div>
                <Doughnut style={{margin: '5px'}}
                  data={{
                    labels: ["Male", "Female", "Non Binary", "Other", "Prefer not to say"],
                    datasets: [
                      {
                        label: "Students",
                        data: [maleCount, femaleCount, nonBinaryCount, otherCount, prefNotToSayCount],
                        backgroundColor: [
                          '#5F6F52',
                          '#A9B388', 
                          '#FEFAE0', 
                          '#B99470', 
                          '#50574b',
                        ]
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        position: "right",
                      },
                    },
                    maintainAspectRatio: false, 
                  }}
                />
              </div>
            </Card>

            
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={{ height: '300px', marginTop: '20px', padding: '20px 40px'}}>
                {/* <p className='week-text'> Week </p> */}
              <Line className='login-chart'
                data={{
                  labels: dateLabels,
                  datasets: [
                    {
                      label: 'Login Per Day',
                      backgroundColor: 'transparent',
                      borderColor: '#96BAB3',
                      data: loginCounts,
                      tension: 0.5
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: 'Login Per Day',
                      font: {
                        size: 16,
                        weight: 'normal'
                      }
                    },
                    legend: false,
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Date',
                        font: {
                          size: 14,
                          weight: 'bold' 
                        },
                      },
                      grid: {
                        display: false
                      }
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Number of Students',
                        font: {
                          size: 14, // Change font size
                          weight: 'bold' 
                        },
                      },
                      min: 0,
                      ticks: {
                        stepSize: 2,
                      },
                      border: { dash: [10] }
                    }
                  },
                  maintainAspectRatio: false,
                }}
              />

              </Card >
            </Col>
            {/* <Col>

            </Col> */}
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Dashboard
