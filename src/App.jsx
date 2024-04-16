import React, { Suspense } from "react";
import { BandList } from "./BandList.js";

export default function App() {
  return (
    <div>
      <h1>喜爱的乐队</h1>
      <Suspense fallback={<div>loading...</div>}>
        <BandList />
      </Suspense>
    </div>
  );
}
