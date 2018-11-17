import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import Quill from 'quill'
import Toolbar from './Toolbar'
import style from './style.scss'
import '../../../../../Downloads/react-ions-master/src/styles/global/quill.scss'

/**
 * The TextEditor component.
 */
class TextEditor extends PureComponent {
  constructor(props) {
    super(props)

    this.getHTML = () => {
      if (this._editor) {
        return this._editor.firstChild.innerHTML
      }
    }
  }

  state = {
    value: this.props.value
  }

  static defaultProps = {
    disabled: false,
    value: ''
  }

  static propTypes = {
    /**
     * Whether the text editor is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Value of the text editor (HTML).
     */
    value: PropTypes.string,
    /**
     * Optional placeholder text.
     */
    placeholder: PropTypes.string,
    /**
     * Name of the text editor.
     */
    name: PropTypes.string,
    /**
     * Optional styles to add to the text editor.
     */
    optClass: PropTypes.string,
    /**
     * A callback function to be called when the text editor changes.
     */
    changeCallback: PropTypes.func,
    /**
     * Merge tags to display in the toolbar.
     */
    mergeTags: PropTypes.array
  }

  registerEventHandlers = () => {
    // On text change
    this.state.textEditor.on('text-change', (delta, oldDelta, source) => {
      const value = this.getHTML()

      if (value !== this.state.value) {
        this.handleChange(value)
      }
    })
  }

  handleChange = value => {
    const event = {
      target: {
        name: this.props.name,
        value: value
      }
    }

    // Set state before triggering the callback
    this.setState({ value: value }, () => {
      if (this.props.changeCallback) {
        this.props.changeCallback(event)
      }
    })
  }

  setContent = value => {
    this._editor.firstChild.innerHTML = value
  }

  componentDidMount = () => {
    // Define editor options
    const options = {
      modules: {
        toolbar: this._toolbar
      },
      placeholder: this.props.placeholder || '',
      theme: 'snow'
    }

    // Use style attribute for align and font tools
    const AlignAttribute = Quill.import('attributors/style/align')
    const FontAttribute = Quill.import('attributors/style/font')

    Quill.register(AlignAttribute, true)
    Quill.register(FontAttribute, true)

    // Initialize the editor
    this.setState({ textEditor: new Quill(this._editor, options) }, () => {
      // Set the content
      if (this.props.value) {
        this.setContent(this.props.value)
      }

      // Disable the editor
      if (this.props.disabled) {
        this.state.textEditor.disable()
      }

      // Register event handlers
      this.registerEventHandlers()
    })
  }

  componentWillReceiveProps = nextProps => {
    // Enable/disable the editor
    this.state.textEditor.enable(!nextProps.disabled)

    // If the value changed set the editor content and state
    if (nextProps.value !== this.state.value) {
      this.setContent(nextProps.value)
      this.setState({ value: nextProps.value })
    }
  }

  setToolbarRef = toolbar => {
    this._toolbar = toolbar
  }

  render = () => {
    const cx = classNames.bind(style)
    const disabledClass = this.props.disabled ? style['editor-disabled'] : ''
    const editorClass = cx(style['editor-component'], this.props.optClass, disabledClass)

    return (
      <div className={editorClass}>
        <Toolbar textEditor={this.state.textEditor} mergeTags={this.props.mergeTags} onMount={this.setToolbarRef} />
        <div ref={c => this._editor = c}></div>
        <div className={style.overlay}></div>
      </div>
    )
  }
}

export default TextEditor
