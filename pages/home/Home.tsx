"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import HomeData from "./HomeData";

function Home() {
  const [country, setCountry] = useState<string | undefined>("");
  const [hints, setHints] = useState<string | undefined>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    if (country) {
      setLoading(true);
      fetch(`/api/chat?country=${country}&hints=${hints}`)
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
              disabled={isLoading}
              onClick={() => fetchChatGptResult()}
              type="button"
              className="btn btn-primary"
            >
              Let's Go
            </button>
          </div>
        </div>
        <br />
        <div className="row" hidden={!isLoading}>
          <div className="col-md-4"></div>
          <div className="col-md-5 d-flex justify-content-between">
            <button
              onClick={() => populateHints("with my family")}
              type="button"
              className="btn btn-outline-primary"
            >
              Family Trip
            </button>
            <button
              onClick={() => populateHints("with my love ones")}
              type="button"
              className="btn btn-outline-primary"
            >
              Romantic Getaway
            </button>
            <button
              onClick={() => populateHints("with my friend")}
              type="button"
              className="btn btn-outline-primary"
            >
              Travel with Friends
            </button>
          </div>
        </div>
      </div>
      <br />
      {/* {isLoading && <div>Loading...</div>} */}
      {isLoading && (
        <div>
          {/* <img className={styles.spinnerLogo} src="/travelistLogo.png" />    */}
          <img
            className={styles.spinner}
            src="/spinner.gif"
            alt="Loading2 ..."
          />
        </div>
      )}
      {!isLoading && data && (
        <div
          className="accordion"
          style={{
            width: "100%",
          }}
          id="accordionExample"
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mustKnows"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Must Knows in {country}
              </button>
            </h2>

            <div
              id="mustKnows"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="card">
                  {!isLoading &&
                    data &&
                    data.body.map((content: any, index: number) => {
                      return <HomeData content={content} />;
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#activities"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Must Try Activities in {country}
              </button>
            </h2>
            <div
              id="activities"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">Activities</div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#foods"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Must try foods in {country}
              </button>
            </h2>
            <div
              id="foods"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">Foods</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
