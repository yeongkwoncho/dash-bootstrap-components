import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {Collapse as RSCollapse} from 'reactstrap';

/**
 * Hide or show content with a vertical collapsing animation. Visibility of the
 * children is controlled by the `is_open` prop which can be targetted by
 * callbacks.
 */
const Collapse = props => {
  const {children, is_open, loading_state, ...otherProps} = props;
  return (
    <RSCollapse
      isOpen={is_open}
      {...omit(
        ['setProps', 'persistence', 'persistence_type', 'persisted_props'],
        otherProps
      )}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {children}
    </RSCollapse>
  );
};

Collapse.defaultProps = {
  persisted_props: ['is_open'],
  persistence_type: 'local'
};

Collapse.propTypes = {
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
   * HTML tag to use for the collapse contents. Default: div.
   */
  tag: PropTypes.string,

  /**
   * Whether collapse is currently open.
   */
  is_open: PropTypes.bool,

  /**
   * Set to True when using a collapse inside a navbar.
   */
  navbar: PropTypes.bool,

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

export default Collapse;
