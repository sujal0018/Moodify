import React,{useState} from "react";
import "../style/login.scss";
import FormGroup from "../components/Formgroup";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
	const { loading, handleLogin } = useAuth();
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");

    const navigate = useNavigate();

	async function handleSubmit(e) {
        e.preventDefault();
        await handleLogin(email, password);
        navigate("/");
	}

	return (
		<main className="login-page">
			<div className="form-container">
				<h1>Login</h1>
				<form onSubmit={handleSubmit}>
					<FormGroup
						value={email}
						onChange={(e) => {
							setemail(e.target.value);
						}}
						label="Email"
						placeholder="Enter your email"
					/>
					<FormGroup
						value={password}
						onChange={(e) => {
							setpassword(e.target.value);
						}}

						label="Password"
						placeholder="Enter your password"
					/>
					<button className="button" type="submit">
						Login
					</button>
				</form>
				<p>
					Don't have an account? <Link to="/register">Register</Link>
				</p>
			</div>
		</main>
	);
};

export default Login;
