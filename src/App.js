import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      name: "",
      action: "ADD ITEM", //default ADD ITEM
      items: [],
    };
    this.changeName = this.changeName.bind(this);
  }

  changeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  addItem = () => {
    if (!this.state.items.find((item) => item.name === this.state.name)) {
      this.setState({
        items: [
          ...this.state.items,
          { name: this.state.name},
        ],
        name: "",
      });
    }
  };

  Edit = (item, index) => {
    this.setState({
      action: "UPDATE ITEM",
      name: item.name,
      index: index,
    });
  };

  updateItem = () => {
    let data = this.state.items;
    data.map((item, index) => {
      if (this.state.index === index) {
        item.name = this.state.name;
      }
    });
    //set update items
    this.setState({
      items: data,
      name: "",
      action: "ADD ITEM",
    });
  };

  deleteItem = (name) =>
    this.setState({
      items: this.state.items.filter((item) => item.name !== name),
    });

  render() {
    return (
      <div className="container">
        <div className="w-100">
          <div className="row">
            <div className="col-md-4">
              <h1>{this.state.action}</h1>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name=""
                  className="form-control"
                  onChange={this.changeName}
                  value={this.state.name}
                />
              </div>
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    this.state.action === "ADD ITEM"
                      ? this.addItem
                      : this.updateItem
                  }
                >
                  Add
                </button>
              </div>
            </div>

            <div className="col-md-8">
              <h1>Todo List</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <label
                          className="btn btn-warning"
                          onClick={() => this.Edit(item, index)}
                        >
                          Update
                        </label>
                        <label
                          className="btn btn-danger"
                          onClick={() => this.deleteItem(item.name)}
                        >
                          Remove
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;