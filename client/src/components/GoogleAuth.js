import React, { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../redux/actions';

// class GoogleAuth extends React.Component {

//     // state = {isSignedIn: null};

//     componentDidMount() {
        
//         window.gapi.load('client:auth2', () => {
//             window.gapi.client.init({
//                 clientId: '1018683604898-e3909j88llkc3ml68llvvtfk6ul7u4o6.apps.googleusercontent.com',
//                 scope: 'email'
//             }).then(() => {
//                 this.auth = window.gapi.auth2.getAuthInstance();
//                 // this.setState({isSignedIn: this.auth.isSignedIn.get()})
//                 this.onAuthChange(this.auth.isSignedIn.get());
//                 // this.auth.isSignedIn.listen(this.onAuthChange)
//                 // this.auth.isSignedIn.listen(() => this.setState({ isSignedIn: this.auth.isSignedIn.get() }))
//                 // this.auth.isSignedIn.listen(isSignedIn => this.setState({isSignedIn}))
//                 this.auth.isSignedIn.listen(this.onAuthChange)
//             })
//         })
//     }

//     onAuthChange = (isSignedIn) => {
//         // this.setState({isSignedIn: this.auth.isSignedIn.get()})
//         if (isSignedIn) {
//             this.props.signIn(this.auth.currentUsnodeer.get().getId());
//         } else {
//             this.props.signOut();
//         }
//     }

//     renderAutoButton() {
//         if (this.props.isSignedIn === null) {
//         // if (this.state.isSignedIn === null) {
//             return null;
//         } else if (this.props.isSignedIn) {
//         // } else if (this.state.isSignedIn) {y
//             return (
//                 // <button className="ui red google button" onClick={() => this.setState({ isSignedIn: })}>
//                 <button className="ui red google button" onClick={() => this.auth.signOut()}>
//                     <i className="google icon"></i>
//                     Sign Out
//                 </button>
//             )
//         } else {
//             return (
//                 <button className="ui green google button" onClick={() => this.auth.signIn()}>
//                     <i className="google icon"></i>
//                     Sign In with Google
//                 </button>
//             )
//         }
//     }

//     render() {
        
//         return (
//             <div>
//                 {this.renderAutoButton()}
//             </div>
//         )
//     }

// }

const GoogleAuthFunc = (props) => {
    
    // const [auth, setAuth] = useState(null); // burada useREf kullanilabilir
    let auth = useRef('');
    const { signIn, signOut } = props;

    
    const onAuthChange = useCallback(
        isSignedIn => {
            if (isSignedIn) {
                signIn(auth.current.currentUser.get().getId());
            } else {
                signOut();
            }
        },[signIn, signOut]
    );


    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1018683604898-e3909j88llkc3ml68llvvtfk6ul7u4o6.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                auth.current = window.gapi.auth2.getAuthInstance();
                
                onAuthChange(auth.current.isSignedIn.get()); 
                auth.current.isSignedIn.listen(onAuthChange);
            })
        });
    }, [onAuthChange])

    const onSignInClink = () => {
        auth.current.signIn();
    }

    const onSignOutClick = () => {
        auth.current.signOut();  
        // auth.isSignedIn.listen(isSignedIn => onAuthChange(isSignedIn));
    }

    if (props.isSignedIn === null) {
        return null;
    } else if (props.isSignedIn) {
        return (
            // <button className="ui red google button" onClick={() => this.setState({ isSignedIn: })}>
            <button className="ui red google button" onClick={onSignOutClick}>
                <i className="google icon"></i>
                Sign Out
            </button>
        )
    } else {
        return (
            <button className="ui green google button" onClick={onSignInClink}>
                <i className="google icon"></i>
                Sign In with Google
            </button>
        )
    }

}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut }) (GoogleAuthFunc);