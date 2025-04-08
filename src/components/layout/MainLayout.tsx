'use client'

// Importing necessary components and hooks
import { CreateWorkspaceDialog } from '@/components/workspace/CreateWorkspaceDialog'
import { WorkspaceList } from '@/components/workspace/WorkspaceList'
// Zustand is a lightweight state management solution that uses hooks
// useWorkspaceStore is a custom hook created using Zustand to manage workspace state
import { useWorkspaceStore } from '@/store/workspaceStore'

// MainLayout is a component that takes children as a prop
// The children prop is a special prop in React that allows components to pass JSX elements
// to their child components. It's used for component composition.
export function MainLayout({ children }: { children: React.ReactNode }) {
  // Using Zustand's selector pattern to get specific pieces of state
  // This is more efficient than getting the entire state object
  const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace)
  const workspaces = useWorkspaceStore((state) => state.workspaces)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r p-4">
        <div className="mb-4">
          <CreateWorkspaceDialog />
        </div>
        <WorkspaceList />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {activeWorkspace ? (
          // The children prop is rendered here when there's an active workspace
          // This allows parent components to inject their content into this layout
          children
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">No Workspace Selected</h2>
              <p className="text-muted-foreground">
                {workspaces.length === 0
                  ? 'Create your first workspace to get started'
                  : 'Select a workspace from the sidebar'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 