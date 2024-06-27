"use client";

import { Plate } from "@udecode/plate-common";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { plugins } from "@/lib/plugins";

const defaultValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Hello, World!" }],
  },
];

export function PlateEditor() {
  const [initialValue, setInitialValue] = React.useState(defaultValue);

  React.useEffect(() => {
    const savedContent = localStorage.getItem("content");
    if (savedContent) {
      setInitialValue(JSON.parse(savedContent));
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        key={JSON.stringify(initialValue)}
        onChange={(value) => {
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }}
        plugins={plugins}
        initialValue={initialValue}
      >
        <FixedToolbar>
          <FixedToolbarButtons />
        </FixedToolbar>

        <Editor className="min-h-[70vh] border-none px-6" focusRing={false} />

        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      </Plate>
    </DndProvider>
  );
}
