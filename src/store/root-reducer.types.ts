// found it on https://stackoverflow.com/questions/59768923/combinereducers-doesnt-infer-type
type BaseReducerMap<S> = {
  [K in keyof S]: (state: S[K], action: any) => S
}

export type InferRootState<ReducerMap extends BaseReducerMap<S>, S = any> = {
  [K in keyof ReducerMap]: ReturnType<ReducerMap[K]>
}
