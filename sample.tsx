// Example usage in a component
import { useWorkspaceStore } from '@/store/workspaceStore'

function WorkspaceDemo() {
  // Get the store's state and actions
  const { 
    workspaces, 
    activeWorkspace, 
    addWorkspace, 
    removeWorkspace, 
    updateWorkspace, 
    setActiveWorkspace 
  } = useWorkspaceStore()

  // Example 1: Initial state
  console.log(workspaces) // []
  console.log(activeWorkspace) // null

  // Example 2: After adding a workspace
  addWorkspace({
    name: "My First Workspace",
    description: "A sample workspace"
  })
  console.log(workspaces) // [
  //   {
  //     id: "123e4567-e89b-12d3-a456-426614174000", // Random UUID
  //     name: "My First Workspace",
  //     description: "A sample workspace",
  //     createdAt: "2024-03-20T12:00:00.000Z" // Current date
  //   }
  // ]

  // Example 3: After setting active workspace
  setActiveWorkspace("123e4567-e89b-12d3-a456-426614174000")
  console.log(activeWorkspace) // "123e4567-e89b-12d3-a456-426614174000"

  // Example 4: After updating a workspace
  updateWorkspace("123e4567-e89b-12d3-a456-426614174000", {
    name: "Updated Workspace Name"
  })
  console.log(workspaces) // [
  //   {
  //     id: "123e4567-e89b-12d3-a456-426614174000",
  //     name: "Updated Workspace Name",
  //     description: "A sample workspace",
  //     createdAt: "2024-03-20T12:00:00.000Z"
  //   }
  // ]

  // Example 5: After removing a workspace
  removeWorkspace("123e4567-e89b-12d3-a456-426614174000")
  console.log(workspaces) // []
  console.log(activeWorkspace) // null

  // Example 5: Printing specific workspace info as a component
  const WorkspaceInfo = ({ workspaceId }) => {
    // This line finds the specific workspace from the workspaces array that matches the given workspaceId.
     // It will return the specific workspace if found, otherwise it will return undefined.
    const specificWorkspace = workspaces.find(workspace => workspace.id === workspaceId);
   
    if (specificWorkspace) {
      return (
        <div>
          <p>Workspace ID: {specificWorkspace.id}</p>
          <p>Workspace Name: {specificWorkspace.name}</p>
          <p>Workspace Description: {specificWorkspace.description}</p>
        </div>
      );
    } else {
      return <p>Workspace not found.</p>;
    }
  };
  }
}