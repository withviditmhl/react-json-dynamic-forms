import React from 'react'
import PropTypes from 'prop-types'
import MuTextInput from './materialUiFields/MuTextInput'
import MuNumberInput from './materialUiFields/MuNumberInput'
import MuDateInput from './materialUiFields/MuDateInput'
import MuSelectInput from './materialUiFields/MuSelectInput'
import MuMultipleSelectInput from './materialUiFields/MuMultipleSelectInput'
import MuDateTimeInput from './materialUiFields/MuDateTimeInput'
import MuTimeInput from './materialUiFields/MuTimeInput'
import MuRadioInput from './materialUiFields/MuRadioInput'
import MuCheckboxInput from './materialUiFields/MuCheckboxInput'
import MuSwitchInput from './materialUiFields/MuSwitchInput'
import MuTextAreaInput from './materialUiFields/MuTextAreaInput'
import BsTextInput from './bootstrapFields/BsTextInput'
import BsSelectInput from './bootstrapFields/BsSelectInput'
import BsMultipleSelectInput from './bootstrapFields/BsMultipleSelectInput'
import BsTextAreaInput from './bootstrapFields/BsTextAreaInput'
import BsDateInput from './bootstrapFields/BsDateInput'
import BsRadioInput from './bootstrapFields/BsRadioInput'
import BsCheckboxInput from './bootstrapFields/BsCheckboxInput'
import LabelInput from './htmlFields/LabelInput'
import _ from 'lodash'
import './index.css'
let Validator = require('validatorjs')
export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    // this.onFocus = this.onFocus.bind(this)
    // this.onBlur = this.onBlur.bind(this)
    this.mergeCustomComponents = this.mergeCustomComponents.bind(this)
  }
  onChange(event, metaData) {
    let elements = _.cloneDeep(this.props.elements)
    elements = _.map(elements, element => {
      if (element.id === event.id) {
        _.assign(element, event)
        this.validation(metaData, event, element)
      }
      return element
    })
    this.props.onChange(elements)
  }
  // onFocus(event, metaData) {
  //   let elements = _.cloneDeep(this.props.elements)
  //   elements = _.map(elements, element => {
  //     if (element.id === event.id) {
  //       _.assign(element, event)
  //       this.validation(metaData, event, element)
  //     }
  //     return element
  //   })
  //   this.props.onFocus(elements)
  // }
  // onBlur(event, metaData) {
  //   let elements = _.cloneDeep(this.props.elements)
  //   elements = _.map(elements, element => {
  //     if (element.id === event.id) {
  //       _.assign(element, event)
  //       this.validation(metaData, event, element)
  //     }
  //     return element
  //   })
  //   this.props.onBlur(elements)
  // }
  validation(metaData, event, element) {
    if (!_.isEmpty(_.get(metaData, 'validation', {}))) {
      const data = {
        [event.id]: event.value
      }
      const rules = {
        [event.id]: metaData.validation
      }
      let validation = new Validator(data, rules)
      if (validation.passes()) {
        element.invalid = false
      } else {
        element.invalid = true
      }
    }
  }
  mergeCustomComponents() {
    const components = {
      MuTextInput,
      MuNumberInput,
      MuDateInput,
      MuSelectInput,
      MuMultipleSelectInput,
      MuDateTimeInput,
      MuTimeInput,
      MuRadioInput,
      MuCheckboxInput,
      MuSwitchInput,
      MuTextAreaInput,
      LabelInput,
      BsTextInput,
      BsSelectInput,
      BsMultipleSelectInput,
      BsTextAreaInput,
      BsDateInput,
      BsRadioInput,
      BsCheckboxInput,
      ..._.get(this.props, 'customComponents', {})
    }
    return components
  }
  renderElement(element) {
    const _components = this.mergeCustomComponents()
    let metadata = this.props.metaData[element.id]
    const Annotation = _.cloneDeep(_components)[metadata.type]
    metadata['defaultValue'] = _.get(element, 'value', '')
    metadata['invalid'] = _.get(element, 'invalid', false)
    return (
      <Annotation key={element.id} id={element.id}
        onChange={
          (event) => this.onChange(event, metadata)
        }
        // onFocus={
        //   (event) => this.onFocus(event, metadata)
        // }
        // onBlur={
        //   (event) => this.onBlur(event, metadata)
        // }
        {...metadata
        }
      />
    )
  }
  render() {
    return <div className={_.get(this.props, 'className', 'reactjsondynamicform')}>
      { _.map(this.props.elements, (element, key) => this.renderElement(element))}
    </div>
  }
}

Form.propTypes = {
  elements: PropTypes.array,
  onChange: PropTypes.func,
  // onFocus: PropTypes.func,
  // onBlur: PropTypes.func,
  metaData: PropTypes.object,
  className: PropTypes.string,
  customComponents: PropTypes.object
}
