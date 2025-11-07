export interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    author_id: number;
}

export interface reqError {
    message: string;
    error: string;
}