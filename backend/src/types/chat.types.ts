
export interface UserContext {
  id: string; 
  name: string;
  role: string; 
  avatarUrl: string;
}


export interface WebSocketMessage {
  type: 'MESSAGE' | 'TYPING' | 'MARK_AS_READ';
  payload: any;
}


export interface MessagePayload {
  text: string;
}