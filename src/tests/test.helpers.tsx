import React, { FunctionComponent } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import { StoreBuilder } from '../helpers/store';
import { storeSpy } from 'expect-redux';
import reducer, { GlobalState } from '../helpers/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../helpers/sagas';
import { StoreWithSpy } from 'expect-redux/dist/storeSpy';

const sagaMiddleware = createSagaMiddleware();

const storeForTest = new StoreBuilder<GlobalState>()
.addMiddleware(sagaMiddleware)
.addEnhancer(storeSpy)
.build(reducer) as StoreWithSpy<any, any>;

sagaMiddleware.run(rootSaga);

const customRender = (ui: JSX.Element, {
    store = storeForTest,
    ...renderOptions
  } = {}) => {
    const Wrapper: FunctionComponent = ({children}: {children?: React.ReactNode}): JSX.Element => <Provider store={store}>{children}</Provider>;

    return render(ui, {
        wrapper: Wrapper,
        ...renderOptions
    });
}

export {
  customRender as render,
  storeForTest
};