import React from 'react';
import { connect } from 'react-redux';

import { signout } from '../../actions';

class SignOut extends React.Component {
    
    componentDidMount() {
        this.props.signout();
    }
    
    render() {
        return (
            <div>
                Sorry to see you go
            </div>
        );
    }
}

const mapDispatchToProps = {
    signout
};

export default connect(
    null,
    mapDispatchToProps
)(SignOut);