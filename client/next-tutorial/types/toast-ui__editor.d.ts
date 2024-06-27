// src/types/toast-ui__editor.d.ts
declare module "@toast-ui/editor" {
  interface Editor {
    destroy(): void;
  }

  import { EditorOptions } from "@toast-ui/editor/types/editor";

  export class Editor {
    constructor(options: EditorOptions);
    getMarkdown(): string;
    getHTML(): void;
  }
}
