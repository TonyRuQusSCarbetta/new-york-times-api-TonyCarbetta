import React, {Component} from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  state = {
    apikey: "8437b363971849dea95b19598d4c8fcd",
    articles: [],
    userSearch: ''
  }

  userChange = (e) => {
    this.setState({userSearch: e.target.value})
    // console.log(this.state.userSearch);
  }

  getArticles = () => {
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8437b363971849dea95b19598d4c8fcd&q=" + this.state.userSearch).then(response => {
      // console.log(response.data.response.docs);
      this.setState({articles: response.data.response.docs})
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      userSearch: '',
      articles: [
        ...this.state.articles,
        this.state.userSearch
      ]
      //... a BRACKET with three dots is a spread operator, this returns all the properties of an element,
      //the reason this is returning the new articles instead of the blank one is because of the THIS KEYWORD
    });
  }

  render() {
    return (<div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-5 center">NEW YORK TIMES<br/>
            ARTICLE SEARCH</h1>
        </div>

        <div className="col-12 center">
          <form onSubmit={this.onSubmit}>
            <input type="text" onChange={this.userChange} value={this.state.userSearch} placeholder=" search for..." id="backToInput"/>
            <i className="fas fa-search"></i>
            <br/>
            <button onClick={this.getArticles} className="btn btn-black m-3">Click for Articles</button>
          </form>
        </div>

        <div className="col-md-2"></div>
        <div className="col-md-8 center mb-5">

          {
            this.state.articles.map((article, idx) => {
              return (<div key={idx}>
                <div className="center mb-2 articles p-3 pt-0">
                  <h4 className="text-dark pt-3 pb-0 mb-2">{article.snippet}</h4>

                  <a href={article.web_url} className="text-secondary p-2" target="_blank">
                    Click this Link to view the full article.
                  </a>
                </div>
              </div>);
            })
          }
          <a href="#backToInput" className="fixed-bottom backToInput mb-1">
            <i className="far fa-arrow-alt-circle-up">
              Back to Search</i>
          </a>
        </div>
        <div className="col-md-2"></div>

      </div>
    </div>);
  }
}

export default App;
