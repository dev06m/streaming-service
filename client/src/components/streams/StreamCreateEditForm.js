import React from 'react';
import { Field }  from 'redux-form';

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
    const {input, label, type, meta} = formProps;
    const className = meta.invalid && meta.touched ? 'field error' : 'field';
    return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} type={type} autoComplete="off"
            />
            {renderError(meta)}
        </div>
    )
}


const StreamCreateEditForm = (props) => {
    console.log(props.history);
    return (
        <div>
            <form onSubmit={props.handleSubmit(props.onSubmit)} className="ui form" 
                >
                <Field name="title" type="text" component={renderInput} label="Enter input" />
                <Field name="description" type="text" component={renderInput} label="Enter description" />
                <button className="ui button" type="submit" style={{display: 'inline'}}>Submit</button>   {/* default type is submit if you dont specify it.  */}
            </form>
                <button className="ui button" type="button" onClick={() => props.history.goBack()}>Back</button>
                {/* <button className="ui button" type="reset">Reset</button> */}
        </div>
    )
}

export default StreamCreateEditForm;