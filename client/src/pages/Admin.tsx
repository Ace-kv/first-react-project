import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, DragEndEvent} from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiEdit3 } from 'react-icons/fi'; // Edit icon from react-icons
import Section from 'types/Section.ts';


const Admin = () => {
  const [sections, setSections] = useState<Section[]>([]); 
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null); // Track which section is being edited

  // Fetch sections from the backend
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ui-sections`)
  
        if (!res.ok) {
          throw new Error(`HTTP Error: Status: ${res.status}`)
        }
  
        const data = await res.json()
        setSections(data.sections)

      } catch (error) {
          console.error('Error fetching sections:', error)
      }
    }

    fetchSections()
    
  }, [])

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setSections((currSections) => {
        const oldIndex = currSections.findIndex((section) => section._id === active.id);
        const newIndex = currSections.findIndex((section) => section._id === over.id);

        return arrayMove(currSections, oldIndex, newIndex).map((section, index) => ({
          ...section,
          order: index + 1, // Update order based on new index
        }));
      });
    }
  };

  // Handle toggle visibility
  const handleToggleVisibility = (id: string) => {
    setSections((currSections) =>
      currSections.map((section) =>
        section._id === id ? { ...section, isActive: !section.isActive } : section
      )
    );
  };

  // Handle section content change
  const handleContentChange = (id: string, field: keyof Section['props'], value: string) => {
    setSections((currSections) =>
      currSections.map((section) =>
        section._id === id ? { ...section, props: { ...section.props, [field]: value } } : section
      )
    );
  };

  // Save changes to the backend
  const handleSaveChanges = async () => {
    try {

      await fetch(`${import.meta.env.VITE_API_BASE_URL}/ui-sections`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections }),
      });

      alert('Sections updated successfully!');
    } catch (error) {

      console.error('Error updating sections:', error);
      alert('Failed to update sections.');
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={handleSaveChanges}>Publish Changes</button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((section) => section._id)}> {/* Use _id for unique keys */}
          <div>
            {sections.map((section) => (
              <DraggableItem
                key={section._id}
                id={section._id}
                section={section}
                editingSectionId={editingSectionId}
                setEditingSectionId={setEditingSectionId}
                onToggleVisibility={handleToggleVisibility}
                onContentChange={handleContentChange}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

interface DraggableItemProps {
  id: string;
  section: Section;
  editingSectionId: string | null;
  setEditingSectionId: React.Dispatch<React.SetStateAction<string | null>>;
  onToggleVisibility: (id: string) => void;
  onContentChange: (id: string, field: keyof Section['props'], value: string) => void;
}

// Draggable Item component with edit, toggle functionality, and hover effect for edit icon
const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  section,
  editingSectionId,
  setEditingSectionId,
  onToggleVisibility,
  onContentChange,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 16,
    margin: '0 0 8px 0',
    background: 'lightgrey',
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h2
        style={{
          position: 'relative',
          padding: '4px',
          border: editingSectionId === id ? '1px solid blue' : '1px solid transparent',
        }}
        onClick={() => setEditingSectionId(id)} // On click, enable editing for this section
      >
        {editingSectionId === id ? (
          <input
            type="text"
            value={section.props.title}
            onChange={(e) => onContentChange(id, 'title', e.target.value)}
            placeholder="Edit Title"
            onBlur={() => setEditingSectionId(null)} // Save on blur
          />
        ) : (
          <>
            {section.props.title}
            <FiEdit3
              size={16}
              style={{
                marginLeft: '8px',
                cursor: 'pointer',
                border: '1px solid #ccc',
                padding: '2px',
                borderRadius: '50%',
                position: 'absolute',
                right: '-20px',
                top: '0',
              }}
            />
          </>
        )}
      </h2>
      <label>
        Active:
        <input
          type="checkbox"
          checked={section.isActive}
          onChange={() => onToggleVisibility(id)}
        />
      </label>
      <textarea
        value={section.props.description}
        onChange={(e) => onContentChange(id, 'description', e.target.value)}
        placeholder="Edit Description"
      />
      <input
        type="text"
        value={section.props.buttonText}
        onChange={(e) => onContentChange(id, 'buttonText', e.target.value)}
        placeholder="Edit Button Text"
      />
      <input
        type="text"
        value={section.props.imageUrl}
        onChange={(e) => onContentChange(id, 'imageUrl', e.target.value)}
        placeholder="Edit Image URL"
      />
    </div>
  );
};

export default Admin;
