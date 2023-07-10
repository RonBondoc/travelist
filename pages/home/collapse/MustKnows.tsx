"use client";
import { useEffect, useState } from "react";
import styles from "../page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import HomeData from "../HomeData";

interface CollapseProps {
  country: string | undefined;
  hints?: string;
}

function MustKnows({ country, hints }: CollapseProps) {
  const countryString = country;
  const hintsString = hints;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    if (countryString) {
      setLoading(true);
      fetch(`/api/chat?country=${countryString}&hints=${hintsString}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [countryString, hintsString]);

  return (
    <>
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
            5 things to know before going to the {country}
          </button>
        </h2>

        <div
          id="mustKnows"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
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
    </>
  );
}

export default MustKnows;
