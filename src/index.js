import React from "react"
import { render } from "react-dom"
import MainLayout from "./layouts/main-layout"
import Sounds from "./components/sounds"
import Sound from "./components/sound"
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'

render((
    <Router history={hashHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Sounds}>
                <Route path="/sound/:soundId" component={Sound}/>
            </Route>
        </Route>
    </Router>
), document.getElementById("mount"))
