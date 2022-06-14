/* eslint-disable */
import { Input } from 'antd'
import React, { useState } from 'react'
import './styles.scss'

const FloatInputLabel = props => {
  const [focus, setFocus] = useState(false)
  let isOccupied

  isOccupied = focus || (props.value && props.value.length !== 0)

  if (!props.placeholder) {
    props.placeholder = props.label
  }

  const labelClass = isOccupied ? 'label as-label' : 'label as-placeholder'

  return (
    <div className={`float-label ${props.className}`}>
      <label className={labelClass}>
        {isOccupied ? props.label : props.placeholder}
      </label>
      <Input
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        className="float-input"
        onChange={props.onChange}
        autoComplete="off"
        defaultValue={props.value}
        value={props.value}
        name={props.name}
        disabled={props.disabled}
        suffix={props.addon && <img src={props.addon} />}
      />
    </div>
  )
}

export default FloatInputLabel
