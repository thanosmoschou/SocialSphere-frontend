// src/lib/websocket.ts
import SockJS from "sockjs-client";
import { Client, over } from "stompjs";
import { Message } from "../types/types";

let stompClient: Client | null = null;

export const connectWebSocket = (
  message: Message,
  onMessageReceived: (message: Message) => void
) => {
  const socket = new SockJS(`http://localhost:8080/ws-chat?username=${message.receiver}`);
  stompClient = over(socket);

  stompClient.connect({}, () => {
    console.log("🔗 WebSocket connected");

    stompClient?.subscribe("/topic/messages", (msg) => {
      const message = JSON.parse(msg.body);
      onMessageReceived(message);
    });
  });
};

export const sendMessage = (message: Message) => {
  if (stompClient?.connected) {
    stompClient.send("/app/chat", {}, JSON.stringify(message));
  }
};
