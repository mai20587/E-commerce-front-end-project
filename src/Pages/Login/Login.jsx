 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

 
function Alert({ type, message }) {
  if (!message) return null;
  const icons   = { danger: "✕", success: "✓", warning: "⚠" };
  return (
    <div className={`login-alert login-alert--${type}`} role="alert">
      <span className="login-alert__icon">{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
}

 
function Field({ label, error, children }) {
  return (
    <div className="login-field">
      <label className="login-field__label">{label}</label>
      {children}
      {error && (
        <div className="login-field__error">
          <span>●</span> {error}
        </div>
      )}
    </div>
  );
}

 
const Login = () => {
  const [username,    setUsername]    = useState("");
  const [password,    setPassword]    = useState("");
  const [showPw,      setShowPw]      = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});
  const [alertWarn,   setAlertWarn]   = useState("");
  const [alertError,  setAlertError]  = useState("");
  const [alertSuccess,setAlertSuccess]= useState("");
  const [loggedInUser,setLoggedInUser]= useState(null);

  const [loading,     setLoading]     = useState(false);
  const [done,        setDone]        = useState(false);

  const navigate = useNavigate();

  
  const clearAlerts = () => {
    setAlertWarn("");
    setAlertError("");
    setAlertSuccess("");
    setFieldErrors({});
  };

  const inputClass = (field) => {
    if (done)               return "login-input login-input--success";
    if (loading)            return "login-input login-input--disabled";
    if (fieldErrors[field]) return "login-input login-input--error";
    return "login-input login-input--default";
  };

  const btnClass = () => {
    if (done)    return "login-submit-btn login-submit-btn--success";
    if (loading) return "login-submit-btn login-submit-btn--loading";
    if (!username || !password) return "login-submit-btn login-submit-btn--disabled";
    return "login-submit-btn login-submit-btn--active";
  };
 
  const validate = () => {
    const errors = {};
    if (!username.trim()) errors.username = "Username is required";
    if (!password.trim()) errors.password = "Password is required";
    return errors;
  };

  
  const handleLogin = async () => {
    if (loading || done) return;
    clearAlerts();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setAlertWarn("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method:      "POST",
        headers:     { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.accessToken) {
        setAlertError(data.message || "Invalid username or password. Please try again.");
        setFieldErrors({ username: " ", password: " " });
        return;
      }

    
      localStorage.setItem("accessToken",  data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify({
        id:        data.id,
        username:  data.username,
        email:     data.email,
        firstName: data.firstName,
        lastName:  data.lastName,
        image:     data.image,
      }));

      setLoggedInUser(data);
      setAlertSuccess(`Welcome back, ${data.firstName} ${data.lastName}! Redirecting…`);
      setDone(true);

      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      setAlertError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const initials = loggedInUser
    ? (loggedInUser.firstName[0] + loggedInUser.lastName[0]).toUpperCase()
    : "";

 
  return (
    <div className="login-page">
      <div className="login-card">

      
        <div className="login-brand">
          <div className="login-brand__logo"> LOGIN </div>
           
        </div>

       
        <Alert type="warning" message={alertWarn}    />
        <Alert type="danger"  message={alertError}   />
        <Alert type="success" message={alertSuccess} />

        
        {loggedInUser && (
          <div className="login-user-card">
            <div className="login-user-card__avatar">{initials}</div>
            <div>
              <div className="login-user-card__name">
                {loggedInUser.firstName} {loggedInUser.lastName}
              </div>
              <div className="login-user-card__email">{loggedInUser.email}</div>
            </div>
          </div>
        )}

     
        <Field
          label="Username"
          error={fieldErrors.username !== " " ? fieldErrors.username : ""}
        >
          <input
            className={inputClass("username")}
            type="text"
            placeholder="e.g. emilys"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="username"
            disabled={loading || done}
          />
        </Field>
 
        <Field
          label="Password"
          error={fieldErrors.password !== " " ? fieldErrors.password : ""}
        >
          <div className="login-pw-wrap">
            <input
              className={`${inputClass("password")} login-input--password`}
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
              disabled={loading || done}
            />
            <button
              className="login-eye-btn"
              onClick={() => setShowPw((v) => !v)}
              tabIndex={-1}
              type="button"
              aria-label="Toggle password visibility"
            >
              {showPw ? "🙈" : "👁"}
            </button>
          </div>
        </Field>

 
        <button
          className={btnClass()}
          onClick={handleLogin}
          disabled={loading || done}
          type="button"
        >
          {loading ? (
            <><span className="login-spinner" />Logging in…</>
          ) : done ? (
            <>✓ Logged in</>
          ) : (
            "Login"
          )}
        </button>

        
        <div className="login-divider">test credentials</div>
        <div className="login-hint">
          <span className="login-hint__label">user</span>
          <span className="login-hint__value">emilys</span>
          <span className="login-hint__label" style={{ marginLeft: 6 }}>pass</span>
          <span className="login-hint__value">emilyspass</span>
        </div>

    
        <div className="login-footer">
          Don't have an account?{" "}
          <a href="#" className="login-footer__link">Sign up</a>
        </div>

      </div>
    </div>
  );
};

export default Login;
