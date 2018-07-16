import React,{ Component } from 'react';
import './index.css';
import TodoItem from './todoItem.js';
import Footer from './Footer.js';

class TodoList extends Component {
  constructor() {
    super();
    this.handleOver = this.handleOver.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAlterItem = this.handleAlterItem.bind(this);
    this.handleClearItem = this.handleClearItem.bind(this);
  }

  static defaultProps = {
    list: []
  }

  handleOver(index) {
    if(this.props.onOverItem) {
      this.props.onOverItem(index);
    }
  }

  handleDelete(index) {
    if(this.props.onDeleteItem) {
      this.props.onDeleteItem(index);
    }
  }

  handleAlterItem(event,index) {
    if(this.props.onAlterItem) {
      this.props.onAlterItem(event,index);
    }
  }

  handleClearItem() {
    if(this.props.handleClearItem) {
      this.props.handleClearItem();
    }
  }

  render() {
    var itemNum = 0;
    const { filter } = this.props;
    var div =
      <table className="table">
        <tbody>
          {this.props.list.map((comment,i) => {
            if (filter === 'all' ||
              (filter === 'active' &&
              (comment.complete === 'F' || comment.complete === 'R')) ||
              (filter === 'complete' && comment.complete === 'T')
            ) {
              itemNum++;
              return (
                <TodoItem
                  todoItem={comment}
                  key={i}
                  index={i}
                  onOverItem={this.handleOver}
                  onDeleteItem={this.handleDelete}
                  onAlterItem={this.handleAlterItem}
                  onChange={this.handleAlterItem}
                />
              )
            }
          })}
        </tbody>
      </table>;

    if(itemNum === 0) {
      div = <span id="noTips">No Tips !</span>;
    }

    return (
      <div className="showTips">
        {div}
        <Footer
          itemNum={itemNum}
          list={this.props.list}
          filter={this.props.filter}
          changeFilter={this.props.changeFilter}
          handleClearItem={this.handleClearItem} />
      </div>
    );
  }
}

export default TodoList;
