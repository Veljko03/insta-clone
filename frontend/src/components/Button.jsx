import "./components.css";
export default function Button({ label }) {
  return (
    <div className="buttonContainer">
      <button type="submit" className="buttonCon">
        {label}
      </button>
    </div>
  );
}
