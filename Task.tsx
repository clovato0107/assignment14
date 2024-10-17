import React, { useState } from 'react';

interface TaskProps {
  id: number;
  text: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, text, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);

  const handleUpdate = () => {
    onUpdate(id, updatedText);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <span>{text}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;
