export interface Task {
    id: string,
    name: string,
    description: string,
    deadline: string,
    priority: 'Hoch' | 'Mittel' | 'Niedrig'
}