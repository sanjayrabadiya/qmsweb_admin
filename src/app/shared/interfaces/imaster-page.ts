export interface IMasterPage {
  initGrid(): void;
  initForm(): void;
  onEdit(id: number): void;
  onSave(): void;
  onReset(): void;
}
