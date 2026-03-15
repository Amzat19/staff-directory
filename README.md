# Staff Directory

A modern, responsive staff directory web application built with Next.js 14, TypeScript, and Tailwind CSS. Features employee management, grade level organization, and persistent local storage.

## Features

- **Employee Management**: Create, read, update, and delete employee records
- **Grade Levels**: Organize employees into customizable grade levels (LVL1, LVL2, etc.)
- **Advanced Filtering**: Search by name, role, or department; filter by grade level
- **Location Data**: Real country and state data fetched from DataHub API
- **Persistent Storage**: All data saved to localStorage automatically
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, accessible interface with smooth animations

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Avatars**: [DiceBear API](https://www.dicebear.com/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/staff-directory.git
   cd staff-directory

   # Staff Directory
   ```

A modern, responsive staff directory web application built with Next.js 14, TypeScript, and Tailwind CSS. Features employee management, grade level organization, and persistent local storage.

![Staff Directory Screenshot](./screenshot.png)

## Features

- **Employee Management**: Create, read, update, and delete employee records
- **Grade Levels**: Organize employees into customizable grade levels (LVL1, LVL2, etc.)
- **Advanced Filtering**: Search by name, role, or department; filter by grade level
- **Location Data**: Real country and state data fetched from DataHub API
- **Persistent Storage**: All data saved to localStorage automatically
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, accessible interface with smooth animations

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Avatars**: [DiceBear API](https://www.dicebear.com/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/staff-directory.git
cd staff-directory
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open http://localhost:3000 in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

src/
├── app/ # Next.js App Router
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── components/ # React components
│ ├── employees/ # Employee-related components
│ │ ├── EmployeeCard.tsx
│ │ ├── EmployeeFilters.tsx
│ │ ├── EmployeeGrid.tsx
│ │ └── EmployeeTab.tsx
│ ├── grades/ # Grade level components
│ │ ├── GradeCard.tsx
│ │ ├── GradeList.tsx
│ │ └── GradeTab.tsx
│ ├── modals/ # Modal dialogs
│ │ ├── EmployeeModal.tsx
│ │ └── GradeModal.tsx
│ ├── staff-directory/ # Main container
│ │ └── StaffDirectory.tsx
│ └── ui/ # Shared UI components
│ ├── Header.tsx
│ └── LoadingSpinner.tsx
├── hooks/ # Custom React hooks
│ ├── useCities.ts # Fetch location data
│ └── useLocalStorage.ts # Persist state
├── lib/ # Utilities & constants
│ ├── constants.ts
│ └── utils.ts
└── types/ # TypeScript types
└── index.ts

## Architecture Decisions

### Component Architecture

- Single Responsibility: Each component handles one specific task
- Composition: Complex UIs built from smaller, reusable pieces
- Separation of Concerns: Logic (hooks) separated from presentation (components)

### State Management

- Local Storage Hook: Custom useLocalStorage hook for data persistence
- No External State Library: React's built-in useState and useContext sufficient for this scale
- Functional Updates: All state updates use functional form to prevent stale closures

### Data Fetching

- Client-side Fetching: Cities API fetched on mount using custom hook
- Loading States: Proper loading indicators while data loads
- Error Handling: Graceful fallbacks for failed requests

### Performance Optimizations

- useMemo for expensive filtering operations
- useCallback for stable function references
- Component-level code splitting ready

## API Reference

### External APIs

| Endpoint | Purpose | Data |
| :------- | :-----: | ---: |

| https://pkgstore.datahub.io/core/world-
cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-
cities_json.json | Location Data | Countries, states, cities |

## Data Models

```bash
interface Employee {
  id: string;
  name: string;
  country: string;
  state: string;
  address: string;
  role: string;
  department: string;
  gradeLevelId: string | null;
  avatar?: string;
}

interface GradeLevel {
  id: string;
  name: string;
  description?: string;
}
```

## Features in Detail

### Employee Management

- Create: Add new employees with full details
- Read: View employee profiles with avatar, location, and grade
- Update: Edit any employee information
- Delete: Remove employees with confirmation

### Grade Levels

- Create: Add custom grade levels (e.g., "LVL1", "Senior", "Manager")
- Assign: Link employees to grades
- Filter: View employees by specific grade
- Delete: Remove grades (unassigns affected employees)

### Search & Filter

- Real-time search across name, role, and department
- Grade level filtering with "Unassigned" option
- Combined search + filter capabilities

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Built with ❤️ using Next.js and Tailwind CSS
