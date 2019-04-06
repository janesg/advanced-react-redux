// By convention, the file for a HOC (higher-order component) has a lower-case
// first letter... i.e. different from normal component

// We are exporting a function that takes a parameter of ChildComponent
// and returns the composed component (i.e. child wrapped with the HOC)

// This is the standard HOC scaffolding boilerplate

// import React from 'react';

// export default ChildComponent => {
//     class ComposedComponent extends React.Component {
//         render() {
               // Ensure all props are propagated through to the child component
//             return <ChildComponent { ...this.props } />;
//         }
//     }
    
//     return ComposedComponent;
// }

import React from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
    class ComposedComponent extends React.Component {
        
        // Called when componet is first rendered
        componentDidMount() {
            this.checkAuthenticated();
        }
        
        // Called when a new set of props received
        componentDidUpdate() {
            this.checkAuthenticated();
        }
    
        checkAuthenticated() {
            // If not authenticated, navigate away to root page
            if (!this.props.isAuthenticated) {
                this.props.history.push('/');
            }
        }
        
        render() {
            return <ChildComponent { ...this.props } />;
        }
    }
    
    const mapStateToProps = ({ isAuthenticated }) => {
        return {
            isAuthenticated
        };
    };

    return connect(mapStateToProps)(ComposedComponent);
}

