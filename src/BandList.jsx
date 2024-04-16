import React, { useEffect, useState } from "react";

export function BandList() {
  const [bandList, setBandList] = useState([]);
  useEffect(() => {
    fetch("/api/band-list").then(async (res) => {
      const result = await res.json();
      setBandList(result);
    });
  }, []);
  return (
    <ul>
      {bandList.map((band) => (
        <li>{band}</li>
      ))}
    </ul>
  );
}
