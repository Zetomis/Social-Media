export interface PostInterface {
    uName: string;
    uPost: string;
    comments: CommentInterface[];
    id: string;
}

export interface CommentInterface {
    uId: string;
    uName: string;
    uComment: string;
}

export interface UserDataInterface {
    uName: string;
    uEmail: string;
    id: string;
    follows: FollowsInterface[];
}

export interface FollowsInterface {
    followerId: string;
}
