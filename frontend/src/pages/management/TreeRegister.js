import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminNav from '../../components/AdminNav';

import '../../styles/global.css';
import FormTree from '../../components/FormTree';

function TreeRegister(props){

    useEffect(() => {
        window.scrollTo(0, 0)
        const params = new URLSearchParams(props.location.search); 
        setAddress(params.get('address'));
        setCoords([params.get('lat'), params.get('lng')]);
    }, [props.location.search]);

    const [address, setAddress] = useState('');
    const [coords, setCoords] = useState([]);

    return(
        <div>
            <Route path="/" component={AdminNav} />
            
            <div className="page-container" id="client-solicitation">        
                <FormTree address={address} lat={coords[0]} lng={coords[1]}/>
            </div>
        </div>
    )
}

export default TreeRegister;