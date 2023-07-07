import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.css";

interface HomeDataProps {
  content: string;
}

function HomeData(props: HomeDataProps) {
  return (
    <div className={styles.card}>
      <div className="card-body">{props.content}</div>
    </div>
  );
}

export default HomeData;
