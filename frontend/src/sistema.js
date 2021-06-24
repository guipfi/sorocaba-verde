import React, { Component} from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import ReactLoading from 'react-loading';
import axios from 'axios';

class Sistema extends Component{
    constructor () {
        super()
        this.state = {
          isLogged: false,
          isLoading: true
        };
    }
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_API_URL}/admin/isLogged`,{withCredentials: true, credentials: 'include'})
        .then((res) =>{
          if(res.data.code === 1){
            this.setState({
              isLogged: true,
              isLoading:false
            })
          } else{
            this.setState({
              isLogged: false,
              isLoading: false
            })
          }
        })
      }

    initialPage = () => {
        if(this.state.isLogged === true) return <Redirect to="/sistema/home" />
        return <Redirect to="/sistema/login"/>
    }

    render(){
        if(this.state.isLoading == false){
            return(this.initialPage())
        } else return(<ReactLoading className="loading" type={"spin"} color={"green"} height={'20%'} width={'20%'} />)
    }      
}

export default Sistema;