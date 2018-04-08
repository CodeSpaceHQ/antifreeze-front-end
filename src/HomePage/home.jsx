import React from 'react';
import ButtonAppBar from '../Material/ButtonAppBar.jsx'
import NestedLists from '../Material/SimpleTabs.jsx'
import FloatingActionButton from '../Material/FloatingActionButton.jsx';
import { withRouter } from 'react-router'

function Home() {

return (<div>
        <ButtonAppBar logout={true}/>
        <NestedLists/>
        <FloatingActionButton/>
        </div>
        );
}


export default Home;