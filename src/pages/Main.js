import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Detailed from './Detailed';
import Index from './Index'
import ArticleList from './ArticleList';

function Main(){
    return (
        <Router>
            <Route path="/" exact component={Index} />
            <Route path="/blog/:id" basename="blog" component={Detailed} />
            <Route path="/list/:id" basename="list" component={ArticleList} />
        </Router>
    )
}
export default Main