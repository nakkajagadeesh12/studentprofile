import React, { Component } from "react";
import { Container, Row, Card } from "reactstrap";
import axios from "axios";
import "./App.css";
import StudentMainPage from "./components/StudentMainPage";
import SearchBox from "./components/SearchBox";
import { LoadingIndicator } from "./components/LoadingIndicator";

const apiEndpoint = "https://www.hatchways.io/api/assessment/students";
class App extends Component {
  state = {
    students: null,
    searchNameQuery: "",
    searchTagQuery: "",
    tag: [],
    update: "",
  };
  getDataFromAPI = async () => {
    const {
      data: { students },
    } = await axios.get(apiEndpoint);
    return students;
  };

  componentDidMount = async () => {
    if (this.state.registrationData != null) return;
    let students = await this.getDataFromAPI();
    if (students === null) return;
    this.setState({ students: students });
    let tagItem = [];
    this.state.students.map((stu) => {
      tagItem.push({ id: stu.id, tags: [] });
    });
    this.setState({ tag: tagItem });
  };

  getSearchData = () => {
    const { searchNameQuery, searchTagQuery, students, tag } = this.state;
    let filtered = students;
    if (searchNameQuery) {
      filtered = Object.values(filtered).filter((student) =>
        student.firstName
          .toLowerCase()
          .startsWith(searchNameQuery.toLowerCase())
      );
    } else if (searchTagQuery) {
      filtered = Object.values(filtered).filter((student, index) =>
        tag[index].tags.some((itm) => itm.startsWith(searchTagQuery))
      );
    } else return filtered;
    //console.log(filtered);
    return filtered;
  };
  handleSearch = (query) => {
    this.setState({ searchNameQuery: query });
    this.getSearchData();
  };

  handleTagSearch = (query) => {
    this.setState({ searchTagQuery: query });
    this.getSearchData();
  };

  handleChange = (e) => {
    this.setState({ update: e.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let items = this.state.tag.map((item) => {
        if (item.id === event.target.id) {
          const newItem = { ...item, tags: [...item.tags, this.state.update] };
          return newItem;
        }
        return item;
      });
      this.setState({ tag: items });
    }
  };

  render() {
    const students = this.getSearchData();
    //console.log(typeof students);
    if (students == null) return <LoadingIndicator />;
    // <h1 style={{color:'blue'}}>Loading...</h1>
    return (
      <Card className="main_content">
        <div className="search_box_group">
          <SearchBox
            value={this.state.searchNameQuery}
            onChange={this.handleSearch}
            placeholder="Search by name"
          />
          <SearchBox
            value={this.state.searchTagQuery}
            onChange={this.handleTagSearch}
            placeholder="Search by Tag"
          />
        </div>
        <div className="content">
          {students.length > 0 ? students.map((student) => {
            return (
              <StudentMainPage
                key={student.id}
                data={student}
                tag={this.state.tag}
                handleChange={this.handleChange}
                handleKeyPress={this.handleKeyPress}
              />
            );
          }) : <div style={{textAlign:"center",fontSize:"40px"}}>No Records Found</div>}
        </div>
      </Card>
    );
  }
}

export default App;
