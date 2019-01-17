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
  htmlToElements = (html) => {
      var template = document.createElement('template');
      template.innerHTML = html;
      return template.content.childNodes;
  }

  sanitizeTxt = (txt) => {
    let q = txt.split('')
    let count = 0;
    for(let i = 0; i < q.length; i++){
      if(q[i].charCodeAt(0) === 38){
        while(q[i].charCodeAt(0) !== 59){
          if(count === 0){
            q[i] = q[i].replace(q[i], ' ')   
          }else{
            q[i] = q[i].replace(q[i], '')
          }
          count++
          i++
        }
        if(q[i].charCodeAt(0) === 59){
          q[i] = q[i].replace(q[i], '')
        }
      }
    }
    q = q.join('').trim()
    return q
  }

  getBoldWords = (str) => {
    let boldWords = [];
    for(let i = 0; i < str.length; i++){
      if(str[i].includes("<strong>")){
        console.log(str[i])
  
        let de = str[i].split('<strong>')
        for(let i = 0; i < de.length; i++){
          if(de[i].includes("</")){
            let a = de[i].split('</strong>')
            boldWords.push(a[0])
          }
        }
      }else if(str[i].includes("<b>")){  
        let de = str[i].split('<b>')
        for(let i = 0; i < de.length; i++){
          if(de[i].includes("</")){
            let a = de[i].split('</b>')
            boldWords.push(a[0])
          }
        }
      }
    }
    
    let htmlTotal = null;

    for(let i = 0; i < str.length; i++){
      if(str[i].includes("<strong>")){
        let a = str[i].split("<strong>");
        htmlTotal = <li>{a} <strong>{boldWords[0]}</strong></li>
      }
    }

    return htmlTotal
  }

  domParser = (str) => {
    const regex = /\w+/gm
    let temp = new DOMParser().parseFromString(str, "text/html");
    let res = this.htmlToElements(temp.documentElement.textContent)
    let test = this.htmlToElements(res[0].innerHTML)
    test = [...test]
    let final = test.filter(x => x.innerHTML).map(x => x.innerHTML)
    let thise = final.map(x => this.sanitizeTxt(x))
    console.log(thise)

    let bolds = this.getBoldWords(thise)
    console.log(bolds +"bolds")

    return bolds
    // return <h1>samuel</h1>
    // console.log(regex.exec(temp.documentElement.textContent))
    // console.log(temp)
    // return temp.documentElement.textContent
    // return temp
    // var el = document.createElement( 'div' );
    // el.innerHTML = temp.documentElement.textContent;;
    // return el
  }

//     htmlToElement(html) {
//     var template = document.createElement('template');
//     html = html.trim(); // Never return a text node of whitespace as the result
//     template.innerHTML = html;
//     let result = 
//     return template.content.firstChild;
// }

// var td = htmlToElement('<td>foo</td>'),
//     div = htmlToElement('<div><span>nested</span> <span>stuff</span></div>');




// var rows = htmlToElements('<tr><td>foo</td></tr><tr><td>bar</td></tr>');

  render() {
    const { itemList } = this.props;  

    const title = Object.keys(itemList).length !== 0 ? itemList.map((x, index) => {
      return (<div className="searchResult"><span className="searchResult__title">
              <i className={x.starred ? "fa fa-star searchResult__icon searchResult__icon--starred" : "fa fa-star searchResult__icon"} aria-hidden="true" id={index}></i>
              <h4 className="searchResult__h4">{x.title}</h4>
              </span>
              <ul>
                <li>
                  {this.domParser(x.body)}
                </li>
              </ul>
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
