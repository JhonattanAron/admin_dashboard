/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState, useEffect, forwardRef, useRef } from "react";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  Strikethrough,
  SeparatorHorizontal,
  Table,
  Underline,
  ArrowUp,
  ArrowDown,
  CornerDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  ModalFooter,
} from "./modal";

export interface RichTextEditorProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onValueChange?: (value: string) => void;
}

const RichTextEditor = forwardRef<HTMLTextAreaElement, RichTextEditorProps>(
  ({ value, onChange, onValueChange, className, ...props }, ref) => {
    const [content, setContent] = useState((value as string) || "");
    const [htmlContent, setHtmlContent] = useState("");
    const [activeTab, setActiveTab] = useState("preview");
    const [tableRows, setTableRows] = useState(2);
    const [tableCols, setTableCols] = useState(2);
    const [tableData, setTableData] = useState<string[][]>([
      ["Encabezado 1", "Encabezado 2"],
      ["Dato 1", "Dato 2"],
    ]);
    const [openTableModal, setOpenTableModal] = useState(false);

    // Track cursor position
    const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Combine refs
    const handleTextareaRef = (textarea: HTMLTextAreaElement | null) => {
      textareaRef.current = textarea;
      if (typeof ref === "function") {
        ref(textarea);
      } else if (ref) {
        ref.current = textarea;
      }
    };

    // Update internal state when value prop changes
    useEffect(() => {
      if (value !== undefined) {
        setContent(value as string);
      }
    }, [value]);

    // Convert markdown-like syntax to HTML for preview
    useEffect(() => {
      let html = content;

      // Convert bold: **text** to <strong>text</strong>
      html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      // Convert italic: _text_ to <em>text</em>
      html = html.replace(/_(.*?)_/g, "<em>$1</em>");

      // Convert strikethrough: ~~text~~ to <s>text</s>
      html = html.replace(/~~(.*?)~~/g, "<s>$1</s>");

      // Convert underline: __text__ to <u>text</u>
      html = html.replace(/__(.*?)__/g, "<u>$1</u>");

      // Convert superscript: ^text^ to <sup>text</sup>
      html = html.replace(/\^(.*?)\^/g, "<sup>$1</sup>");

      // Convert subscript: ~text~ to <sub>text</sub>
      html = html.replace(/~(.*?)~/g, "<sub>$1</sub>");

      // Convert lists: - item to <ul><li>item</li></ul>
      html = html.replace(/^- (.*?)$/gm, "<ul><li>$1</li></ul>");

      // Convert alignment: ::left::text to <div style="text-align: left;">text</div>
      html = html.replace(
        /::left::(.*?)$/gm,
        '<div style="text-align: left;">$1</div>'
      );
      html = html.replace(
        /::center::(.*?)$/gm,
        '<div style="text-align: center;">$1</div>'
      );
      html = html.replace(
        /::right::(.*?)$/gm,
        '<div style="text-align: right;">$1</div>'
      );
      html = html.replace(
        /::justify::(.*?)$/gm,
        '<div style="text-align: justify;">$1</div>'
      );

      // Convert line break: \n to <br />
      html = html.replace(/\\n/g, "<br />");

      // Convert horizontal rule: --- to <hr />
      html = html.replace(/^---$/gm, "<hr />");

      // Convert table syntax: ||| to HTML table
      const tableRegex = /\|\|\|([\s\S]*?)\|\|\|/g;
      html = html.replace(tableRegex, (match, tableContent) => {
        // Return the table content as is, since it's already HTML
        return tableContent;
      });

      setHtmlContent(html);
    }, [content]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setContent(newValue);

      // Save cursor position
      setCursorPosition({
        start: e.target.selectionStart,
        end: e.target.selectionEnd,
      });

      // Call the original onChange if provided
      if (onChange) {
        onChange(e);
      }

      // Call onValueChange with the new value
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    // Track cursor position on selection change
    const handleSelectionChange = () => {
      if (textareaRef.current) {
        setCursorPosition({
          start: textareaRef.current.selectionStart,
          end: textareaRef.current.selectionEnd,
        });
      }
    };

    const insertText = (text: string) => {
      if (!textareaRef.current) return;

      const textarea = textareaRef.current;
      const { start, end } = cursorPosition;

      // Get text before and after cursor
      const beforeText = content.substring(0, start);
      const afterText = content.substring(end);

      // Create new content with inserted text
      const newContent = beforeText + text + afterText;
      setContent(newContent);

      // Calculate new cursor position after insertion
      const newPosition = start + text.length;

      // Update cursor position state
      setCursorPosition({
        start: newPosition,
        end: newPosition,
      });

      // Set focus back to textarea and restore cursor position
      setTimeout(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(newPosition, newPosition);
        }
      }, 0);

      // Simulate an onChange event
      const event = {
        target: { value: newContent },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      if (onChange) {
        onChange(event);
      }

      if (onValueChange) {
        onValueChange(newContent);
      }
    };

    const handleBold = () => insertText("**texto en negrita**");
    const handleItalic = () => insertText("_texto en cursiva_");
    const handleStrikethrough = () => insertText("~~texto tachado~~");
    const handleList = () => insertText("\n- elemento de lista");
    const handleAlignLeft = () =>
      insertText("\n::left::texto alineado a la izquierda");
    const handleAlignCenter = () => insertText("\n::center::texto centrado");
    const handleAlignRight = () =>
      insertText("\n::right::texto alineado a la derecha");
    const handleAlignJustify = () =>
      insertText("\n::justify::texto justificado");
    const handleDivider = () => insertText("\n---\n");
    const handleUnderline = () => insertText("__texto subrayado__");
    const handleSuperscript = () => insertText("^texto superíndice^");
    const handleSubscript = () => insertText("~texto subíndice~");
    const handleLineBreak = () => insertText("\\n");

    const handleTableChange = (
      rowIndex: number,
      colIndex: number,
      value: string
    ) => {
      const newData = [...tableData];
      newData[rowIndex][colIndex] = value;
      setTableData(newData);
    };

    const handleAddRow = () => {
      const newRow = Array(tableCols).fill("");
      setTableData([...tableData, newRow]);
      setTableRows(tableRows + 1);
    };

    const handleAddColumn = () => {
      const newData = tableData.map((row) => [...row, ""]);
      setTableData(newData);
      setTableCols(tableCols + 1);
    };

    const handleInsertTable = () => {
      // Generate HTML table
      let tableHtml = '<table class="w-full border-collapse my-4">\n';

      // Add table rows
      tableData.forEach((row, rowIndex) => {
        tableHtml += '  <tr class="border-b">\n';

        // Add cells
        row.forEach((cell, cellIndex) => {
          if (rowIndex === 0) {
            // Header row
            tableHtml += `    <th class="p-2 text-left font-medium">${cell}</th>\n`;
          } else {
            tableHtml += `    <td class="p-2">${cell}</td>\n`;
          }
        });

        tableHtml += "  </tr>\n";
      });

      tableHtml += "</table>";

      // Insert table HTML at cursor position
      insertText("\n|||\n" + tableHtml + "\n|||\n");
      setOpenTableModal(false);
    };

    const resetTableData = () => {
      setTableRows(2);
      setTableCols(2);
      setTableData([
        ["Encabezado 1", "Encabezado 2"],
        ["Dato 1", "Dato 2"],
      ]);
    };

    return (
      <div className="border rounded-md">
        <div className="flex items-center p-2 border-b bg-gray-50 flex-wrap">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleBold}
            className="h-8 w-8"
            title="Negrita"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleItalic}
            className="h-8 w-8"
            title="Cursiva"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleStrikethrough}
            className="h-8 w-8"
            title="Tachado"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleUnderline}
            className="h-8 w-8"
            title="Subrayado"
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleSuperscript}
            className="h-8 w-8"
            title="Superíndice"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleSubscript}
            className="h-8 w-8"
            title="Subíndice"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <div className="border-l h-6 mx-1"></div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleAlignLeft}
            className="h-8 w-8"
            title="Alinear a la izquierda"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleAlignCenter}
            className="h-8 w-8"
            title="Centrar"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleAlignRight}
            className="h-8 w-8"
            title="Alinear a la derecha"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleAlignJustify}
            className="h-8 w-8"
            title="Justificar"
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
          <div className="border-l h-6 mx-1"></div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleList}
            className="h-8 w-8"
            title="Lista"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleLineBreak}
            className="h-8 w-8"
            title="Salto de línea"
          >
            <CornerDownRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDivider}
            className="h-8 w-8"
            title="Divisor"
          >
            <SeparatorHorizontal className="h-4 w-4" />
          </Button>

          <Modal
            open={openTableModal}
            onOpenChange={(open) => {
              setOpenTableModal(open);
              if (open) resetTableData();
            }}
          >
            <ModalTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Insertar tabla"
              >
                <Table className="h-4 w-4" />
              </Button>
            </ModalTrigger>
            <ModalContent className="sm:max-w-[600px]">
              <ModalHeader>
                <ModalTitle>Insertar tabla</ModalTitle>
              </ModalHeader>
              <div className="py-4">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    type="button"
                    onClick={handleAddRow}
                    variant="outline"
                    size="sm"
                  >
                    Añadir fila
                  </Button>
                  <Button
                    type="button"
                    onClick={handleAddColumn}
                    variant="outline"
                    size="sm"
                  >
                    Añadir columna
                  </Button>
                </div>

                <div className="border rounded-md overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b">
                          {row.map((cell, colIndex) => (
                            <td key={colIndex} className="p-2">
                              <Input
                                value={cell}
                                onChange={(e) =>
                                  handleTableChange(
                                    rowIndex,
                                    colIndex,
                                    e.target.value
                                  )
                                }
                                placeholder={
                                  rowIndex === 0 ? "Encabezado" : "Celda"
                                }
                                className={rowIndex === 0 ? "font-medium" : ""}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <ModalFooter className="mt-4">
                  <Button type="button" onClick={handleInsertTable}>
                    Insertar tabla
                  </Button>
                </ModalFooter>
              </div>
            </ModalContent>
          </Modal>
        </div>

        <textarea
          ref={handleTextareaRef}
          className="w-full p-3 min-h-[250px] outline-none resize-none font-mono text-sm"
          value={content}
          onChange={handleContentChange}
          onSelect={handleSelectionChange}
          onClick={handleSelectionChange}
          onKeyUp={handleSelectionChange}
          {...props}
        />

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="preview"
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </TabsTrigger>
            <TabsTrigger value="jsx" onClick={() => setActiveTab("jsx")}>
              JSX Output
            </TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="p-4 min-h-[100px] border-t">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </TabsContent>
          <TabsContent value="jsx" className="p-4 min-h-[100px] border-t">
            <pre className="text-sm">{htmlContent}</pre>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
