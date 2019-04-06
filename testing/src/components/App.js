import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from 'actions';
import CommentBox from 'components/CommentBox';
import CommentList from 'components/CommentList';

class App extends React.Component {
    
    onAuthButtonClicked = () => {
        this.props.changeAuth(!this.props.isAuthenticated);
    }
    
    renderAuthButton() {
        return (
            <button onClick={ this.onAuthButtonClicked }>
                { this.props.isAuthenticated ? 'Sign Out' : 'Sign In' }
            </button>
        );
    }
    
    renderHeader() {
        return (
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/post">Post</Link></li>
                    <li>{ this.renderAuthButton() }</li>
                </ul>
            </div>
        );
    }
    
    render() {   
        return (
            <div>
                { this.renderHeader() }
                <Route path="/post" component={ CommentBox } />
                <Route path="/" exact component={ CommentList } />
            </div>
        );
    }
}

const mapStateToProps = ({ isAuthenticated }) => {
    return (
        { isAuthenticated }
    );    
};

const mapDispatchToProps = actions;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);