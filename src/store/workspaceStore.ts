import { create } from "zustand";

// Define the shape of a single workspace
export interface Workspace {
  id: string; // Unique identifier for each workspace
  name: string; // Workspace name (required)
  description?: string; // Optional description
  createdAt: Date; // When the workspace was created
}

// Define the shape of our store's state and actions
interface WorkspaceState {
  // State properties
  workspaces: Workspace[]; // Array of all workspaces
  activeWorkspace: string | null; // ID of currently selected workspace

  // Action methods
  addWorkspace: (workspace: Omit<Workspace, "id" | "createdAt">) => void; // Create new workspace
  removeWorkspace: (id: string) => void; // Delete a workspace
  updateWorkspace: (id: string, workspace: Partial<Workspace>) => void; // Update workspace details
  setActiveWorkspace: (id: string) => void; // Switch active workspace
}

// Create the Zustand store with initial state and actions
export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  // Initial state
  workspaces: [], // Start with empty workspaces array
  activeWorkspace: null, // No workspace selected initially

  // Action implementations
  addWorkspace: (workspace) =>
    set((state) => ({
      workspaces: [
        ...state.workspaces, // Spread existing workspaces
        {
          ...workspace, // Spread new workspace data
          id: crypto.randomUUID(), // Generate unique ID
          createdAt: new Date(), // Set creation timestamp
        },
      ],
    })),

  removeWorkspace: (id) =>
    set((state) => ({
      workspaces: state.workspaces.filter((w) => w.id !== id), // Remove workspace by ID
      activeWorkspace:
        state.activeWorkspace === id ? null : state.activeWorkspace, // Clear active if deleted
    })),

  updateWorkspace: (id, workspace) =>
    set((state) => ({
      workspaces: state.workspaces.map(
        (w) => (w.id === id ? { ...w, ...workspace } : w) // Update matching workspace
      ),
    })),

  setActiveWorkspace: (id) => set({ activeWorkspace: id }), // Set new active workspace
}));
