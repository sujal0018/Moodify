import React,{useState} from "react";
import "../style/register.scss";
import Formgroup from "../components/Formgroup";
import {Link} from "react-router";

const Register = () => {
	return (
		<main className="register-page">
			<div className="form-container">
				<h1>Register</h1>
				<form>
					<Formgroup label="Name" placeholder="Enter your name" />
					<Formgroup label="Email" placeholder="Enter your email" />
					<Formgroup
						label="Password"
						placeholder="Enter your password"
					/>
					<button className="button" type="submit">
						Register
					</button>
                </form>
                <p>
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</div>
		</main>
	);
};

export default Register;
