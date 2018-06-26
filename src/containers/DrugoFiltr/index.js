import React from "react";
import Button from "components/common/Button";
import Friends from "components/Friends";
import Filters from "components/filters/Filters";
import isMatch from "utilts/isMatch";
import vkApi from "utilts/vkAuth";
import Header from "components/layouts/Header";

export default class DrugoFillter extends React.Component {
  state = {
    friends: {
      leftColumn: [],
      rightColumn: []
    },
    leftFilter: "",
    rightFilter: ""
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.leftFilter !== prevState.leftFilter) {
      this.filterSort();
    }
    if (this.state.rightFilter !== prevState.rightFilter) {
      this.filterSort();
    }
    if (this.state.friends !== prevState.friends) {
      this.filterSort();
    }
  }

  componentDidMount() {
    (async () => {
      await vkApi.auth();
      const friendsArr = await vkApi.getUsers({
        fields: "photo_100",
        count: 20
      });

      let friends = { ...this.state.friends };

      if (localStorage.getItem("array")) {
        friends.rightColumn = JSON.parse(localStorage.getItem("array"));

        for (var i = 0; i < friendsArr.items.length; i++) {
          for (var j = 0; j < friends.rightColumn.length; j++) {
            if (friendsArr.items[i].id === friends.rightColumn[j].id) {
              friendsArr.items.splice(i, 1);
            }
          }
        }

        friends.leftColumn = friendsArr.items;
        this.setState({ friends });
      } else {
        friends.leftColumn = friendsArr.items;
        this.setState({ friends });
      }
    })();
  }

  render() {
    return (
      <div className="container-wrapper">
        <Header />
        <Filters
          leftFilter={this.state.leftFilter}
          rightFilter={this.state.rightFilter}
          handlerFilterChange={this.handlerFilterChange}
        />
        {(this.state.friends.leftColumn || this.state.friends.rightColumn) && (
          <Friends
            friends={this.state.friends}
            buttonClick={this.handlerOnButtonClick}
            drop={this.onDropHandler}
            dragStart={this.dragStartHandler}
          />
        )}
        <Button click={this.handlerSaveButton} />
      </div>
    );
  }

  handlerSaveButton = () => {
    localStorage.setItem(
      "array",
      JSON.stringify(this.state.friends.rightColumn)
    );
  };

  dragStartHandler = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  onDropHandler = (e, column) => {
    e.preventDefault();
    var id = e.dataTransfer.getData("id");
    var siblingSide =
      column === "leftColumn"
        ? this.state.friends.leftColumn
        : this.state.friends.rightColumn;
    var side =
      column === "leftColumn"
        ? this.state.friends.rightColumn
        : this.state.friends.leftColumn;

    for (let i in side) {
      if (side[i].id === +id) {
        let friends = { ...this.state.friends };

        siblingSide.push(side[i]);
        this.setState({ friends });
        side.splice(i, 1);
      }
    }
  };

  handlerFilterChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  filterSort = () => {
    this.filterHandler(this.state.friends.leftColumn, this.state.leftFilter);
    this.filterHandler(this.state.friends.rightColumn, this.state.rightFilter);
  };
  filterHandler = (column, filterData) => {
    if (filterData) {
      let currentColumn = column;

      currentColumn.map(item => {
        if (isMatch(`${item.first_name} ${item.last_name}`, filterData)) {
          item.className = "";
          return item;
        } else {
          item.className = "none";
          return item;
        }
      });

      this.setState({ [column]: currentColumn });
    } else {
      let currentColumn = column;

      currentColumn.map(item => {
        item.className = "";
        return item;
      });

      this.setState({ [column]: currentColumn });
    }
  };

  handlerOnButtonClick = ev => {
    var id = ev.nativeEvent.srcElement.parentElement.parentElement.dataset.id;
    var column =
      ev.nativeEvent.srcElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.className;

    var side =
      column === "left-column"
        ? this.state.friends.leftColumn
        : this.state.friends.rightColumn;
    var siblingSide =
      column === "left-column"
        ? this.state.friends.rightColumn
        : this.state.friends.leftColumn;

    for (let i in side) {
      if (side[i].id === +id) {
        let friends = { ...this.state.friends };

        siblingSide.push(side[i]);
        this.setState({ friends });
        side.splice(i, 1);
      }
    }
  };
}
