import React, {Component} from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Main extends Component{

    static propTypes = {
        searchName: PropTypes.string.isRequired
    }

    state ={
        initView: true,
        loading: false,
        users: null,
        errorMsg: null
    }


    componentWillReceiveProps(newProps) {
        const {searchName} = newProps
        // update status
        this.setState(
            {
                initView: false,
                loading:true
            }
        )
        // send axios request
        const url=`https://api.github.com/search/users?q=${searchName}`
        axios.get(url)
            .then(response=>{
                /**
                 * 1. get the data
                 * 2. update success status
                 */
                const result = response.data
                // custom an object as a User, and put users in Users
                const users = result.items.map(item=>({
                    name:item.login,
                    url:item.html_url,
                    avatarUrl:item.avatar_url
                }))

                this.setState({
                    loading: false,
                    users:users
                })
            })
            .catch(error=>{
                /**
                 * update fail status
                 */
                this.setState({
                    loading: false,
                    errorMsg:error.message
                })
            })


    }


    render(){

        const {initView, loading, users, errorMsg} = this.state
        const {searchName} = this.props
        /**
         * 1. check if has searched something
         * 2. check if in loading status
         * 3. check if have any error
         * 4. render the users
         */

        if(initView){
            return <h2>Please enter keyword to search: {searchName}</h2>
        }else if (loading){
            return <h2>Loading..., waiting...</h2>
        }else if (errorMsg){
            return <h2>{errorMsg}</h2>
        }else {
            return (
                <div className="row">
                    {
                        users.map((user, index)=>{
                            return(
                                <div className="card" key={index}>
                                    <a href={user.url} target="_blank">
                                        <img src={user.avatarUrl} style={{width: 100}}/>
                                    </a>
                                    <p className="card-text">{user.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
}