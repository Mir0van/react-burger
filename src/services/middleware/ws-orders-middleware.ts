import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { refreshToken } from "../../utils/burger-api";

export type TWsActionsTypes<S, R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<S>;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
}

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <S, R>(wsActions: TWsActionsTypes<S, R>, withTokenRefresh: boolean = false): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      sendMessage,
      onClose,
      onError,
      onMessage,
      onOpen,
      onConnecting
    } = wsActions;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;
      // console.log(action, 'action')
      // console.log(connect.match(action), 'connect.match(action)')

      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        onConnecting && dispatch(onConnecting());
        url = action.payload;
        isConnected = true;


        socket.onopen = () => {
          dispatch(onOpen());
        }

        socket.onerror = () => {
          dispatch(onError('Error ws connection'));
        }

        socket.onclose = () => {
          dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        }

        socket.onmessage = (event) => {
          const { data } = event;

          try {
            const parsedData = JSON.parse(data);

            if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
              refreshToken()
                .then(refreshData => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    "token",
                    refreshData.accessToken.replace("Bearer ", "")
                  );
                  dispatch(connect(wssUrl.toString()));
                })
                .catch(err => {
                  dispatch(onError((err as Error).message))
                })

              dispatch(disconnect());

              return;
            }

            dispatch(onMessage(parsedData));
          } catch (error) {
            dispatch(onError((error as Error).message));
          }
        }
      }

      if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (error) {
          dispatch(onError((error as Error).message));
        }
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        isConnected = false;
        socket.close();
        socket = null;
      }

      next(action);
    }
  }
};