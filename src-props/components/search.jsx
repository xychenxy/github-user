import React, {Component} from 'react';
import PropTypes from 'prop-types'
export default class Search extends Component{

    static propTypes = {
        setSearchName: PropTypes.func.isRequired
    }

    search = () => {
        const searchName = this.input.value.trim()
        if(searchName){
            this.props.setSearchName(searchName)
        }
    }


    render(){
        return(
            <section className="jumbotron text-center">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input type="text" placeholder="search name" ref={input=>this.input=input}/>
                    <button className='btn btn-primary custom-btn' onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}