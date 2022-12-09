import React from "react";
import {setError, validateEmail, validatePassword} from "../assets/utils/validation";
import { Navigate } from "react-router-dom"

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name:'',
                email:'',
                password:'',
                confirmPassword:'',
                username:'',
                phone:'',
            },
            errors:[],
            redirect:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange = ({ target }) => {
        const formData = { ...this.state.formData}
        formData[target.name]=target.value
        this.setState({
            formData:formData
        })
        this.setState({
            errors:[]
        })
    };

    submitForm = (e) => {
        e.preventDefault();
        const formData = { ...this.state.formData}
        const errors = [...this.state.errors]

        if(!this.validateForm(formData,errors)){
            console.log('formData',formData)
            fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(formData)
            }).then((response) => response.json())
            .then((data) => {
                if(data.hasOwnProperty('errors')){
                    alert(data.errors[0].message)
                }else{
                    console.log(data)
                    this.setState({
                        redirect:true
                    })
                }
            })
            .catch((err) => {
                alert(err.message)
            });
        }else{
            console.log('errors',this.state.errors)
        }
    };

    validateForm = (formData,errors) =>{
        let hasError = false
        let newErrors = []
        if(formData.name===''){
            hasError = true
            newErrors = setError(errors,{name:"name",message:`Name is required`})
            errors = [...newErrors]
        }
        if(formData.email===''){
            hasError = true
            newErrors = setError(errors,{name:"email",message:`Email is required`})
            errors = [...newErrors]
        }
        if(formData.username===''){
            hasError = true
            newErrors = setError(errors,{name:"username",message:`Username is required`})
            errors = [...newErrors]
        }
        if(formData.password===''){
            hasError = true
            newErrors = setError(errors,{name:"password",message:`Password is required`})
            errors = [...newErrors]
        }
        if(formData.email!=='' && !validateEmail(formData.email)){
            hasError = true
            newErrors = setError(errors,{name:"email",message:'Please enter a valid email address'})
            errors = [...newErrors]
        }
        if(formData.password!=='' && !validatePassword(formData.password)){
            hasError = true
            newErrors = setError(errors,{name:"password",message:'Password must be min 6 letter password, with at least a symbol, upper and lower case letters and a number'})
            errors = [...newErrors]
        }
        if(formData.password!==formData.confirmPassword){
            hasError = true
            newErrors = setError(errors,{name:"confirmPassword",message:'Confirm password must match password'})
            errors = [...newErrors]
        }
        this.setState({
            errors:errors
        })
        return hasError
    }

    render() {
        let errors = [...this.state.errors]
        return(
            <div className="container">
                {
                    this.state.redirect && <Navigate to='/login' replace={true}/>
                }
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div className="register">
                            <form className="form-horizontal" method="post">
                                <fieldset>
                                    <div id="legend">
                                        <h1 className="">Register</h1>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="name">Name</label>
                                        <div className="controls">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Name"
                                                className="form-control"
                                                value={this.state.formData.name}
                                                onChange={this.handleChange}
                                            />
                                            {errors.find(el=>el.name==='name') &&
                                            <p className="error-block">
                                                {errors.find(el=>el.name==='name').message}
                                            </p>
                                            }
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label" htmlFor="username">Username</label>
                                        <div className="controls">
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                placeholder="Username"
                                                className="form-control"
                                                value={this.state.formData.username}
                                                onChange={this.handleChange}
                                            />
                                            {errors.find(el=>el.name==='username') &&
                                            <p className="error-block">
                                                {errors.find(el=>el.name==='username').message}
                                            </p>
                                            }
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <label className="control-label" htmlFor="email">E-mail</label>
                                        <div className="controls">
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                placeholder="E-mail"
                                                className="form-control"
                                                value={this.state.formData.email}
                                                onChange={this.handleChange}
                                            />
                                            {errors.find(el=>el.name==='email') &&
                                            <p className="error-block">
                                                {errors.find(el=>el.name==='email').message}
                                            </p>
                                            }
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <label className="control-label" htmlFor="phone">Phone</label>
                                        <div className="controls">
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                placeholder="Phone"
                                                className="form-control"
                                                value={this.state.formData.phone}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <label className="control-label" htmlFor="password">Password</label>
                                        <div className="controls">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder=""
                                                className="form-control"
                                                value={this.state.formData.password}
                                                onChange={this.handleChange}
                                            />
                                            {errors.find(el=>el.name==='password') &&
                                            <p className="error-block">
                                                {errors.find(el=>el.name==='password').message}
                                            </p>
                                            }
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <label className="control-label" htmlFor="confirmPassword">Password
                                            (Confirm)</label>
                                        <div className="controls">
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                placeholder=""
                                                className="form-control"
                                                value={this.state.formData.confirmPassword}
                                                onChange={this.handleChange}
                                            />
                                            {errors.find(el=>el.name==='confirmPassword') &&
                                            <p className="error-block">
                                                {errors.find(el=>el.name==='confirmPassword').message}
                                            </p>
                                            }
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <div className="controls">
                                            <button className="btn btn-success" onClick={this.submitForm}>Register</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}