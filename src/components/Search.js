import React, { Component } from 'react'
import SearchResult from './SearchResult'

export default class Search extends Component {
  state = {
    keyword: "",
    url: 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000',
    items: [
      {'title': 'Blue Bins', 'description': ['item 1', 'item 2'], 'starred':true},
      {'title': 'Red Bins', 'description': ['item 3', 'item 4'], 'starred':false}
    ]
  }

  __handleChange = (event) => {
    const keyword = event.target.value;
    this.setState({keyword})
  }

  _handleClick = () => {
    
  }

  render() {
    return (
      <div>
        <form className="search">
          <input type="input" className="search__input" onChange={this.__handleChange}/>
          <span onClick={this._handleClick}>
            <i className="fas fa-search fa-flip-horizontal search__icon"></i>
          </span>
        </form>
        <SearchResult itemList={this.state.items}/>
      </div>
    )
  }
}
