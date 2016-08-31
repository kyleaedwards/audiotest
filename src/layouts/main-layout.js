import React from 'react'
import { Link } from 'react-router'

export default class MainLayout extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="app">
                <header id="header">
                    <h1>Audio Demo</h1>
                </header>
                <main id="container">
                    {this.props.children}
                </main>
            </div>
        );
    }

}
