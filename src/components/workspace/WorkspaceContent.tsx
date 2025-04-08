'use client'

import { useWorkspaceStore } from '@/store/workspaceStore'
import { Workspace } from '@/store/workspaceStore'
export function WorkspaceContent() {
  const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace)
  const workspaces = useWorkspaceStore((state) => state.workspaces)
  const activeWorkspaceData = workspaces.find((w) => w.id === activeWorkspace)
  if (!activeWorkspaceData) return null

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{activeWorkspaceData.name}</h1>
      {activeWorkspaceData.description && (
        <p className="text-muted-foreground mb-6">
          {activeWorkspaceData.description}
        </p>
      )}
      <p className="text-sm text-muted-foreground mb-6">
        Created on: {activeWorkspaceData.createdAt.toLocaleDateString()}
      </p>
      <div className="rounded-lg border p-4">
        <p>Workspace content goes here</p>
      </div>
    </div>
  )
} 