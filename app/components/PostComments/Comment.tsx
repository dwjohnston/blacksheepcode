import React from 'react'
const Comment = React.forwardRef<HTMLDivElement>((props, commentBox) => {
  return <div ref={commentBox} className="comments" />
});
export default Comment;
