import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  ControlLabel,
  FormGroup,
  HelpBlock
} from 'react-bootstrap'
import _ from 'lodash'
export default class BsMultipleSelectInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.renderMenuItems = this.renderMenuItems.bind(this)
  }
  handleOnChange(e) {
    let values = []
    _.map(e.target.options, x => {
      if (x.selected === true) { values.push(x.value) }
    })
    this.props.onChange({
      id: this.props.id,
      value: values
    })
  }
  renderMenuItems() {
    return (_.map(this.props.values, (value) =>
      <option key={value.label} value={value.value}>{value.label}</option>))
  }
  render() {
    return (
      <FormGroup controlId='formControlsSelectMultiple' className={this.props.className ? this.props.className : ''} validationState={this.props.invalid ? 'error' : null}>
        <ControlLabel>{this.props.label ? this.props.label : ''}</ControlLabel>
        <FormControl
          multiple
          defaultValue={this.props.defaultValue ? this.props.defaultValue : []}
          onChange={this.handleOnChange}
          placeholder={this.props.placeholder ? this.props.placeholder : ''}
          readOnly={this.props.readOnly ? this.props.readOnly : false}
          componentClass='select'
        >
          {this.renderMenuItems()}
        </FormControl>
        <FormControl.Feedback />
        <HelpBlock>{this.props.helperText ? this.props.helperText : ''}</HelpBlock>
      </FormGroup>
    )
  }
}

BsMultipleSelectInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  helperText: PropTypes.string,
  invalid: PropTypes.bool,
  readOnly: PropTypes.bool,
  values: PropTypes.array
}
