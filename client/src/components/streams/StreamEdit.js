import React, { useEffect, useState } from 'react';
import { Field, reduxForm }  from 'redux-form';
import {connect} from 'react-redux';
import { editStream, fetchInitialValues, fetchStreams } from '../../redux/actions';
import StreamCreateEditForm from './StreamCreateEditForm';

const validate = (formValues) => {
    const errors = {};
    
    if (!formValues.title ) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
}

// const renderInput = (formProps) => {
    
//     const renderError = ({error, touched}) => {
//         if (error && touched) {
//             return (
//                 <div className="ui error message" style={{display: 'block'}}>
//                     <div className="header">{error}</div>
//                 </div>
//             )
//         }
//     }
//     const {input, label, type, meta} = formProps;
//     const className = meta.invalid && meta.touched ? 'field error' : 'field';
//     return (
//         <div className={className}>
//             <label>{label}</label>
//             <input {...input} type={type} autoComplete="off"
//             />
//             {renderError(meta)}
//         </div>
//     )
// }


const StreamEdit = (props) => {
    
    const { handleSubmit } = props;

    useEffect(() => {
        props.fetchStreams()
        props.fetchInitialValues(props.match.params.streamId);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const onSubmit = (formValues) => {
        // Our action creator returns a promise
        const oldStream = props.fetchedStream;
        const newStream = {...oldStream, ...formValues}
        
        props.editStream(props.match.params.streamId, newStream ).then(res => {
            
            if (res.status === 200){
                props.history.push('/');
            }
        }).catch((error) => {console.log(error)});
    }

    return (
        <StreamCreateEditForm onSubmit={onSubmit} handleSubmit={handleSubmit} history={props.history}/>
    //     <div>
    //         <form onSubmit={handleSubmit(onSubmit)} className="ui form" 
    //             // initialValues={{title: 'sdsd', description: 'he'}}
    //             >
    //             <Field name="title" type="text" component={renderInput} label="Enter input" />
    //             <Field name="description" type="text" component={renderInput} label="Enter description" value={props.fetchedStream?.description} />
    //             <button className="ui button" type="submit" style={{display: 'inline'}}>Submit</button>   {/* default type is submit if you dont specify it.  */}
    //         </form>
    //             <button className="ui button" type="button" onClick={() => props.history.push('/')}>Back</button>
    //             <button className="ui button" type="reset">Reset</button>
    //     </div>
    )
}

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate,
    
    // enableReinitialize: true
}) (StreamEdit); 

const mapStateToProps = ((state, ownProps) => {
    return {
            // fetchedStream: Object.values(state.streams)[0], 
            streams: state.streams,
            initialValues: state.streams[ownProps.match.params.streamId]
        }
})

export default connect(mapStateToProps, { fetchStreams, editStream, fetchInitialValues }) (formWrapped); 