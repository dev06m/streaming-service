import React from 'react';
import Modal from '../../Modal'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { deleteStream } from '../../redux/actions';

const StreamDelete = (props) => {
    let history = useHistory();
    
    const actions = () => {
        return (
            // <div className="actions">
            //     <div className="ui button negative" onClick={() => history.push('/streams/new')}>Delete</div>
            //     {/* <div className="ui button">Neutral</div> */}
            //     <div className="ui cancel button" onClick={() => history.push('/')}>Cancel</div>
            // </div>
            // <React.Fragment className="actions">
            //     <div className="ui button negative" onClick={() => history.push('/streams/new')}>Delete</div>
            //     {/* <div className="ui button">Neutral</div> */}
            //     <div className="ui cancel button" onClick={() => history.push('/')}>Cancel</div>
            // </React.Fragment>
            <>
                <div className="ui button negative" onClick={() => props.deleteStream(props.match.params.id).then( () => history.push('/'))}
                    >Delete</div>
                {/* <div className="ui button">Neutral</div> */}
                <div className="ui cancel button" onClick={() => history.push('/')}>Cancel</div>
            </>
        )
    }
    
    return (
        <div>
            <Modal 
                title="Delete Stream" 
                content="Are you sure want to delete this stream?" 
                actions={actions}
                onDismiss={() => props.history.push('/')}/>
        </div>
    )
}


export default connect(null , {deleteStream}) (StreamDelete);
// export default StreamDelete;