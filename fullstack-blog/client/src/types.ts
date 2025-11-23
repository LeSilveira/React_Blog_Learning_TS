export interface User {
    id: number;
    email: string;
    name: string;
    sur_name: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    author_id: number;
    user? : User;
}

export interface reqError {
    message: string;
    error: string;
}

export interface Comment {
    id: number;
    content: string;
    author_id: string;
    post_id: number;
    created_at: string;
    updated_at: string;
    user? : User;
    post? : Post;
}