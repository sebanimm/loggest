"use client";

import { Plate, type TElement } from "@udecode/plate-common";
import { useAtomValue } from "jotai";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { editAtom } from "@/atoms";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { plugins } from "@/lib/plugins";

interface PlateEditorProps {
  value?: TElement[];
}

export function PlateEditor({ value }: PlateEditorProps) {
  const isEditing = useAtomValue(editAtom);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate readOnly={!isEditing} value={value} plugins={plugins}>
        {isEditing && (
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>
        )}

        <Editor className="border-none px-6" focusRing={false} />

        {isEditing && (
          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
        )}
      </Plate>
    </DndProvider>
  );
}
