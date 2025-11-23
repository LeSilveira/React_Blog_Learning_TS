import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentUserId } from '../store/authSlice';
import { Comment } from '../types';

interface CommentSectionProps {
  post_id: number;
}

function CommentSection({ post_id }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  
  const token = useSelector(selectCurrentToken);
  const currentUserId = useSelector(selectCurrentUserId);

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/comments?postId=${post_id}`);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert('Please login to comment');
    if (!newComment.trim()) return;

    try {
      const res = await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          content: newComment, 
          post_id: post_id
        })
      });

      if (res.ok) {
        setNewComment('');
        fetchComments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      const res = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        fetchComments(); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid #ccccccff', paddingTop: '1rem' }}>
      <h3>Comments</h3>

      {token ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            style={{ width: '100%', padding: '0.5rem' }}
            rows={3}
            required
          />
          <button type="submit" style={{ marginTop: '0.5rem' }}>
            Post Comment
          </button>
        </form>
      ) : (
        <p><i>Please log in to write a comment.</i></p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {comments.map((comment) => (
          <div key={comment.id} style={{ background: '#f9f9f907', padding: '1rem', borderRadius: '5px' }}>
            <p style={{ margin: '0 0 0.5rem 0' }}>{comment.content}</p>
            <small style={{ color: '#666' }}>
              By: {comment.user?.email || 'Unknown'}
            </small>

            {currentUserId === comment.user?.id ? (
              <button 
                onClick={() => handleDelete(comment.id)}
                style={{ marginLeft: '1rem', color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Delete
              </button>
            ) : null}
          </div>
        ))}
        {comments.length === 0 ? <p>No comments yet.</p> : null}
      </div>
    </div>
  );
}

export default CommentSection;