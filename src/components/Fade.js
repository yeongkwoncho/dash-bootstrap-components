import React from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {Fade as RSFade} from 'reactstrap';

/**
 * Hide or show content with a fading animation. Visibility of the children is
 * controlled by the `is_open` prop which can be targetted by callbacks.
 */
const Fade = props => {
  const {
    children,
    base_class,
    base_class_active,
    is_in,
    loading_state,
    ...otherProps
  } = props;
  return (
    <RSFade
      baseClass={base_class}
      baseClassActive={base_class_active}
      in={is_in}
      {...omit(
        ['setProps', 'persistence', 'persistence_type', 'persisted_props'],
        otherProps
      )}
      data-dash-is-loading={
        (loading_state && loading_state.is_loading) || undefined
      }
    >
      {children}
    </RSFade>
  );
};

Fade.defaultProps = {
  persisted_props: ['is_in'],
  persistence_type: 'local'
};

Fade.propTypes = {
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
   * A unique identifier for the component, used to improve
   * performance by React.js while rendering components
   * See https://reactjs.org/docs/lists-and-keys.html for more info
   */
  key: PropTypes.string,

  /**
   * Controls whether the children of the Fade component are currently visible
   * or not.
   */
  is_in: PropTypes.bool,

  /**
   * The duration of the transition, in milliseconds.
   *
   * You may specify a single timeout for all transitions like: `timeout=500`
   * or individually like: timeout={'enter': 300, 'exit': 500}
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({enter: PropTypes.number, exit: PropTypes.number})
      .isRequired
  ]),

  /**
   * Show fade-in animation on initial page load. Default: True.
   */
  appear: PropTypes.bool,

  /**
   * Enable or disable enter transitions. Default: True.
   */
  enter: PropTypes.bool,

  /**
   * Enable or disable exit transitions. Default: True.
   */
  exit: PropTypes.bool,

  /**
   * HTML tag to use for the fade component. Default: div.
   */
  tag: PropTypes.string,

  /**
   * CSS base class. Note that this class is always used, whether the
   * components are showing or hidden. Default: 'fade'
   */
  base_class: PropTypes.string,

  /**
   * CSS class used when the fade contents are displayed. Default: 'show'.
   */
  base_class_active: PropTypes.string,

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
  persisted_props: PropTypes.arrayOf(PropTypes.oneOf(['is_in'])),

  /**
   * Where persisted user changes will be stored:
   * memory: only kept in memory, reset on page refresh.
   * local: window.localStorage, data is kept after the browser quit.
   * session: window.sessionStorage, data is cleared once the browser quit.
   */
  persistence_type: PropTypes.oneOf(['local', 'session', 'memory'])
};

export default Fade;
