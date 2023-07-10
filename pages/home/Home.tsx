"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import dynamic from "next/dynamic";

const MustKnowsDynamic = dynamic(() => import("./collapse/MustKnows"));
const ActivitiesDynamic = dynamic(() => import("./collapse/Activities"));
const FoodsDynamic = dynamic(() => import("./collapse/Foods"));

function Home() {
  const [country, setCountry] = useState<string | undefined>("");
  const [hints, setHints] = useState<string | undefined>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap");
  }, []);

  const fetchChatGptResult = () => {
    const inputVal = inputRef.current?.value.trim();
    console.log(inputVal);
    if (!inputVal) {
      alert("Please enter a destination first before clicking me!");
    } else {
      if (inputVal.length == 0) {
        alert("Please enter a destination first before clicking me!");
        return;
      }
      setCountry(inputVal.toString());
      return;
    }
  };

  const populateHints = (val: string) => {
    console.log(val);
    setHints(val);
    return;
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <div className="row">
          <div className="span4">
            <img className={styles.centerblock} src="/travelistLogo.png" />
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-5"></div>
          <div className="col-md-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Where to ..."
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <button
              onClick={() => fetchChatGptResult()}
              type="button"
              className="btn btn-primary"
            >
              Let's Go
            </button>
          </div>
        </div>
        <br />
        {country && (
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-5 d-flex justify-content-between">
              <button
                onClick={() => populateHints("family")}
                type="button"
                className="btn btn-outline-primary"
              >
                Family Trip
              </button>
              <button
                onClick={() => populateHints("Loved ones")}
                type="button"
                data-hint="love"
                className="btn btn-outline-primary"
              >
                Romantic Getaway
              </button>
              <button
                onClick={() => populateHints("friends")}
                type="button"
                className="btn btn-outline-primary"
              >
                Travel with Friends
              </button>
            </div>
          </div>
        )}
      </div>
      <br />
      {country && (
        <div
          className="accordion"
          style={{
            width: "100%",
          }}
          id="accordionExample"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <MustKnowsDynamic country={country} hints={hints} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <ActivitiesDynamic country={country} hints={hints} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <FoodsDynamic country={country} hints={hints} />
          </Suspense>
        </div>
      )}
    </main>
  );
}

export default Home;
