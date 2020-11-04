import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, AnyAction, Middleware, StoreEnhancer, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer, { GlobalState } from './reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export class StoreBuilder<S extends {} = {}, A extends AnyAction = AnyAction> {
    private middlewares: Middleware[] = [];
    private enhancers: StoreEnhancer[] = [];

    addMiddleware(middleware: Middleware) {
		this.middlewares.push(middleware);

		return this;
	}

	addEnhancer(enhancer: StoreEnhancer) {
		this.enhancers.push(enhancer);

		return this;
    }

    build(reducers: Reducer<S>): Store<S, A> {
		const enhancers = composeWithDevTools(applyMiddleware(...this.middlewares), ...this.enhancers);

		return createStore<S, A, any, any>(reducers, enhancers);
	}
}

const store = new StoreBuilder<GlobalState>()
                .addMiddleware(sagaMiddleware)
                .build(reducer);

 sagaMiddleware.run(rootSaga);

 export default store;