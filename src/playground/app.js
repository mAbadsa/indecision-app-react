class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      title: "Indecision App",
      subTitle: "Put your life in the hands of a computer",
      options: ["Option__One", "Option__Two"]
    }
  }

  componentDidMount(prevProps, prevState) {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if(options) {
        this.setState(() => ({ options }));
      }
    } catch (error) {
      
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json)
    }
  }

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }))
  }

  handleDeleteOption(option) {
    console.log("Remove", option);
    this.setState((prevState) => ({ options: prevState.options.filter(opt => opt !== option) }))
  }

  handlePick() {
    const randomNum = Math.floor(Math.random()*(this.state.options.length));
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleAddOption(newOption) {
    if(!newOption) {
      return 'Enter valid value to add item!'
    } else if (this.state.options.indexOf(newOption) > -1) {
      return 'This option already exists!'
    }
    this.setState((prevState) => ({ options: prevState.options.concat(newOption) }))
  }

  render() {
    return (
      <div>
        <Header title={this.state.title} subTitle={this.state.subTitle}/>
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          options={this.state.options}
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subTitle}</h2>
    </div>
  );
}

const Action = (props) => {
    return (
      <div>
        <button
          onClick={props.handlePick}
          disabled={!props.hasOptions}>
          What should I do?
        </button>
      </div>
    );
}

const Options = (props) => {
    return (
      <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0 && <p>Please add an options to get started!</p>}
        {props.options.map((option, index) => (
          <Option
            handleDeleteClick={props.handleDeleteOption}
            key={index}
            optionText={option}
          />
        ))}
      </div>
    );
}

const Option = (props) => {    
  return (
    <div>
      <div>
        <span>
          Option >> {props.optionText}
        </span>
        <button
          onClick={(e) => {
            props.handleDeleteClick(props.optionText)
          }}
        >
        Remove
        </button>
      </div>
    </div>
  )
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }

  handleAddOption(e) {
    e.preventDefault();

    const newOption = e.target.elements.optionInput.value.trim();
    const error = this.props.handleAddOption(newOption);

    this.setState(() => ({ error }))

    if(!error) {
      e.target.elements.optionInput.value = "";
      e.target.elements.optionInput.focus();
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{ this.state.error }</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="optionInput"/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
