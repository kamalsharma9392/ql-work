import React from "react";
import {Navigate} from "react-router-dom";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            redirect:false
        };
    }

    componentDidMount() {
        // const token = localStorage.getItem('_uTk');
        // if(token!==null){
        //     this.setState({
        //         redirect:true
        //     })
        // }
        this.getUserData();
    }

    getUserData() {
        const token = localStorage.getItem('_uTk');
        fetch(`${process.env.REACT_APP_API_URL}/user`, {
                method: 'get',
                headers: {'Content-Type':'application/json','authorization':`Bearer ${token}`},
            }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                this.setState({
                    user:data
                })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    render() {
        return(
            <div className="container">
                {
                    this.state.redirect && <Navigate to='/login' replace={true}/>
                }
                <div className="row">
                    <div className="col-md-12">
                        <div className="dashboard">
                            <h1>User Data</h1>
                            <div className="register">
                                <form className="form-horizontal" method="post">
                                    <fieldset>
                                        <div className="control-group display-group">
                                            <label className="control-label" htmlFor="name">Name</label>
                                            <span className="controls">
                                                {this.state.user.name}
                                            </span>
                                        </div>
                                        <div className="control-group display-group">
                                            <label className="control-label" htmlFor="name">Email</label>
                                            <span className="controls">
                                                {this.state.user.email}
                                            </span>
                                        </div>
                                        <div className="control-group display-group">
                                            <label className="control-label" htmlFor="name">Username</label>
                                            <span className="controls">
                                                {this.state.user.username}
                                            </span>
                                        </div>
                                        <div className="control-group display-group">
                                            <label className="control-label" htmlFor="name">Phone</label>
                                            <span className="controls">
                                                {this.state.user.phone}
                                            </span>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}