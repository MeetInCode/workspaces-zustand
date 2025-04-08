'use client'

import { useWorkspaceStore } from '@/store/workspaceStore'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Trash2, Edit2 } from 'lucide-react'

export function WorkspaceList() {
  // Access the workspace store using the Zustand hook
  const {
    // Get the list of all workspaces from the store state
    workspaces,
    // Get the ID of the currently active workspace from the store state
    activeWorkspace,
    // Get the function to set the active workspace in the store
    setActiveWorkspace,
    // Get the function to remove a workspace from the store
    removeWorkspace,
  } = useWorkspaceStore()

  return (
    <div className="space-y-2">
      {workspaces.map((workspace) => (
        <div
          key={workspace.id}
          className={`flex items-center justify-between p-2 rounded-lg ${
            // Highlight the active workspace based on the store state
            activeWorkspace === workspace.id
              ? 'bg-primary/10'
              : 'hover:bg-muted'
          }`}
        >
          <button
            className="flex-1 text-left"
            // Set the clicked workspace as active using the store action
            onClick={() => setActiveWorkspace(workspace.id)}
          >
            <div className="font-medium">{workspace.name}</div>
            {workspace.description && (
              <div className="text-sm text-muted-foreground">
                {workspace.description}
              </div>
            )}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                // Remove the workspace using the store action
                onClick={() => removeWorkspace(workspace.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
} 