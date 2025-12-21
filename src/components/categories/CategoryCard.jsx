import "../../styles/scss/vendors/categoryCard.scss";
import api from "../../api/axios";

export default function CategoryCard({ info }) {
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${api + info.image})`,
      }}
    >
      <div className="card__wrap">
        <div className="card__desc">
          <h3 className="card__desc-title">{info.name}</h3>
          <p className="card__desc-text">{info.description}</p>
        </div>
      </div>
    </div>
  );
}
