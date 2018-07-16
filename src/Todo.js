import React,{ Component } from 'react';
import './index.css';
import Header from './Header.js';
import TodoList from './todoList.js';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      list: JSON.parse(localStorage.getItem('list')) || [],
      filter: 'all'
    };
    this.handleSubmitItem = this.handleSubmitItem.bind(this);
    this.handleOverItem = this.handleOverItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleClearItem = this.handleClearItem.bind(this);
    this.handleAlterItem = this.handleAlterItem.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  createItem(title) {
    var timestamp = Date.parse(new Date());
    var obj = {
      title: title,
      complete: 'F',
      date: timestamp,
    };
    return obj;
  }

  pad(num) {
    return Number(num) < 10 ? '0' + num : num;
  }

  timeTrans(date) {
    var data = new Date(date);
    var year = data.getFullYear();
    var month = this.pad(data.getMonth() + 1);
    var day = this.pad(data.getDate());
    return year + '-' + month + '-' + day;
  }

  setNewState(itemList) {
    this.setState({
      list: itemList
    },() => {
      localStorage.setItem('list',JSON.stringify(itemList));
    });
  }

  changeFilter(filter) {
    this.setState({
      filter,
    });
  }

  handleSubmitItem(comment) {
    var itemList = this.state.list.slice();
    var obj = this.createItem(comment.itemText);
    itemList.splice(itemList.length,0,obj);
    this.setNewState(itemList);
  }

  handleOverItem(index) {
    var itemList = this.state.list.slice();
    var item = {...itemList[index]};
    item.date = Date.parse(new Date());
    if(item.complete === 'F' || item.complete === 'R') {
      item.complete = 'T';
    }
    else {
      item.complete = 'R';
    }
    itemList.splice(index,1,item);
    this.setNewState(itemList);
  }

  handleDeleteItem(index) {
    var itemList = this.state.list.slice();
    itemList.splice(index,1);
    this.setNewState(itemList);
  }

  handleClearItem() {
    var itemList = this.state.list.slice();
    for (var i = 0; i < itemList.length;) {
      var item = {...itemList[i]}
      if (item.complete === 'T') {
        itemList.splice(i, 1);
        continue;
      }
      i++;
    }
    this.setNewState(itemList);
  }

  handleAlterItem(event,index) {
    var itemList = this.state.list.slice();
    var item = {...itemList[index]};
    item.title = event.target.value;
    item.date = Date.parse(new Date());
    item.complete = 'R';
    itemList.splice(index,1,item);
    this.setNewState(itemList);
  }

  render() {
    return (
      <div className="wrapper">
        <Header
          onSubmit={this.handleSubmitItem}
        />
        <TodoList
          list={this.state.list}
          filter={this.state.filter}
          onOverItem={this.handleOverItem}
          onDeleteItem={this.handleDeleteItem}
          onAlterItem={this.handleAlterItem}
          onChange={this.handleAlterItem}
          changeFilter={this.changeFilter}
          handleClearItem={this.handleClearItem}
        />
      </div>
    );
  }
}

export default Todo;
