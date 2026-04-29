export type FormAnswers = Record<string, string>;

export interface SelectOption {
  label: string;
  value: string;
}

export interface QuestionDef {
  id: string;
  label: string;
  helperKey?: string;
  options: SelectOption[];
  placeholder?: string;
  inputType: "buttons" | "dropdown";
}
