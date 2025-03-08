import React, { useState, useRef, useEffect } from "react";

const RichTextEditor = ({ onChange, value }) => {
  const [content, setContent] = useState(value);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);

  useEffect(() => {
    setContent(value);
  }, [value]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0 && selection.toString().trim() !== "") {
        const range = selection.getRangeAt(0);
        if (
          editorRef.current &&
          editorRef.current.contains(range.commonAncestorContainer)
        ) {
          const rect = range.getBoundingClientRect();
          const editorRect = editorRef.current.getBoundingClientRect();

          // Position the toolbar above the selection
          setToolbarPosition({
            top:
              rect.top -
              editorRect.top -
              (toolbarRef.current ? toolbarRef.current.offsetHeight + 5 : 40),
            left:
              rect.left +
              rect.width / 2 -
              editorRect.left -
              (toolbarRef.current ? toolbarRef.current.offsetWidth / 2 : 100),
          });
          setShowToolbar(true);
        }
      } else {
        setShowToolbar(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mouseup", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("mouseup", handleSelectionChange);
    };
  }, []);

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleBold = () => handleCommand("bold");
  const handleItalic = () => handleCommand("italic");
  const handleUnderline = () => handleCommand("underline");
  const handleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      handleCommand("createLink", url);
    }
  };

  // Styles
  const styles = {
    container: {
      position: "relative",
      width: "100%",
      maxWidth: "700px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      margin: "20px auto",
    },
    editor: {
      padding: "16px",
      minHeight: "200px",
      outline: "none",
      fontSize: "16px",
      lineHeight: "1.5",
    },
    toolbar: {
      position: "absolute",
      display: "flex",
      alignItems: "center",
      padding: "4px",
      borderRadius: "4px",
      backgroundColor: "#374151",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      zIndex: 10,
      transition: "opacity 0.2s ease",
    },
    button: {
      padding: "6px 8px",
      margin: "0 2px",
      backgroundColor: "transparent",
      border: "none",
      borderRadius: "4px",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    footer: {
      padding: "8px 16px",
      borderTop: "1px solid #d1d5db",
      backgroundColor: "#f9fafb",
      fontSize: "12px",
      color: "#6b7280",
      borderBottomLeftRadius: "5px",
      borderBottomRightRadius: "5px",
    },
  };

  // Conditionally apply positioning to toolbar
  const toolbarStyles = {
    ...styles.toolbar,
    top: `${toolbarPosition.top}px`,
    left: `${toolbarPosition.left}px`,
    opacity: showToolbar ? 1 : 0,
    pointerEvents: showToolbar ? "auto" : "none",
  };

  return (
    <div style={styles.container}>
      {/* Floating toolbar */}
      <div ref={toolbarRef} style={toolbarStyles}>
        <button onClick={handleBold} style={styles.button} title="Bold">
          <strong>B</strong>
        </button>
        <button onClick={handleItalic} style={styles.button} title="Italic">
          <em>I</em>
        </button>
        <button
          onClick={handleUnderline}
          style={styles.button}
          title="Underline"
        >
          <u>U</u>
        </button>
        <button onClick={handleLink} style={styles.button} title="Link">
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            ></path>
          </svg>
        </button>
      </div>

      {/* Editor area */}
      <div
        ref={editorRef}
        style={styles.editor}
        contentEditable="true"
        onInput={(e) => {
          onChange(e.currentTarget.innerHTML);
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div style={styles.footer}>Select text to format it</div>
    </div>
  );
};

export default RichTextEditor;
