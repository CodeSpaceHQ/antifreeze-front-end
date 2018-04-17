import React from 'react';
import ButtonAppBar from '../Material/ButtonAppBar.jsx'
import NestedLists from '../Material/SimpleTabs.jsx'
import { withRouter } from 'react-router'

function Home() {
return (<div>
        <ButtonAppBar logout={true}/>
        <NestedLists/>
        </div>
        );
}
export default Home;