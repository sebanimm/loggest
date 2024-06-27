import { withProps } from "@udecode/cn";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE,
} from "@udecode/plate-block-quote";
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createCaptionPlugin } from "@udecode/plate-caption";
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX,
} from "@udecode/plate-code-block";
import { createPlugins, PlateElement, PlateLeaf } from "@udecode/plate-common";
import { createDndPlugin } from "@udecode/plate-dnd";
import { createEmojiPlugin, ELEMENT_EMOJI_INPUT } from "@udecode/plate-emoji";
import {
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontSizePlugin,
} from "@udecode/plate-font";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import {
  createHighlightPlugin,
  MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";
import {
  createHorizontalRulePlugin,
  ELEMENT_HR,
} from "@udecode/plate-horizontal-rule";
import { createIndentPlugin } from "@udecode/plate-indent";
import { createIndentListPlugin } from "@udecode/plate-indent-list";
import { createKbdPlugin, MARK_KBD } from "@udecode/plate-kbd";
import {
  createColumnPlugin,
  ELEMENT_COLUMN,
  ELEMENT_COLUMN_GROUP,
} from "@udecode/plate-layout";
import { createLineHeightPlugin } from "@udecode/plate-line-height";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import {
  createListPlugin,
  createTodoListPlugin,
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
} from "@udecode/plate-list";
import {
  createImagePlugin,
  createMediaEmbedPlugin,
  ELEMENT_IMAGE,
  ELEMENT_MEDIA_EMBED,
} from "@udecode/plate-media";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import { createNormalizeTypesPlugin } from "@udecode/plate-normalizers";
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import {
  createDeletePlugin,
  createSelectOnBackspacePlugin,
} from "@udecode/plate-select";
import { createBlockSelectionPlugin } from "@udecode/plate-selection";
import { createTabbablePlugin } from "@udecode/plate-tabbable";
import {
  createTablePlugin,
  ELEMENT_TABLE,
  ELEMENT_TD,
  ELEMENT_TH,
  ELEMENT_TR,
} from "@udecode/plate-table";
import { createTogglePlugin, ELEMENT_TOGGLE } from "@udecode/plate-toggle";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";

import { BlockquoteElement } from "@/components/plate-ui/blockquote-element";
import { Prism } from "@/components/plate-ui/code-block-combobox";
import { CodeBlockElement } from "@/components/plate-ui/code-block-element";
import { CodeLeaf } from "@/components/plate-ui/code-leaf";
import { CodeLineElement } from "@/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@/components/plate-ui/code-syntax-leaf";
import { ColumnElement } from "@/components/plate-ui/column-element";
import { ColumnGroupElement } from "@/components/plate-ui/column-group-element";
import { EmojiInputElement } from "@/components/plate-ui/emoji-input-element";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { HrElement } from "@/components/plate-ui/hr-element";
import { ImageElement } from "@/components/plate-ui/image-element";
import { ImagePreview } from "@/components/plate-ui/image-preview";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { LinkElement } from "@/components/plate-ui/link-element";
import { ListElement } from "@/components/plate-ui/list-element";
import { MediaEmbedElement } from "@/components/plate-ui/media-embed-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import { withPlaceholders } from "@/components/plate-ui/placeholder";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/components/plate-ui/table-cell-element";
import { TableElement } from "@/components/plate-ui/table-element";
import { TableRowElement } from "@/components/plate-ui/table-row-element";
import { TodoListElement } from "@/components/plate-ui/todo-list-element";
import { ToggleElement } from "@/components/plate-ui/toggle-element";
import { withDraggables } from "@/components/plate-ui/with-draggables";
import { autoformatPlugin } from "@/lib/plate/autoformatPlugin";
import { captionPlugin } from "@/lib/plate/captionPlugin";
import { dragOverCursorPlugin } from "@/lib/plate/dragOverCursorPlugin";
import { exitBreakPlugin } from "@/lib/plate/exitBreakPlugin";
import { indentListPlugin } from "@/lib/plate/indentListPlugin";
import { indentPlugin } from "@/lib/plate/indentPlugin";
import { lineHeightPlugin } from "@/lib/plate/lineHeightPlugin";
import { linkPlugin } from "@/lib/plate/linkPlugin";
import { resetBlockTypePlugin } from "@/lib/plate/resetBlockTypePlugin";
import { selectOnBackspacePlugin } from "@/lib/plate/selectOnBackspacePlugin";
import { softBreakPlugin } from "@/lib/plate/softBreakPlugin";
import { tabbablePlugin } from "@/lib/plate/tabbablePlugin";
import { trailingBlockPlugin } from "@/lib/plate/trailingBlockPlugin";

export const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin({
      options: {
        prism: Prism,
      },
    }),
    createHorizontalRulePlugin(),
    createLinkPlugin({ ...linkPlugin }),
    createListPlugin(),
    createImagePlugin({ renderAfterEditable: ImagePreview }),
    createTogglePlugin(),
    createColumnPlugin(),
    createMediaEmbedPlugin(),
    createCaptionPlugin({ ...captionPlugin }),
    createTablePlugin(),
    createTodoListPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createIndentPlugin({ ...indentPlugin }),
    createIndentListPlugin({ ...indentListPlugin }),
    createLineHeightPlugin({ ...lineHeightPlugin }),
    createAutoformatPlugin({ ...autoformatPlugin }),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createDndPlugin({ options: { enableScroller: true } }),
    createEmojiPlugin(),
    createExitBreakPlugin({ ...exitBreakPlugin }),
    createNodeIdPlugin(),
    createNormalizeTypesPlugin(),
    createResetNodePlugin({ ...resetBlockTypePlugin }),
    createSelectOnBackspacePlugin({ ...selectOnBackspacePlugin }),
    createDeletePlugin(),
    createSoftBreakPlugin({ ...softBreakPlugin }),
    createTabbablePlugin({ ...tabbablePlugin }),
    createTrailingBlockPlugin({ ...trailingBlockPlugin }),
    { ...dragOverCursorPlugin },
  ],
  {
    components: withDraggables(
      withPlaceholders({
        [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
        [ELEMENT_CODE_BLOCK]: CodeBlockElement,
        [ELEMENT_CODE_LINE]: CodeLineElement,
        [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
        [ELEMENT_COLUMN]: ColumnElement,
        [ELEMENT_COLUMN_GROUP]: ColumnGroupElement,
        [ELEMENT_EMOJI_INPUT]: EmojiInputElement,
        [ELEMENT_H1]: withProps(HeadingElement, { variant: "h1" }),
        [ELEMENT_H2]: withProps(HeadingElement, { variant: "h2" }),
        [ELEMENT_H3]: withProps(HeadingElement, { variant: "h3" }),
        [ELEMENT_H4]: withProps(HeadingElement, { variant: "h4" }),
        [ELEMENT_H5]: withProps(HeadingElement, { variant: "h5" }),
        [ELEMENT_H6]: withProps(HeadingElement, { variant: "h6" }),
        [ELEMENT_HR]: HrElement,
        [ELEMENT_IMAGE]: ImageElement,
        [ELEMENT_LI]: withProps(PlateElement, { as: "li" }),
        [ELEMENT_LINK]: LinkElement,
        [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
        [ELEMENT_OL]: withProps(ListElement, { variant: "ol" }),
        [ELEMENT_PARAGRAPH]: ParagraphElement,
        [ELEMENT_TABLE]: TableElement,
        [ELEMENT_TD]: TableCellElement,
        [ELEMENT_TH]: TableCellHeaderElement,
        [ELEMENT_TODO_LI]: TodoListElement,
        [ELEMENT_TOGGLE]: ToggleElement,
        [ELEMENT_TR]: TableRowElement,
        [ELEMENT_UL]: withProps(ListElement, { variant: "ul" }),
        [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
        [MARK_CODE]: CodeLeaf,
        [MARK_HIGHLIGHT]: HighlightLeaf,
        [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
        [MARK_KBD]: KbdLeaf,
        [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: "s" }),
        [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
        [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
        [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
      }),
    ),
  },
);
