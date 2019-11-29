import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {Alert as RSAlert} from 'reactstrap';

/**
 * Alert allows you to create contextual feedback messages on user actions.
 *
 * Control the visibility using callbacks with the `is_open` prop, or set it to
 * auto-dismiss with the `duration` prop.
 */
class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.dismiss = this.dismiss.bind(this);

    this.state = {alertOpen: props.is_open};
  }

  dismiss() {
    if (this.props.setProps) {
      this.props.setProps({is_open: false});
    } else {
      this.setState({alertOpen: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.is_open != this.state.alertOpen) {
      this.setState({alertOpen: nextProps.is_open});
      if (nextProps.is_open && this.props.duration) {
        setTimeout(this.dismiss, this.props.duration);
      }
    }
  }

  componentDidMount() {
    if (this.props.is_open && this.props.duration) {
      setTimeout(this.dismiss, this.props.duration);
    }
  }

  render() {
    const {
      children,
      dismissable,
      is_open,
      loading_state,
      ...otherProps
    } = this.props;
    return (
      <RSAlert
        isOpen={this.state.alertOpen}
        toggle={dismissable && this.dismiss}
        {...omit(
          ['setProps', 'persistence', 'persisted_props', 'persistence_type'],
          otherProps
        )}
        data-dash-is-loading={
          (loading_state && loading_state.is_loading) || undefined
        }
      >
        {children}
      </RSAlert>
    );
  }
}

Alert.defaultProps = {
  is_open: true,
  duration: null,
  persisted_props: ['is_open'],
  persistence_type: 'local'
};

Alert.propTypes = {
  /**
   * The ID of this component, used to identify dash components
   * in callbacks. The ID needs to be unique across all of the
   * components in an app.
   */
  id: PropTypes.string,

  /**
   * The children of this component.
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
   * A unique identifier for the component, used to improve
   * performance by React.js while rendering components
   * See https://reactjs.org/docs/lists-and-keys.html for more info
   */
  key: PropTypes.string,

  /**
   * Alert color, options: primary, secondary, success, info, warning, danger,
   * link. Default: secondary.
   */
  color: PropTypes.string,

  /**
   * Whether alert is open. Default: True.
   */
  is_open: PropTypes.bool,

  /**
   * If True, a fade animation will be applied when `is_open` is toggled. If
   * False the Alert will simply appear and disappear.
   */
  fade: PropTypes.bool,

  /**
   * If true, add a close button that allows Alert to be dismissed.
   */
  dismissable: PropTypes.bool,

  /**
   * Duration in milliseconds after which the Alert dismisses itself.
   */
  duration: PropTypes.number,

  /**
   * Object that holds the loading state object coming from dash-renderer
   */
  loading_state: PropTypes.shape({
    /**
     * Determines if the component is loading or not
     */
    is_loading: PropTypes.bool,
    /**
     * Holds which property is loading
     */
    prop_name: PropTypes.string,
    /**
     * Holds the name of the component that is loading
     */
    component_name: PropTypes.string
  }),

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
   * component or the page. Since only `is_open` is allowed this prop can
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

export default Alert;
