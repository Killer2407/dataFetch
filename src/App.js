import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //   .then(res => res.json())
  //   .then((json) => {
  //     setData(json)
  //     setLoading(false)
  //     console.log(json)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // },[]);

  async function fetchData() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   const response = async() => {
  //     setLoading(false);
  //   const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
  //     console.log(res)
  //     setData(res.data)
  //     setLoading(false);
  //   }
  //   response();

  // }, [])

  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => {
  //       console.log(res.data);
  //       const response = res.data;
  //       setData(response);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="app">
          {data.map((item) => {
            return (
              <div className="data" key={item.id}>
                <ul>
                  <li>{item.body}</li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
