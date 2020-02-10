import React, { Component } from "react";
import axious from "axios";
import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from "./constants";
import Search from "./components/Search";
import Table from "./components/Table";
import Button from "./components/Button";
import { withLoading, withError } from "./hocs";
import { updateSearchTopStoriesState } from "./helpers";
import "./App.css";

const ButtonWithLoading = withLoading(Button);
const TableWithError = withError(Table);

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  onDismiss(id) {
    this.setState(prevState => {
      const { searchKey, results } = prevState;
      const { hits, page } = results[searchKey];
      const isNotId = item => item.objectID !== id;
      const updatedHits = hits.filter(isNotId);
      return {
        results: {
          ...results,
          [searchKey]: { hits: updatedHits, page }
        }
      };
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(e) {
    const { searchTerm } = this.state;
    this.setState(({ searchTerm }) => ({ searchKey: searchTerm }));
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    e.preventDefault();
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });
    axious(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { results, searchTerm, searchKey, error, isLoading } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <TableWithError error={error} list={list} onDismiss={this.onDismiss} />
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
