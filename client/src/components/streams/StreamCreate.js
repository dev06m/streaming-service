import React from 'react';
import { reduxForm }  from 'redux-form';
import {connect} from 'react-redux';
import { createStream } from '../../redux/actions';

import StreamCreateEditForm from './StreamCreateEditForm';
// import { Redirect } from 'react-router-dom';
// import { browserHistory } from 'react-router';


// const required = value => value ? 'undefined' : 'Required';
// const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
//     'Invalid email address' : undefined

    // -Why do we define validate function outside of the class?
    /* The validate function wouldn't work otherwise since it would then 
    be considered a class method on the component. Redux Form expects a 
    validation helper function to be passed into it:
    The first is to provide redux-form with a validation function that
    takes an object of form values and returns an object of errors. 
    This is done by providing the validation function to the decorator 
    as a config parameter, or to the decorated form component as a prop.
    https://redux-form.com/8.2.2/examples/syncvalidation/
    */
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
//             {/* {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))} */}
//             {/* {touched && error && <div >{error}</div>} */}
//             {/* <div>{meta.touched ? meta.error : null}</div> */}
//             {renderError(meta)}
//             {/* {meta.touched && meta.error && <div className="ui error message" style={{display: 'block'}}><span className="header">{meta.error}</span> </div>} */}
//             {/* {meta.touched && meta.error && <div className="ui error message" style={{display: 'block'}}>{meta.error} </div>} */}
//         </div>
//     )
// }

const StreamCreate = (props) => {
    
    const { handleSubmit } = props;

    const onSubmit = (formValues) => {
        // Our action creator returns a promise
        props.createStream(formValues).then(res => {
            console.log(res)
            if (res.status === 201){
                props.history.push('/');
            }
        }).catch((error) => {console.log(error)});
    }
    
    return (
        <StreamCreateEditForm onSubmit={onSubmit} handleSubmit={handleSubmit} history={props.history}/>
        // <form onSubmit={handleSubmit(onSubmit)} className="ui form">
        //     <Field name="title" type="text" component={renderInput} label="Enter input" />
        //     <Field name="description" type="text" component={renderInput} label="Enter description"/>
        //     <button className="ui button" type="submit" >Submit</button>   {/* default type is submit if you dont specify it.  */}
        //     <button className="ui button" type="button" onClick={() => props.history.push('/')}>Back to List</button>
        // </form>
    )
}

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate
}) (StreamCreate); 

export default connect(null, { createStream }) (formWrapped); 