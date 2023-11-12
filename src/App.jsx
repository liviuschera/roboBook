import { useEffect, useState } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filteredRobots, setFilteredRobots] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://random-data-api.com/api/v2/users?size=33&is_json=true"
      );
      const robots = await response.json();
      setRobots(robots);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filterRobots = robots.filter((robot) => {
      const fullName =
        `${robot.first_name}${robot.last_name}`.toLocaleLowerCase();
      return fullName.includes(searchString);
    });
    setFilteredRobots(filterRobots);
  }, [robots, searchString]);

  const onSearchChange = (event) => {
    console.log("event: ", event.target.value);
    const searchString = event.target.value.toLocaleLowerCase();
    setSearchString(searchString);
  };

  return (
    <div className="App">
      <h1 className="app-name">RoboBook</h1>
      {robots.length ? (
        <>
          <SearchBox
            className="search-box"
            onChangeHandler={onSearchChange}
            placeholder="Search for robots"
          />
          <CardList robots={filteredRobots} />
        </>
      ) : (
        "Loading data..."
      )}
    </div>
  );
};

export default App;
