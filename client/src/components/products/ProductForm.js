import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    // isChange state used for boolean flag to form values which have undefined
    // value. If this boolean flag not exist, reactjs wiil give an console error
    // "change undefined value to defined value"

    // CreateForm ==> isChange initial state as true because no need to check
    // since form values will be empty string as default

    // UpdateForm ==> isChange initial state as false to flag when initialValues
    // from redux at Parent Component not ready to pass props to children. If
    // isChange 'false', it won't render form. When redux ready to pass
    // initialValues props to children component, isChange will become true
    // using componentDidUpdate. if isChange is true, it will render form as
    // form values will be defined

    if (!props.initialValues) {
      this.state = {
        title: '',
        price: '',
        isChange: true,
      };
    } else {
      this.state = {
        title: props.initialValues.title,
        price: props.initialValues.price,
        isChange: false,
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.initialValues !== this.props.initialValues) {
      this.setState({
        title: this.props.initialValues.title,
        price: this.props.initialValues.price,
        isChange: true,
      });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formValues = { title: this.state.title, price: this.state.price };
    this.props.onSubmit(formValues);
  }

  renderError = (formError) => {
    if (formError.length > 0) {
      return (
        <div className="ui error message">
          <div className="ui relaxed list">
            {formError.map(({ message, field }) => {
              return (
                <div className="item" key={message}>
                  <i className="exclamation circle icon"></i>
                  <div className="content">
                    <div
                      className="header"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {field}
                    </div>
                    <div className="description">{message}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  renderForm() {
    return (
      <form className="ui form error" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="field required">
          <label>Title</label>
          <input
            name="title"
            placeholder="Enter Title"
            value={this.state.title}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </div>
        <div className="field required">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter Price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </div>
        <div className="ui buttons">
          <Link to="/products" className="ui button red">
            Cancel
          </Link>
          <div className="or"></div>
          <button className="ui button submit right floated green">
            Submit
          </button>
        </div>
        {this.renderError(this.props.error)}
      </form>
    );
  }

  render() {
    return (
      <>{this.props.initialValues === {} ? <Loader /> : this.renderForm()}</>
    );
  }
}

export default ProductForm;
