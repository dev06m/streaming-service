import React, { useEffect, useState } from 'react';
import { Field, reduxForm }  from 'redux-form';
import {connect} from 'react-redux';
import { fetchStream, editStream } from '../../redux/actions';
import { useLocation } from 'react-router-dom';

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

const renderInput = (formProps) => {
    
    const renderError = ({error, touched}) => {
        if (error && touched) {
            return (
                <div className="ui error message" style={{display: 'block'}}>
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    const {input, label, type, value, meta} = formProps;
    const className = meta.invalid && meta.touched ? 'field error' : 'field';
    return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} type={type} autoComplete="off" value={value}
            />
            {renderError(meta)}
        </div>
    )
}


const StreamEdit = (props) => {
    
    useEffect(() => {
        props.fetchStream(props.match.params.streamId);
    }, [])
    
    
    const { handleSubmit } = props;

    const onSubmit = (formValues) => {
        // Our action creator returns a promise
        console.log(props.fetchedStream)
        const oldStream = props.fetchedStream;
        const newStream = {...oldStream, ...formValues}
        console.log(oldStream, formValues, newStream )
        props.editStream(props.match.params.streamId, newStream ).then(res => {
            console.log(res)
            if (res.status === 200){
                props.history.push('/');
            }
        }).catch((error) => {console.log(error)});
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="ui form" initialValues={{title: 'sdsd', description: 'he'}}>
                <Field name="title" type="text" component={renderInput} label="Enter input" />
                <Field name="description" type="text" component={renderInput} label="Enter description" value={props.fetchedStream?.description} />
                <button className="ui button" type="submit" style={{display: 'inline'}}>Submit</button>   {/* default type is submit if you dont specify it.  */}
            </form>
                <button className="ui button" type="button" onClick={() => props.history.push('/')}>Back</button>
                <button className="ui button" type="reset">Reset</button>
        </div>
    )
}

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate,
}) (StreamEdit); 

const mapStateToProps = (state => {
    
    return {fetchedStream: Object.values(state.streams)[0]}
})

export default connect(mapStateToProps, { editStream, fetchStream }) (formWrapped); 