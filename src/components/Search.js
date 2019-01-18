import React, { Component } from 'react'
import SearchResult from './SearchResult'
import axios from 'axios';

export default class Search extends Component {
  state = {
    keyword: "",
    url: 'https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000',
    items: []
  }

  __handleChange = (event) => {
    const keyword = event.target.value;
    this.setState({keyword})
  }

  _handleClick = () => {
    const keyword = this.state.keyword;
    const regex = RegExp(keyword, 'g');
    
    axios.get(this.state.url).then(x => {
      let res = x.data.filter(x => regex.exec(x.title) || regex.exec(x.keywords))
      this.setState({items: res})
    })

    console.log(this.state.items)
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
