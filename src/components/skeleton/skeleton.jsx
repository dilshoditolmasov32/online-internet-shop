export default function Skeleton({ count = 12 }) {
  const skeletonArray = Array(count).fill(0);

  return (
    <div className="container">
      <div className="skeleton__wrapper">
        {skeletonArray.map((_, index) => (
          <div className="skeleton__card" key={index}>
            <div className="skeleton__image skeleton__anime"></div>
            <div className="skeleton__title skeleton__anime"></div>
            <div className="skeleton__price skeleton__anime"></div>
          </div>
        ))}
      </div>
    </div>
  );
}