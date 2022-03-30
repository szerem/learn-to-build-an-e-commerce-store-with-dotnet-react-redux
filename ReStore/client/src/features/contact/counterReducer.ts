export interface CounterState {
  data: number;
  title: string;
}

const initialState: CounterState = {
  data: 42,
  title: 'ContactPage'
};

export default function CounterReducer(state = initialState, action: any) {
    return state;
}
