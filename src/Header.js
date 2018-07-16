import React,{ Component } from 'react';
import './index.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
        itemText: '',
    };
    this.handleItemtextChange = this.handleItemtextChange.bind(this);
    this.enterPress = this.enterPress.bind(this);
    this.onKeyPress = this.enterPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleItemtextChange(event) {
    this.setState({
      itemText: event.target.value
    });
  }

  handleSubmit() {
    if(this.props.onSubmit) {
      const { itemText } = this.state;
      this.props.onSubmit({ itemText })
    }
    this.setState({ itemText: ''});
  }

  enterPress(e) {
    if (e.keyCode === 13) {
        this.handleSubmit();
    }
  }

  render() {
    return (
      <div>
        <span id="todo">todo</span>
        <input id="inp" type="text" placeholder="what needs to be done?"
          value={this.state.itemText} onChange={this.handleItemtextChange}
          onKeyDown={this.enterPress} onKeyPress={this.enterPress} />
        <button type="button" id="getBtn" onClick={this.handleSubmit}>
          OK
        </button>
      </div>
    );
  }
}

export default Header;
