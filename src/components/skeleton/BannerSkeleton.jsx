import "./skeleton.css";
const BannerSkeleton = () => {
  return (
    <div className="container">
      <div className="banner-skeleton">
        <div className="banner-skeleton__title"></div>
        <div className="banner-skeleton__text"></div>
        <div className="banner-skeleton__button"></div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
