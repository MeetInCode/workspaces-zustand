# Workspace Manager

> 📝 [View Sample Implementation](sample.tsx)

A modern workspace management application built with React, TypeScript, and Zustand for state management.
![image](https://github.com/user-attachments/assets/b9404141-50d7-401f-a501-d51ae4ee1e0a)


## Features

- Create, edit, and delete workspaces
- Set active workspace
- Responsive layout with sidebar navigation
- Modern UI with shadcn/ui components
- Type-safe state management with Zustand

## Tech Stack

- React
- TypeScript
- Zustand (State Management)
- Tailwind CSS
- shadcn/ui (UI Components)

## Project Structure

```
workspace-manager/
├── src/
│   ├── app/
│   │   └── page.tsx              # Main application page
│   ├── components/
│   │   ├── layout/
│   │   │   └── MainLayout.tsx    # Main layout component
│   │   └── workspace/
│   │       ├── CreateWorkspaceDialog.tsx
│   │       ├── WorkspaceContent.tsx
│   │       └── WorkspaceList.tsx
│   └── store/
│       └── workspaceStore.ts     # Zustand store
```

## State Management with Zustand

The application uses Zustand for state management. Here's how it's implemented:

### Store Definition (`workspaceStore.ts`)

```typescript
interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
}

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspace: string | null;
  addWorkspace: (workspace: Omit<Workspace, "id" | "createdAt">) => void;
  removeWorkspace: (id: string) => void;
  updateWorkspace: (id: string, workspace: Partial<Workspace>) => void;
  setActiveWorkspace: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  activeWorkspace: null,
  addWorkspace: (workspace) =>
    set((state) => ({
      workspaces: [
        ...state.workspaces,
        { ...workspace, id: crypto.randomUUID(), createdAt: new Date() },
      ],
    })),
  removeWorkspace: (id) =>
    set((state) => ({
      workspaces: state.workspaces.filter((w) => w.id !== id),
      activeWorkspace:
        state.activeWorkspace === id ? null : state.activeWorkspace,
    })),
  updateWorkspace: (id, workspace) =>
    set((state) => ({
      workspaces: state.workspaces.map((w) =>
        w.id === id ? { ...w, ...workspace } : w
      ),
    })),
  setActiveWorkspace: (id) => set({ activeWorkspace: id }),
}));
```

### Usage in Components

1. **MainLayout.tsx**

```typescript
const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
const workspaces = useWorkspaceStore((state) => state.workspaces);
```

2. **WorkspaceList.tsx**

```typescript
const { workspaces, activeWorkspace, setActiveWorkspace, removeWorkspace } =
  useWorkspaceStore();
```

3. **WorkspaceContent.tsx**

```typescript
const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace);
const workspaces = useWorkspaceStore((state) => state.workspaces);
```

4. **CreateWorkspaceDialog.tsx**

```typescript
const addWorkspace = useWorkspaceStore((state) => state.addWorkspace);
```

## Key Features of Zustand Implementation

1. **Centralized State Management**

   - All workspace-related state is managed in a single store
   - Clear separation of concerns between state and UI

2. **Selective State Access**

   - Components only subscribe to the specific pieces of state they need
   - Uses selector pattern for efficient state updates

3. **Type Safety**

   - Full TypeScript support
   - Type-safe state and actions

4. **Immutability**

   - State updates are handled immutably
   - Predictable state changes

5. **Actions**
   - Well-defined actions for state modifications
   - Clear API for state updates

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
