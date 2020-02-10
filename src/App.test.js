import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Search from "./components/Search";
import Table from "./components/Table";
import Button from "./components/Button";
import { updateSearchTopStoriesState } from "./helpers";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search", () => {
  const props = {
    value: "",
    onChange: () => {},
    onSubmit: () => {}
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search {...props}>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Search {...props}>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Button", () => {
  const onClick = () => {};

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button onClick={onClick}>Give me more</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(
      <Button onClick={onClick}>Give me more</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("has a `inline-button` class", () => {
    const element = shallow(
      <Button className="inline-button" onClick={onClick}>
        Give me more
      </Button>
    );
    expect(element.find(".inline-button").length).toBe(1);
  });
});

describe("Table", () => {
  const props = {
    list: [
      { title: "1", author: "1", num_comments: 1, points: 2, objectID: "y" },
      { title: "2", author: "2", num_comments: 1, points: 2, objectID: "z" }
    ],
    onDismiss: () => {}
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Table {...props}></Table>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Table {...props}></Table>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("shows two items in list", () => {
    const element = shallow(<Table {...props}></Table>);
    expect(element.find(".table-row").length).toBe(2);
  });
});

describe("updateSearchTopStoriesState", () => {
  const hits = [];
  const page = 0;
  const searchKey = "react";
  const results = {
    redux: {
      hits: []
    }
  };

  const { results: newResults } = updateSearchTopStoriesState(
    hits,
    page
  )({ searchKey, results });

  test("has a redux property", () => {
    expect(newResults).toHaveProperty("react");
  });

  test("results.redux has properties page and hits", () => {
    expect(newResults.react).toHaveProperty("hits");
    expect(newResults.react).toHaveProperty("page");
  });
});
