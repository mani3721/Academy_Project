import React, { useEffect, useState } from "react";

const Reports = () => {
  const [count, setCount] = useState(0);
  const [countData, setCountData] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCount(Math.trunc(Math.random() * (1000 - 900 + 1) + 900) + 100);
    }, 1000);
  }, [countData]);

  setTimeout(() => {
    setCountData(!countData);
  }, 1000);

  return (
    <>
      <p>Count: {count}</p>
    </>
  );
};

export default Reports;
