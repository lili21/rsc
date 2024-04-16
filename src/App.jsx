import React, { Suspense } from "react";
import { BandList } from "./BandList.js";
import { addBand } from "./actions.js";

export default function App() {
  return (
    <div>
      <h1>喜爱的乐队</h1>
      <form action={addBand}>
        <input name="name" placeholder="add favaritor band" />
        <button type="submit">add</button>
      </form>
      <Suspense fallback={<div>loading...</div>}>
        <BandList />
      </Suspense>
    </div>
  );
}
