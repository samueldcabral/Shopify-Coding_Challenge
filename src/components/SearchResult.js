import React, { Component } from 'react'

export default class SearchResult extends Component {
  state = {
    favs: [],
    
  }

  // if(regex.exec(x.title) || regex.exec(x.keywords)){
        //   // title = x.title;
        //   // temp = new DOMParser().parseFromString(x.body, "text/html");
        //   // description = temp.documentElement.textContent;
        //   return x         // resultArr.push(item)
          // alert('here')
        // }
    //   })
    // });
    // console.log(resultArr)
    // console.log("teve")
    // this.setState({resultArr})

  domParser = (str) => {
    const regex = /\w+/gm
    let temp = new DOMParser().parseFromString(str, "text/html");
    console.log(regex.exec(temp.documentElement.textContent))
    return temp.documentElement.textContent
    // var el = document.createElement( 'div' );
    // el.innerHTML = temp.documentElement.textContent;;
    // return el
  }


  render() {
    const { itemList } = this.props;

    

    const title = Object.keys(itemList).length !== 0 ? itemList.map((x, index) => {
      return (<div className="searchResult"><span className="searchResult__title">
              <i className={x.starred ? "fa fa-star searchResult__icon searchResult__icon--starred" : "fa fa-star searchResult__icon"} aria-hidden="true" id={index}></i>
              <h4 className="searchResult__h4">{x.title}</h4>
              </span>
              {this.domParser(x.body)}
              {/* {x.description} */}
              {/* <ul className="searchResult__ul">
                {x.description.map(elem => ( <li>{elem}</li> ))}
              </ul> */}
              </div>)}) : ''      

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
