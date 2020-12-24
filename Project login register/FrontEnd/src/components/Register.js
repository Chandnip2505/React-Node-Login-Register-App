import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname: '',
            email: '',
            password: '',
            mobile: '',
            confirmPassword: '',
        };

    }

    update = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { password, confirmPassword } = this.state;
        const user = {
            name: this.state.fullname,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password
        };
    

        if (password !== confirmPassword) {
            alert("Passwords doesn't match");
        } else {
            axios.post(`http://localhost:4000/users/create/`, user , {headers: {
                "Access-Control-Allow-Origin": "*",
            }}
            )
                .then(res => {
                    if (res.status == 200) {
                        this.props.history.push("/");
                    }
                })
        }
    }

    render() {
        return (
            <div className="register">
                <form onSubmit={this.handleSubmit}>
                    <h2>Register</h2>

                    <div className="name">
                        <input
                            type="text"
                            placeholder="Full Name"
                            name="fullname"
                            value={this.state.fullname}
                            onChange={this.update}
                            required
                        />
                    </div>

                    <div className="email">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={this.state.email}
                            onChange={this.update}
                            required
                        />
                    </div>

                    <div className="pasword">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.update}
                            required
                        />
                    </div>

                    <div className="password">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.update}
                            required
                        />
                    </div>

                    <div className="mobile">
                        <input
                            type="text"
                            placeholder="Mobile"
                            name="mobile"
                            value={this.state.mobile}
                            onChange={this.update}
                            required
                        />
                    </div>
                    <input type="submit" value="Register" />
                </form>

                <Link to="/">Login Here</Link>
            </div>
        );
    }
}

export default Register;
