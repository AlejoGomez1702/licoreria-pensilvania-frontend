export interface Button {
    nombre: string;
    action?: () => any;
    type: 'primary' | 'secondary'
}