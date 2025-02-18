import "./components.css";
export default function Button({ label, onPress }) {
  return (
    <div className="buttonContainer">
      <button onClick={onPress} className="buttonCon">
        {label}
      </button>
    </div>
  );
}
