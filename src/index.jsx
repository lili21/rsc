import React, {
  startTransition,
  use,
  useState,
  useEffect,
  Suspense,
} from "react";
import { createRoot } from "react-dom/client";
import { createFromFetch, encodeReply } from "react-server-dom-esm/client";

const initialContentFetchPromise = fetch(`/rsc`);
const initialContentPromise = createFromFetch(initialContentFetchPromise, {
  callServer,
});

let update = () => {
  console.error("you should call this");
};

async function callServer(id, args) {
  // console.log(args, await encodeReply(args));
  const fetchPrimmise = fetch("/action", {
    method: "POST",
    headers: { "rsc-action": id },
    body: await encodeReply(args),
  });

  const contentPromise = createFromFetch(fetchPrimmise, { callServer });
  update(contentPromise);

  const result = await contentPromise;
  console.log(result);
  return result.returnValue;
}

function Root() {
  const [contentPromise, setContentPromise] = useState(initialContentPromise);

  useEffect(() => {
    update = (nextContentPromise) => {
      // startTransition(() => {
      //   setContentPromise(nextContentPromise);
      // });
      setContentPromise(nextContentPromise);
    };
  }, []);
  const content = use(contentPromise);
  return content.root;
}

startTransition(() => {
  const root = createRoot(document.getElementById("root"));
  root.render(
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <Root />
      </Suspense>
    </div>,
  );
});
