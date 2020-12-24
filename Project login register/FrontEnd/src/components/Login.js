import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import UsersTable from './UsersTable';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: ''
        };
        
	}

	update=(e)=>{
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
          name: this.state.name,
          password :this.state.password
        };
        axios.post(`http://localhost:4000/users/authenticate`,  user , {
            headers: {
			  'Access-Control-Allow-Origin': '*'
	        },
            })
          .then(res => {
            if(res.status === 200){
				this.props.history.push({pathname:"/table",
			 state: { token: res.data.token }})
                
			}
		  })
		  .catch(err => {
			  alert("user or password invalid");
		  })
      }

	render() {
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit}>
					<h2>Login</h2>
					<div className="username">
						<input
							type="text"
							placeholder="Username"
							value={this.state.name}
							onChange={this.update}
							name="name"
						/>
					</div>

					<div className="password">
						<input
							type="password"
							placeholder="Password..."
							value={this.state.password}
							onChange={this.update}
							name="password"
						/>
					</div>

					<input type="submit" value="Login" />
				</form>

				<Link to="/register">Register</Link>
			</div>
		);
	}
}

export default withRouter(Login);
