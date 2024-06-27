import React from 'react';

import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import { useEditorReadOnly } from '@udecode/plate-common';

import { Icons, iconVariants } from '@/components/icons';

import { MarkToolbarButton } from './mark-toolbar-button';
import { MoreDropdownMenu } from './more-dropdown-menu';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
import { ToolbarSeparator } from '@/components/plate-ui/toolbar';
import { LinkToolbarButton } from '@/components/plate-ui/link-toolbar-button';
import { ColorDropdownMenu } from '@/components/plate-ui/color-dropdown-menu';
import { MARK_COLOR, MARK_BG_COLOR } from '@udecode/plate-font';

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
            <Icons.bold />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
            <Icons.italic />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_UNDERLINE}
            tooltip="Underline (⌘+U)"
          >
            <Icons.underline />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_STRIKETHROUGH}
            tooltip="Strikethrough (⌘+⇧+M)"
          >
            <Icons.strikethrough />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_CODE} tooltip="Code (⌘+E)">
            <Icons.code />
          </MarkToolbarButton>

          <ToolbarSeparator />
          
          <LinkToolbarButton />
          <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
            <Icons.color
              className={iconVariants({ variant: 'toolbar' })}
              />
          </ColorDropdownMenu>
          <ColorDropdownMenu
            nodeType={MARK_BG_COLOR}
            tooltip="Highlight Color"
            >
            <Icons.bg
              className={iconVariants({ variant: 'toolbar' })}
              />
          </ColorDropdownMenu>
        </>
      )}

      <MoreDropdownMenu />
    </>
  );
}
