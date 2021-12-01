/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../redux/actions';
import flvjs from 'flv.js'
// import stream from '../../redux/apis/stream';


class StreamShow extends React.Component {

    constructor(props) {
        super(props);
        
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchStreams();
        this.buildPlayer();
    }
    
    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();  
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }
        const videoId  = this.props.match.params.id;
        
        this.player = flvjs.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${videoId}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        const {title, description} = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

// export default StramShow;
/*

            CLASS C. < > FUNCTIONAL C.

*/

const StreamShows = props => {
    
    let player;
    const videoRef = React.createRef();

    useEffect( () => {
        props.fetchStreams();
        return () => {
            player.destroy();
        }
    }, [])

    useEffect(() => {
        buildPlayer();

    }, [])


    const buildPlayer = () => {
        if (player || !props.stream) {
            return;
        }

        const videoId  = props.match.params.id;
        
        player = flvjs.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${videoId}.flv`
        })
        player.attachMediaElement(videoRef.current);
        player.load();
        
    }

    if (!props.stream) {
        return <div>Loading...</div>
    }
    const {title, description} = props.stream;
    return (
        <div>
            <video ref={videoRef} style={{ width: '100%' }} controls />
            <h1>{title}</h1>
            <h5>{description}</h5>
        </div>
        )
}


const mapStateToProps = (state, ownProps) => {
    // console.log(state)
    return {stream: state.streams[ownProps.match.params.id]}
}


export default connect(mapStateToProps, {fetchStreams}) (StreamShows)




//// WITH Hooks
// const StreamShow = ({ match }) => {
//     const dispatch = useDispatch();
//     const videoRef = useRef();
   
//     const stream = useSelector((state) => state.streams[match.params.id]);
   
//     //TODO fetching the stream on componentDidMount
//     useEffect(() => {
//       dispatch(fetchStream(match.params.id));
//     }, [dispatch, match.params.id]);
   
//     //TODO setting up flv player
//     useEffect(() => {
//       const buildPlayer = () => {
//         if ( !stream) {
//           return;
//         }
//         const player = flv.createPlayer({
//           type: "flv",
//           url: `http://localhost:8000/live/${match.params.id}.flv`,
//         });
   
//         player.attachMediaElement(videoRef.current);
//         player.load();
//       };
//       buildPlayer();
//     }, [stream, match.params.id]);
   
//     if (!stream) {
//       return <div>Loading...</div>;
//     }
//     return (
//       <div>
//         <video ref={videoRef} style={‌{ width: "100%" }} controls={true} />
//         <h1>{stream.title}</h1>
//         <h5>{stream.description}</h5>
//       </div>
//     );
//   };
   
//   export default StreamShow;