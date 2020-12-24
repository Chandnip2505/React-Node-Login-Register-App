import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Button } from '@material-ui/core';

class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],

        }
    }

    componentDidMount() {
        this.getAllData()
    }

    deleteUser = (id) => {
        axios.delete(`http://localhost:4000/users/delete/` + id)
            .then(res => {
                alert("USER DELETED")
            })
        this.getAllData()
        window.location.reload()
    }

    getAllData = () => {
        axios.get(`http://localhost:4000/users/getAll`, {
            headers: {
			  'Access-Control-Allow-Origin': '*',
			  'Authorzation': `Bearer `+this.props.location.state.token
            },
            })
            .then(res => {
                if (res.status === 200) {
                    this.setState({ data: res.data })
                }
            })
    }

    logout = () => {
        this.props.history.push("/");
    };

    render() {
        const { data } = this.state;
        return (
            <div className="table">
                <h1>
                    USERS DATA
                </h1>
                <Button variant="contained" color="primary" onClick={this.logout}> LOG OUT!</Button>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Mobile</TableCell>
                                <TableCell align="right">Password</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.mobile}</TableCell>
                                    <TableCell align="right">{row.password}</TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => this.deleteUser(row.id)}> Delete User</Button>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default UsersTable;