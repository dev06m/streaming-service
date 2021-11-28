import { BrowserRouter, Route } from 'react-router-dom';
import StreamList from './components/streams/StreamList';
import StreamCreate from './components/streams/StreamCreate';
import StreamShow from './components/streams/StreamShow';
import StreamEdit from './components/streams/StreamEdit';
import StreamDelete from './components/streams/StreamDelete';
import Header from './components/Header';
import history from './history'

const App = () => {
    return (
        <div className="ui container">
            {/* any time that we pass in props called history 
            the router is going to use it instead of its default implementation */}
            <BrowserRouter history={history}>
                <Header />
                <Route path="/" exact component={StreamList} />
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/edit/:streamId" exact component={StreamEdit} />                
                <Route path="/streams/delete/:id" exact component={StreamDelete} />                
                <Route path="/streams/show" exact component={StreamShow} />                                
            </BrowserRouter>
        </div>
        
    )
}

export default App;