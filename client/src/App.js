import { BrowserRouter, Route } from 'react-router-dom';
import StreamList from './components/streams/StreamList';
import StreamCreate from './components/streams/StreamCreate';
import StreamShow from './components/streams/StreamShow';
import StreamEdit from './components/streams/StreamEdit';
import StreamDelete from './components/streams/StreamDelete';
import Header from './components/Header';

const App = () => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <Header />
                <Route path="/" exact component={StreamList} />
                <Route path="/stream/new" exact component={StreamCreate} />
                <Route path="/stream/edit" exact component={StreamEdit} />                
                <Route path="/stream/delete" exact component={StreamDelete} />                
                <Route path="/stream/show" exact component={StreamShow} />                                
            </BrowserRouter>
        </div>
        
    )
}

export default App;