"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import HomeData from "./HomeData";

function Home() {
  const [country, setCountry] = useState<string | undefined>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (country) {
      setLoading(true);
      fetch(`/api/chat?country=${country}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [country]);

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

  return (
    <main className={styles.main}>
      <div className="container">
        <div className="row">
          <div className="span4">
            <img className={styles.centerblock} src="/travelistLogo2.png" />
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
              disabled={isLoading}
              onClick={() => fetchChatGptResult()}
              type="button"
              className="btn btn-primary"
            >
              Let's Go
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="card">
        {isLoading && <div>Loading...</div>}
        {!isLoading &&
          data &&
          data.body.map((content: any, index: number) => {
            return <HomeData content={content} />;
          })}
      </div>
    </main>
  );
}

export default Home;
