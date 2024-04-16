import React from "react";
import { getBandList } from "../server/db/band-api.js";

export async function BandList() {
  const bandList = await getBandList();
  return (
    <ul>
      {bandList.map((band) => (
        <li key={band}>{band}</li>
      ))}
    </ul>
  );
}
