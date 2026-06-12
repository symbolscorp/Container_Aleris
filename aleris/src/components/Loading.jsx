import "../styles/Loading.css";

const Loading = ({ fullScreen = false, text = "Cargando..." }) => {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-logo">
          <span className="loading-ball">🏐</span>
          <div className="loading-spinner" />
        </div>
        <p className="loading-text">{text}</p>
      </div>
    );
  }

  return (
    <div className="loading-inline">
      <div className="loading-spinner-sm" />
      <span>{text}</span>
    </div>
  );
};

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-line skeleton-line--title" />
    <div className="skeleton-line skeleton-line--mid" />
    <div className="skeleton-line skeleton-line--short" />
    <div className="skeleton-line skeleton-line--mid" />
  </div>
);

export default Loading;
