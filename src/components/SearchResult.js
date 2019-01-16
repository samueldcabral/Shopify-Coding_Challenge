import React, { Component } from 'react'

export default class SearchResult extends Component {
  state = {
    favs: [{'title': 'Blue Bins', 'description': ['item 1', 'item 2'], 'starred':true},
    {'title': 'Red Bins', 'description': ['item 3', 'item 4'], 'starred':true}],
    
  }

  render() {
    const { itemList } = this.props;

    const title = itemList.map(x => {
      return (<div className="searchResult"><span className="searchResult__title">
              <i className={x.starred ? "fa fa-star searchResult__icon searchResult__icon--starred" : "fa fa-star searchResult__icon"} aria-hidden="true"></i>
              <h4 className="searchResult__h4">{x.title}</h4>
              </span>
              <ul className="searchResult__ul">
                {x.description.map(elem => ( <li>{elem}</li> ))}
              </ul>
              </div>)})       

  const Favs = this.state.favs ? this.state.favs.map(x => {
    return (<div className="searchResult"><span className="searchResult__title">
          <i className={x.starred ? "fa fa-star searchResult__icon searchResult__icon--starred" : "fa fa-star searchResult__icon"} aria-hidden="true"></i>
          <h4 className="searchResult__h4">{x.title}</h4>
          </span>
          <ul className="searchResult__ul">
            {x.description.map(elem => ( <li>{elem}</li> ))}
          </ul>
          </div>)}) : ''   

    
    return (
      <div>
        {title}
        <div className="favouritesWrapper">
        <h2 className="favourites__h2">Favourites</h2>
        {Favs}
        </div>
      </div>
    )
  }
}
