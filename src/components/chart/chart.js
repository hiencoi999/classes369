import { useAuthenticator } from '@aws-amplify/ui-react';
import { Space } from 'antd';
import axios from 'axios';
import { CategoryScale, Chart as ChartJS } from 'chart.js/auto';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useOutletContext } from 'react-router-dom';
import './chart.css';
moment.locale('vi');
ChartJS.register(CategoryScale);

export default function WeatherChart() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [maxTemper, setMaxTemper] = useState([]);
  const [minTemper, setMinTemper] = useState([]);
  const [rainSum, setRainSum] = useState([]);
  const [calenderUrl, setCalenderUrl] = useState('');
  const props = useOutletContext();

  const fetchUserName = () => {
    let name = props.thisUser !== undefined ? props.thisUser.firstName + ' ' + props.thisUser.lastName : '';
    setCalenderUrl(
      `https://calendar.google.com/calendar/embed?mode=WEEK&showTz=0&showNav=1&showPrint=0&showDate=1&title=Xin chào ${name}&src=` +
        encodeURI(user.attributes.email)
    );
  };

  const fetchWeather = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      await axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum&current_weather=true&timezone=Asia%2FBangkok`
        )
        .then((res) => {
          setMaxTemper(res.data.daily.temperature_2m_max);
          setMinTemper(res.data.daily.temperature_2m_min);
          setRainSum(res.data.daily.rain_sum);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  useEffect(() => {
    fetchUserName();
    fetchWeather();
  }, []);

  const days = [0, 1, 2, 3, 4, 5, 6];
  const labels = days.map((day) => {
    return moment().add(day, 'days').format('dddd');
  });

  const temperature = {
    labels,
    datasets: [
      {
        label: 'Nhiệt độ cao nhất (℃)',
        data: maxTemper,
        borderColor: 'red',
        backgroundColor: 'red'
      },
      {
        label: 'Nhiệt độ thấp nhất (℃)',
        data: minTemper,
        borderColor: 'orange',
        backgroundColor: 'orange'
      }
    ]
  };
  const rain = {
    labels,
    datasets: [
      {
        label: 'Lượng mưa (mm)',
        data: rainSum,
        borderColor: 'blue',
        backgroundColor: 'blue'
      }
    ]
  };

  return (
    <>
      <Space direction="horizontal" style={{ position: 'fixed' }}>
        <div style={{ width: '58vw', height: '85vh', borderRadius: '10px' }}>
          <iframe
            width="100%"
            height="100%"
            style={{ borderRadius: '10px', border: 'solid red thin' }}
            src={calenderUrl}
            id="calendarEmbed"></iframe>
        </div>
        <div>
          <Space direction="vertical">
            <div
              style={{
                width: '36w',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '10px',
                border: 'solid black thin'
              }}>
              <h1>Nhiệt độ trong tuần tới</h1>
              <Line options={{ responsive: true }} data={temperature} />
            </div>
            <div
              style={{
                width: '36vw',
                textAlign: 'center',
                backgroundColor: 'white',
                borderRadius: '10px',
                border: 'solid black thin'
              }}>
              <h1>Lượng mưa trong tuần tới</h1>
              <Line options={{ responsive: true }} data={rain} />
            </div>
          </Space>
        </div>
      </Space>
    </>
  );
}
