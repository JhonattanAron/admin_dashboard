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
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  onValueChange?: (value: string) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement> & { htmlValue: string }
  ) => void;
}

const RichTextEditor = forwardRef<HTMLTextAreaElement, RichTextEditorProps>(
  ({ value, onChange, onValueChange, className, ...props }, ref) => {
    // Internal markdown content for editing
    const [markdownContent, setMarkdownContent] = useState("");
    // HTML content for preview and external value
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

    // Convert HTML to our markdown format when value prop changes
    useEffect(() => {
      if (value !== undefined && typeof value === "string") {
        // Only update if the HTML value is different from our current HTML content
        if (value !== htmlContent) {
          // For simplicity, we'll just use the HTML directly in the editor
          // This means we won't have the markdown syntax, but the HTML will be preserved
          setMarkdownContent(value);
          setHtmlContent(value);
        }
      }
    }, [value, htmlContent]);

    // Convert markdown-like syntax to HTML
    const convertMarkdownToHtml = (markdown: string): string => {
      let html = markdown;

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

      return html;
    };

    // Update HTML content when markdown content changes
    useEffect(() => {
      const html = convertMarkdownToHtml(markdownContent);
      setHtmlContent(html);
    }, [markdownContent]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newMarkdownValue = e.target.value;
      setMarkdownContent(newMarkdownValue);

      // Save cursor position
      setCursorPosition({
        start: e.target.selectionStart,
        end: e.target.selectionEnd,
      });

      // Convert to HTML for external value
      const newHtmlValue = convertMarkdownToHtml(newMarkdownValue);

      // Call the original onChange if provided
      if (onChange) {
        const enhancedEvent = {
          ...e,
          htmlValue: newHtmlValue,
        };
        onChange(enhancedEvent);
      }

      // Call onValueChange with the HTML value
      if (onValueChange) {
        onValueChange(newHtmlValue);
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
      const beforeText = markdownContent.substring(0, start);
      const afterText = markdownContent.substring(end);

      // Create new content with inserted text
      const newMarkdownContent = beforeText + text + afterText;
      setMarkdownContent(newMarkdownContent);

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

      // Convert to HTML for external value
      const newHtmlValue = convertMarkdownToHtml(newMarkdownContent);

      // Simulate an onChange event
      const event = {
        target: { value: newMarkdownContent },
        htmlValue: newHtmlValue,
      } as React.ChangeEvent<HTMLTextAreaElement> & { htmlValue: string };

      if (onChange) {
        onChange(event);
      }

      if (onValueChange) {
        onValueChange(newHtmlValue);
      }
    };

    // Insert HTML directly
    const insertHtml = (html: string) => {
      if (!textareaRef.current) return;

      const textarea = textareaRef.current;
      const { start, end } = cursorPosition;

      // Get text before and after cursor
      const beforeText = markdownContent.substring(0, start);
      const afterText = markdownContent.substring(end);

      // Create new content with inserted HTML
      const newMarkdownContent = beforeText + html + afterText;
      setMarkdownContent(newMarkdownContent);

      // Calculate new cursor position after insertion
      const newPosition = start + html.length;

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

      // For HTML insertion, the markdown and HTML are the same
      const newHtmlValue = convertMarkdownToHtml(newMarkdownContent);

      // Simulate an onChange event
      const event = {
        target: { value: newMarkdownContent },
        htmlValue: newHtmlValue,
      } as React.ChangeEvent<HTMLTextAreaElement> & { htmlValue: string };

      if (onChange) {
        onChange(event);
      }

      if (onValueChange) {
        onValueChange(newHtmlValue);
      }
    };

    const handleBold = () => insertHtml("<strong>texto en negrita</strong>");
    const handleItalic = () => insertHtml("<em>texto en cursiva</em>");
    const handleStrikethrough = () => insertHtml("<s>texto tachado</s>");
    const handleList = () =>
      insertHtml("\n<ul><li>elemento de lista</li></ul>");
    const handleAlignLeft = () =>
      insertHtml(
        '\n<div style="text-align: left;">texto alineado a la izquierda</div>'
      );
    const handleAlignCenter = () =>
      insertHtml('\n<div style="text-align: center;">texto centrado</div>');
    const handleAlignRight = () =>
      insertHtml(
        '\n<div style="text-align: right;">texto alineado a la derecha</div>'
      );
    const handleAlignJustify = () =>
      insertHtml('\n<div style="text-align: justify;">texto justificado</div>');
    const handleDivider = () => insertHtml("\n<hr />\n");
    const handleUnderline = () => insertHtml("<u>texto subrayado</u>");
    const handleSuperscript = () => insertHtml("<sup>texto superíndice</sup>");
    const handleSubscript = () => insertHtml("<sub>texto subíndice</sub>");
    const handleLineBreak = () => insertHtml("<br />");

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

      // Insert table HTML directly
      insertHtml(tableHtml);
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
          value={markdownContent}
          onChange={handleContentChange}
          onSelect={handleSelectionChange}
          onClick={handleSelectionChange}
          onKeyUp={handleSelectionChange}
          {...props}
        />

        <div className="p-4 min-h-[100px] border-t">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
