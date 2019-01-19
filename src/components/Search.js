import React, { Component } from 'react'
import SearchResult from './SearchResult'
import axios from 'axios';

export default class Search extends Component {
  state = {
    keyword: "",
    url: 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000',
    items: [],
    loading: null
  }

  _handleSubmit = (event) => {
    event.preventDefault();
  }

  __handleChange = (event) => {
    const keyword = event.target.value;

    //When the input field gets cleared, so do the search results
    if(event.target.value === ""){
      //A timeout to ease out the emptying of the search
      setTimeout(() => {
        this.setState({items: []});
      }, 300);
    }
    //setting the state of the keyword as the user types
    this.setState({keyword})
  }

  _handleKeyDown = (event) => {
    const ENTER_KEY = 13
    const KEY_PRESSED = event.keyCode

    //handling enter input
    if(KEY_PRESSED === ENTER_KEY){
      this._performApiCall();
    }
  }

  _performApiCall = () => {
    //The API call is gonna be made based on regex matching keyword
    const keyword = this.state.keyword;
    const regex = RegExp(keyword, 'g');
    
    //When starting to perform the search, the loading state gets set to true so that the Spinner is rendered
    this.setState({loading: true})
    
    //API CALL using axios
    axios.get(this.state.url).then(x => {
      let res = x.data.filter(x => regex.exec(x.title) || regex.exec(x.keywords))
      this.setState({items: res, loading: false})
    })
  }

  render() {
    return (
      <div>
        <form className="search" onSubmit={this._handleSubmit}>
          <input type="input" className="search__input" onChange={this.__handleChange} onKeyDown={this._handleKeyDown}/>
          <span onClick={this._performApiCall}>
            <i className="fas fa-search fa-flip-horizontal search__icon"></i>
          </span>
        </form>
        <SearchResult itemList={this.state.items} loading={this.state.loading}/>
      </div>
    )
  }
}
