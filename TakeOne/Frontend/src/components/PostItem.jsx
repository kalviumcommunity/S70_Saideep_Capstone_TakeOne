import React, { useState } from "react";

const PostItem = ({ post, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(post.text);

  const handleSave = () => {
    onUpdate(post._id, updatedText);
    setIsEditing(false);
  };

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded">
      {isEditing ? (
        <>
          <input
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            className="text-black p-2 rounded w-full"
          />
          <div className="mt-2">
            <button onClick={handleSave} className="bg-green-500 px-3 py-1 rounded mr-2">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-600 px-3 py-1 rounded">
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="font-bold text-white">{post.text}</p>
          <p className="text-gray-400 text-sm">{post.meta}</p>
          <div className="mt-2 space-x-2">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 px-3 py-1 rounded">
              Edit
            </button>
            <button onClick={() => onDelete(post._id)} className="bg-red-500 px-3 py-1 rounded">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostItem;