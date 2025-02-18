import "./components.css";
export default function Button({ label, onPress }) {
  return (
    <div className="button_container">
      <div onClick={onPress} className="button_com">
        <div className="btn_label">{label}</div>
      </div>
    </div>
  );
}
