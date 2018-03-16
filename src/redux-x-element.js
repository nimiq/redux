import { bindActionCreators } from '/libraries/redux/src/index.js';

/** Connects an XElement to the redux store.
 *  @param {Store} store - The redux store to connect to.
 *  @param {(state) => Object} filterState - Defines which parts of the state should be
 *          mapped to which property of the XElement.
 *  @param {Object} actions - Contains all redux actions to be used in the XElement.
 */
export default function reduxify(store, filterState, actions = {}) {
  return (Element) => {
    return class extends Element {
      onCreate() {
        if (super.onCreate) {
          super.onCreate();
        }

        this.actions = bindActionCreators(actions, store.dispatch);

        store.subscribe(() => {
          const properties = filterState(store.getState());

          this.setProperties(properties);
        });
      }
    };
  };
}
