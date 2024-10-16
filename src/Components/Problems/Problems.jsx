import React, { useEffect, useState } from 'react';
import './Problems.css';

export default function Problems({ hackathon_name }) {

  const [collecteddata, setcollecteddata] = useState([]);

  useEffect(() => {
    fetch("https://hackathon-app-2.onrender.com/problems", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cardclicked: hackathon_name })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setcollecteddata(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [hackathon_name]);

  return (
    <div>
      <div className="banner w-[100%] h-[50vh] mb-[50px]">
        <h1>PROBLEM STATEMENTS</h1>
      </div>
      <div className="problems-container px-[150px]">
        <table className="problems-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Problem Statement Title</th>
              <th>Category</th>
              <th>Theme</th>
            </tr>
          </thead>
          <tbody>
            {collecteddata.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.statement}</td>
                <td>{item.category.software ? "Software" : "Hardware"}</td>
                <td>{item.theme}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='p-[30px]'>
        <button className='btn btn-success float-right w-[200px]'>Participate</button>
      </div>
    </div>
  );
}
