import { IContentState, setContent } from "./contentSlice";
import { put, take, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { onValue, ref } from "firebase/database";
import { database } from "../../firebase/firebase";

function* syncContent() {
  const channel = eventChannel<IContentState>((emitter) => {
    const listener = onValue(ref(database, "data"), (snapshot) => {
      const data = snapshot.val();
      emitter(data);
    });
    return listener;
  });
  while (true) {
    const data: IContentState = yield take(channel);
    yield put(setContent(data));
  }
}

function* contentSaga() {
  yield takeEvery("content/getContent", syncContent);
}

export default contentSaga;
