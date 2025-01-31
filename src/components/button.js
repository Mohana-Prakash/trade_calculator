export const Button = ({ clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}>
      Calculate CO₂ Emissions
    </button>
  );
};
