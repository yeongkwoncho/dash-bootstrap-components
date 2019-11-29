import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {Modal as RSModal} from 'reactstrap';

/**
 * Create a toggleable dialog using the Modal component. Toggle the visibility
 * with the `is_open` prop.
 */
class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      modalOpen: props.is_open
    };
  }

  toggle() {
    if (this.props.setProps) {
      this.props.setProps({is_open: !this.state.modalOpen});
    } else {
      this.setState({modalOpen: !this.state.modalOpen});
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.is_open != prevState.modalOpen) {
      return {modalOpen: nextProps.is_open};
    } else return null;
  }

  render() {
    const {children, ...otherProps} = this.props;
    return (
      <RSModal
        isOpen={this.state.modalOpen}
        toggle={this.toggle}
        {...omit(
          [
            'setProps',
            'is_open',
            'persistence',
            'persistence_type',
            'persisted_props'
          ],
          otherProps
        )}
      >
        {children}
      </RSModal>
    );
  }
}

Modal.defaultProps = {
  persisted_props: ['is_open'],
  persistence_type: 'local'
};

Modal.propTypes = {
  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: PropTypes.string,

  /**
   * The children of this component
   */
  children: PropTypes.node,
  /**
   * Defines CSS styles which will override styles previously set.
   */
  style: PropTypes.object,

  /**
   * Often used with CSS to style elements with common properties.
   */
  className: PropTypes.string,

  /**
   * HTML tag to use for the Modal, default: div
   */
  tag: PropTypes.string,

  /**
   * Whether modal is currently open.
   */
  is_open: PropTypes.bool,

  /**
   * If true, vertically center modal on page.
   */
  centered: PropTypes.bool,

  /**
   * It true, scroll the modal body rather than the entire modal when it is too
   * long to all fit on the screen.
   */
  scrollable: PropTypes.bool,

  /**
   * 	Puts the focus on the modal when initialized.
   */
  autoFocus: PropTypes.bool,

  /**
   * Set the size of the modal. Options sm, lg, xl for small, large or extra
   * large sized modals, or leave undefined for default size.
   */
  size: PropTypes.string,

  /**
   * The ARIA role attribute.
   */
  role: PropTypes.string,

  /**
   * The ARIA labelledby attribute
   */
  labelledBy: PropTypes.string,

  /**
   * Close the modal when escape key is pressed.
   */
  keyboard: PropTypes.bool,

  /**
   * Includes a modal-backdrop element. Alternatively, specify 'static' for a
   * backdrop which doesn't close the modal on click.
   */
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),

  /**
   * CSS class to apply to the modal.
   */
  modalClassName: PropTypes.string,

  /**
   * CSS class to apply to the backdrop.
   */
  backdropClassName: PropTypes.string,

  /**
   * CSS class to apply to the modal content.
   */
  contentClassName: PropTypes.string,

  /**
   * Set to false for a modal that simply appears rather than fades into view.
   */
  fade: PropTypes.bool,

  /**
   * Set the z-index of the modal. Default 1050.
   */
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Used to allow user interactions in this component to be persisted when
   * the component - or the page - is refreshed. If `persisted` is truthy and
   * hasn't changed from its previous value, a `value` that the user has
   * changed while using the app will keep that change, as long as
   * the new `value` also matches what was given originally.
   * Used in conjunction with `persistence_type`.
   */
  persistence: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * Properties whose user interactions will persist after refreshing the
   * component or the page. Since only `value` is allowed this prop can
   * normally be ignored.
   */
  persisted_props: PropTypes.arrayOf(PropTypes.oneOf(['is_open'])),

  /**
   * Where persisted user changes will be stored:
   * memory: only kept in memory, reset on page refresh.
   * local: window.localStorage, data is kept after the browser quit.
   * session: window.sessionStorage, data is cleared once the browser quit.
   */
  persistence_type: PropTypes.oneOf(['local', 'session', 'memory'])
};

export default Modal;
