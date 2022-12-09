import React, {Fragment} from "react";
import './Layout.css';
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn:false
        };
    }

    handleLogin() {
        const token = localStorage.getItem('_uTk');
        if(token!==null){
            this.setState({
                isLoggedIn:true
            })
        }
    }

    render(){
        return (
            <Fragment>
                <Header isLoggedIn={this.state.isLoggedIn} />
                    <main>{this.props.children}</main>
                <Footer />
            </Fragment>
        )
    }
}