import React from "react";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pageContent: {}};
    }

    componentDidMount() {
        this.getPageData();
    }

    getPageData() {
        fetch(`${process.env.REACT_APP_API_URL}/about`).then((response) => response.json())
            .then((data) => {
                this.setState({
                    pageContent:data
                })
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    render() {
        const content = this.state.pageContent
        return(
            <div className="container">
                <h1>{content.title}</h1>
                <p>{content.body}</p>
            </div>
        );
    }
}