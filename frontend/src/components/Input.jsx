import "./components.css";

export default function Input({ typeOfInput, value, onChange }) {
  if (typeOfInput == "email") {
    return (
      <div className="inputContainer">
        <div className="inputLabel">EMAIL</div>
        <input
          className="styledInput"
          type="email"
          placeholder="Enter your email"
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  } else if (typeOfInput == "password") {
    return (
      <div className="inputContainer">
        <div className="inputLabel">PASSWORD</div>
        <input
          className="styledInput"
          type="password"
          placeholder="Enter your password"
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  } else if (typeOfInput == "name") {
    return (
      <div className="inputContainer">
        <div className="inputLabel">NAME</div>
        <input
          className="styledInput"
          type="text"
          placeholder="Alice Rodrigese"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}
