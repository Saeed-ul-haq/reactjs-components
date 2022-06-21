import React from 'react'
import { CircularProgress, Button } from 'react-md'
import PropTypes from 'prop-types'
// import i18n from 'i18n-js'
// import l from 'libs/langs/keys'
import './styles.scss'

const Spinner = props => {
  const { text } = props
  return (
    <div className="loading">
      <CircularProgress
        id="file-manager-universal-loader"
        scale={1}
        {...props}
      />
      <div className="loading-text">{text}</div>
    </div>
  )
}

export const Loader = props => {
  const { text, onCancel, style = {}, ...rest } = props
  return (
    <div
      className="local-spinner"
      ref={r => {
        rest.onRef && rest.onRef(r)
      }}
      style={style}
    >
      <div
        className="local-spinner-content"
        title={text || `${i18n.t(l.processing)}`}
      >
        <img
          src="/static/images/preloader.gif"
          alt={text}
          // height="50"
          // width="50"
          style={{
            marginBottom: '20px',
            marginTop: '20px',
            width: '80%',
          }}
          {...rest}
        />

        {text && <div className="load-text">{text}</div>}
        {onCancel && (
          <Button
            primary
            onClick={() => {
              onCancel && onCancel()
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}

Spinner.propTypes = {
  text: PropTypes.string,
}

Loader.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  onCancel: PropTypes.func,
}
export default Spinner
