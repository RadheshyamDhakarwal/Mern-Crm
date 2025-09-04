const CountsCard = ({ title, count }) => {
  const getStylesByTitle = (title) => {
    switch (title) {
      case "Total Employees":
        return { code: "bi bi-person-fill", soft: "#fff7e6", bg: "#ffd966" };
      case "Total Leaders":
        return { code: "bi bi-person-vcard-fill", soft: "#e6f7ff", bg: "#5ee4ff" };
      case "Total Admins":
        return { code: "bi bi-shield-lock-fill", soft: "#fff0f6", bg: "#ff7b88" };
      case "Total Team Department":
        return { code: "bi bi-people-fill", soft: "#0d6efd1c", bg: "#62a1ff" };
      default:
        return { code: "bi bi-question-circle-fill", soft: "#f0f0f0", bg: "#62a1ff" };
    }
  };

  const { code, soft, bg } = getStylesByTitle(title);

  return (
    <div className="mb-3">
      <div className="rounded-3 p-2  d-flex flex-column justify-content-between" style={{ backgroundColor: soft }}>
  <div className="d-flex bg-white p-3 rounded-3 position-relative">
    <div
      className="rounded-circle d-flex align-items-center justify-content-center text-white"
      style={{ width: "32px", height: "32px", backgroundColor: bg }}
    >
      <i className={code}></i>
    </div>

    <div className="ms-2">
      <span className="text-muted fw-medium" style={{ fontSize: "14px" }}>
        {title}
      </span>
      <p className="fw-bold text-dark mb-0">{count}</p>
    </div>

    <div
      className="d-flex align-items-center text-success small"
      style={{ position: "absolute", right: "10px", bottom: "10px" }}
    >
      <i className="fas fa-arrow-up me-1"></i>
      <span className="fw-semibold" style={{fontSize:"12px"}}>2.5%</span>
      <span className="ms-1 text-muted fw-normal" style={{fontSize:"12px"}}>vs last month</span>
    </div>
  </div>
</div>

    </div>
  );
};

export default CountsCard;
