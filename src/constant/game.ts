export enum GameStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    PLAYING = 'playing',
    CANCELLED = 'cancelled',
    LOBBY = 'lobby',
    FINISHED = 'finished',
}


export enum Channels {
    ON_PROGRESS = 'on_Progress',
    ON_END_MATCH = 'on_endMatch',
    ON_MATCH = 'on_Match',
    ON_REQUEST_JOIN = 'on_requestJoin',
    ON_ACCEPT_JOIN = 'on_acceptJoin',
    ON_MESSAGE = 'on_message',
    ON_REJECT_JOIN = 'on_rejectJoin',
    ON_DISCONNECT = 'on_disconnect',
    ON_CONNECT = 'on_connects',
    ON_CREATE = 'on_create',
    ON_WATCH = 'on_watch',
    ON_LEAVE = 'on_leave',
}


export enum UserChannels {
    ON_USER_FREIND_REQUEST = 'on_user_freind_request',
    ON_USER_FREIND_ACCEPT = 'on_user_freind_accept',
    ON_USER_FREIND_REJECT = 'on_user_freind_reject',
    ON_USER_CHALLENGE = 'on_user_challenge',
    ON_USER_ACCEPT_CHALLENGE = 'on_user_accept_challenge',
    ON_USER_REJECT_CHALLENGE = 'on_user_reject_challenge',
}




