import React from 'react';
import { connect } from 'react-redux';

import requireAuth from 'components/requireAuth';
import { saveComment, fetchComments } from 'actions';

class CommentBox extends React.Component {
    
    state = { comment: '' };
    
    onCommentChange = event => {
        this.setState({ comment: event.target.value });
    }
    
    // Form submit event generated whenever a button
    // element defined within the form is clicked...
    // ...so don't need a button onClick handler
    onFormSubmit = event => {
        event.preventDefault();
        
        // Call the action creator to save the comment
        this.props.saveComment(this.state.comment);
        
        // Clear the text area after comment submitted
        this.setState({ comment: '' });
    }
    
    onClickFetchComments = () => {
        this.props.fetchComments();
    }
    
    render() {
        // Prevent fetch comments button from submitting the form
        // by moving it outside of the form
        return (
            <div>
                <form onSubmit={ this.onFormSubmit }>
                    <h4>Add a comment</h4>
                    <textarea 
                        onChange={ this.onCommentChange } 
                        value={ this.state.comment } />
                    <div>
                        <button>Submit Comment</button>
                    </div>
                </form>
                <div>
                    <button className="fetch-comments" onClick={ this.onClickFetchComments }>
                        Fetch Comments
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    saveComment,
    fetchComments
};

export default connect(
    null,
    mapDispatchToProps
)(requireAuth(CommentBox));