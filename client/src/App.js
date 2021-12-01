import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
                {/* switch kullanmayinca streams/new ve streams/:id ayni url ile eslesiyo yani streams den sonra new gelince :id gibi algiliyo */}
                <Switch> 
                    <Route path="/" exact component={StreamList} />
                    <Route path="/streams/new" exact component={StreamCreate} />
                    <Route path="/streams/edit/:streamId" exact component={StreamEdit} />                
                    <Route path="/streams/delete/:id" exact component={StreamDelete} />                
                    <Route path="/streams/:id" exact component={StreamShow} />  
                    {/* <Route path="/streams/:id(\d+)" exact component={StreamShow} /> switch kullanmadan boyle yapilabilir */}
                </Switch>
            </BrowserRouter>
        </div>
        
    )
}

export default App;