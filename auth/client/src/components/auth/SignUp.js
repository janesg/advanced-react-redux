import React from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class SignUp extends React.Component {
    
    onSubmit = formProps => {
        // Pass callback that will redirect user to the feature page
        this.props.signup(formProps, () => {
            this.props.history.push('/feature');
        });    
    };
    
    render() {
        const { handleSubmit } = this.props;
        
        // Note: Field.name becomes the redux state properties for form
        return (
            <div>
                <form onSubmit={ handleSubmit(this.onSubmit) }>
                    <fieldset>
                        <label>Email</label>
                        <Field 
                            name="email"
                            type="text" 
                            component="input"
                            autoComplete="none" />
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <Field 
                            name="password" 
                            type="password" 
                            component="input"
                            autoComplete="none" />
                    </fieldset>
                    <div>
                        { this.props.errorMsg }
                    </div>
                    <button>Sign Up</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorMsg : state.auth.errorMsg
    };
}

const mapDispatchToProps = actions;

// compose allows us to use multiple higher-order components (HOC),
// in order given, without ugly nested syntax
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({
        form: 'signup'    
    })
)(withRouter(SignUp));