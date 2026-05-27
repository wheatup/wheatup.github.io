"use strict";
(() => {
  // ../src/html.ts
  function sanitizeHtml(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    const blockedTags = /* @__PURE__ */ new Set([
      "BASE",
      "BUTTON",
      "EMBED",
      "FORM",
      "IFRAME",
      "INPUT",
      "LINK",
      "META",
      "OBJECT",
      "SCRIPT",
      "SELECT",
      "STYLE",
      "TEXTAREA"
    ]);
    template.content.querySelectorAll("*").forEach((element) => {
      if (blockedTags.has(element.tagName)) {
        element.remove();
        return;
      }
      Array.from(element.attributes).forEach((attribute) => {
        const name = attribute.name.toLowerCase();
        const value = attribute.value.trim();
        if (name.startsWith("on") || name === "srcdoc") {
          element.removeAttribute(attribute.name);
          return;
        }
        if ((name === "href" || name === "src") && !isAllowedUrl(value)) {
          element.removeAttribute(attribute.name);
        }
      });
    });
    return template.innerHTML;
  }
  function bytesOf(value) {
    return new Blob([value]).size;
  }
  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char] || char);
  }
  function escapeAttribute(value) {
    return escapeHtml(String(value));
  }
  function isAllowedUrl(value) {
    if (!value) return true;
    if (value.startsWith("#")) return true;
    try {
      const url = new URL(value, location.href);
      return ["data:", "http:", "https:", "mailto:", "tel:"].includes(url.protocol);
    } catch {
      return false;
    }
  }

  // ../src/attachments.ts
  async function insertFiles(editor, fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return false;
    for (const file of files) {
      const dataUrl = await readFileAsDataUrl(file);
      if (file.type.startsWith("image/")) {
        insertHtml(editor, `<img src="${escapeAttribute(dataUrl)}" alt="${escapeAttribute(file.name || "Pasted image")}">`);
      } else {
        const label = file.name || "Attachment";
        insertHtml(editor, `<a data-attachment download="${escapeAttribute(label)}" href="${escapeAttribute(dataUrl)}">${escapeHtml(label)}</a>`);
      }
    }
    return true;
  }
  function copyEditorContent(editor) {
    editor.focus();
    const selection = window.getSelection();
    if (!selection) return false;
    const range = document.createRange();
    range.selectNodeContents(editor);
    selection.removeAllRanges();
    selection.addRange(range);
    const copied = document.execCommand("copy");
    selection.removeAllRanges();
    return copied;
  }
  function insertHtml(editor, html) {
    editor.focus();
    document.execCommand("insertHTML", false, html);
  }
  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Could not read file"));
      reader.readAsDataURL(file);
    });
  }

  // ../src/constants.ts
  var MAX_SYNC_BYTES = 95 * 1024;
  var MAX_CHUNK_BYTES = 7 * 1024;
  var SAVE_DELAY_MS = 500;

  // ../src/dom.ts
  function mustGetElement(id) {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Missing #${id}`);
    }
    return element;
  }
  function placeCaretAtEnd(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  // ../src/markdown.ts
  function applyMarkdownShortcutAtSelection(editor) {
    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode;
    if (!selection || !selection.rangeCount || !anchorNode || !editor.contains(anchorNode)) return false;
    const block = currentEditableBlock(anchorNode);
    if (!block) return false;
    const text = block.textContent || "";
    const transform = markdownTransformForLine(text);
    if (!transform) return false;
    replaceBlockWithMarkdownTransform(editor, block, transform);
    return true;
  }
  function markdownTransformForLine(text) {
    const heading = /^(#{1,6})\s+(.+)$/.exec(text);
    if (heading) {
      return {
        kind: "block",
        tagName: `H${heading[1].length}`,
        html: markdownInlineHtml(heading[2])
      };
    }
    const quote = /^>\s+(.+)$/.exec(text);
    if (quote) {
      return {
        kind: "block",
        tagName: "BLOCKQUOTE",
        html: markdownInlineHtml(quote[1])
      };
    }
    const unorderedList = /^[-*+]\s+(.+)$/.exec(text);
    if (unorderedList) {
      return {
        kind: "list",
        tagName: "UL",
        html: markdownInlineHtml(unorderedList[1])
      };
    }
    const orderedList = /^\d+[.)]\s+(.+)$/.exec(text);
    if (orderedList) {
      return {
        kind: "list",
        tagName: "OL",
        html: markdownInlineHtml(orderedList[1])
      };
    }
    if (/^---+$/.test(text.trim())) {
      return { kind: "hr" };
    }
    const inlineHtml = markdownInlineHtml(text);
    if (inlineHtml !== escapeHtml(text)) {
      return {
        kind: "inline",
        html: inlineHtml
      };
    }
    return null;
  }
  function replaceBlockWithMarkdownTransform(editor, block, transform) {
    if (transform.kind === "hr") {
      const fragment = document.createDocumentFragment();
      const hr = document.createElement("hr");
      const next = document.createElement("div");
      next.innerHTML = "<br>";
      fragment.append(hr, next);
      replaceEditableBlock(editor, block, fragment);
      placeCaretAtEnd(next);
      return;
    }
    if (transform.kind === "list") {
      const list = document.createElement(transform.tagName);
      const item = document.createElement("li");
      item.innerHTML = transform.html || "<br>";
      list.append(item);
      replaceEditableBlock(editor, block, list);
      placeCaretAtEnd(item);
      return;
    }
    if (transform.kind === "inline") {
      block.innerHTML = transform.html || "<br>";
      placeCaretAfterInlineTransform(block);
      return;
    }
    const nextBlock = document.createElement(transform.tagName);
    nextBlock.innerHTML = transform.html || "<br>";
    replaceEditableBlock(editor, block, nextBlock);
    placeCaretAtEnd(nextBlock);
  }
  function replaceEditableBlock(editor, block, replacement) {
    if (block === editor) {
      editor.replaceChildren(replacement);
      return;
    }
    block.replaceWith(replacement);
  }
  function currentEditableBlock(node) {
    const base = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    if (!base) return null;
    const blockSelector = "h1,h2,h3,h4,h5,h6,p,div,li,blockquote";
    return base.closest(blockSelector);
  }
  function placeCaretAfterInlineTransform(block) {
    const lastChild = block.lastChild;
    if (!(lastChild instanceof HTMLElement) || lastChild.tagName !== "CODE") {
      placeCaretAtEnd(block);
      return;
    }
    const textNode = document.createTextNode("");
    block.append(textNode);
    const range = document.createRange();
    range.setStart(textNode, 0);
    range.collapse(true);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
  function markdownInlineHtml(text) {
    let html = escapeHtml(text);
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\[([^\]]+)]\((https?:\/\/[^)\s]+|mailto:[^)\s]+|tel:[^)\s]+)\)/g, (_match, label, url) => `<a href="${escapeAttribute(url)}">${label}</a>`);
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    html = html.replace(/(^|[\s(])\*([^*\s][^*]*?)\*/g, "$1<em>$2</em>");
    html = html.replace(/(^|[\s(])_([^_\s][^_]*?)_/g, "$1<em>$2</em>");
    return html;
  }

  // ../src/app.ts
  async function initCopyPasta(storage) {
    const editor = mustGetElement("editor");
    const syncStatus = mustGetElement("syncStatus");
    const quotaStatus = mustGetElement("quotaStatus");
    const clearButton = mustGetElement("clearButton");
    const copyAllButton = mustGetElement("copyAllButton");
    const fileInput = mustGetElement("fileInput");
    const footer = document.querySelector(".footer");
    const storageLabel = document.querySelector("[data-storage-label]");
    let saveTimer = 0;
    let applyingRemoteChange = false;
    let applyingMarkdownShortcut = false;
    let lastSavedHtml = "";
    let lastSavedUpdatedAt = 0;
    wireToolbar();
    wireEditor();
    await loadSyncedContent();
    storage.onChanged(handleStorageChange);
    function wireToolbar() {
      document.querySelectorAll("[data-command]").forEach((button) => {
        button.addEventListener("click", () => {
          editor.focus();
          const command = button.dataset.command;
          if (!command) return;
          if (command === "createLink") {
            const url = prompt("Paste a link URL");
            if (!url) return;
            document.execCommand(command, false, url);
          } else {
            document.execCommand(command, false);
          }
          queueSave();
        });
      });
      clearButton.addEventListener("click", () => {
        if (!editor.innerHTML.trim() || confirm("Clear the synced CopyPasta note?")) {
          editor.innerHTML = "";
          queueSave(0);
        }
      });
      copyAllButton.addEventListener("click", () => {
        const copied = copyEditorContent(editor);
        setStatus(copied ? "Copied" : "Copy failed", !copied);
      });
      fileInput.addEventListener("change", async () => {
        if (await insertFiles(editor, fileInput.files)) {
          queueSave(0);
        }
        fileInput.value = "";
      });
    }
    function wireEditor() {
      editor.addEventListener("input", () => {
        applyMarkdownShortcut();
        queueSave();
      });
      editor.addEventListener("paste", handlePaste);
      editor.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
      editor.addEventListener("drop", async (event) => {
        event.preventDefault();
        if (await insertFiles(editor, event.dataTransfer?.files ?? null)) {
          queueSave(0);
        }
      });
    }
    async function loadSyncedContent() {
      try {
        const synced = await storage.read();
        const html = sanitizeHtml(synced.html);
        applyingRemoteChange = true;
        editor.innerHTML = html;
        applyingRemoteChange = false;
        lastSavedHtml = html;
        lastSavedUpdatedAt = synced.updatedAt;
        setStatus(synced.readyMessage || storage.readyMessage);
        setStorageLabel(synced.footerLabel || storage.footerLabel);
        updateQuota(html);
      } catch (error) {
        setStatus(errorMessage(error), true);
      }
    }
    async function handleStorageChange() {
      if (applyingRemoteChange) return;
      try {
        const synced = await storage.read();
        if (synced.updatedAt && synced.updatedAt <= lastSavedUpdatedAt) return;
        const html = sanitizeHtml(synced.html);
        if (html === editor.innerHTML) return;
        applyingRemoteChange = true;
        editor.innerHTML = html;
        applyingRemoteChange = false;
        lastSavedHtml = html;
        lastSavedUpdatedAt = synced.updatedAt || Date.now();
        setStatus("Updated from another device");
        setStorageLabel(synced.footerLabel || storage.footerLabel);
        updateQuota(html);
      } catch (error) {
        setStatus(errorMessage(error), true);
      }
    }
    function applyMarkdownShortcut() {
      if (applyingMarkdownShortcut) return;
      applyingMarkdownShortcut = true;
      applyMarkdownShortcutAtSelection(editor);
      applyingMarkdownShortcut = false;
    }
    function queueSave(delay = SAVE_DELAY_MS) {
      if (applyingRemoteChange) return;
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        void saveNow();
      }, delay);
    }
    async function saveNow() {
      const html = sanitizeHtml(editor.innerHTML);
      if (html !== editor.innerHTML) {
        editor.innerHTML = html;
      }
      if (html === lastSavedHtml) return;
      const byteCount = bytesOf(html);
      updateQuota(html);
      if (byteCount > MAX_SYNC_BYTES) {
        setStatus("Too large for sync. Remove large images or files.", true);
        return;
      }
      try {
        setStatus("Saving...");
        lastSavedUpdatedAt = await storage.write(html);
        lastSavedHtml = html;
        setStatus("Saved");
      } catch (error) {
        setStatus(errorMessage(error), true);
      }
    }
    async function handlePaste(event) {
      const files = Array.from(event.clipboardData?.files || []);
      if (!files.length) return;
      event.preventDefault();
      if (await insertFiles(editor, files)) {
        queueSave(0);
      }
    }
    function updateQuota(html) {
      const byteCount = bytesOf(html);
      const usedKb = Math.ceil(byteCount / 1024);
      const maxKb = Math.floor(MAX_SYNC_BYTES / 1024);
      quotaStatus.textContent = `${usedKb} KB of ${maxKb} KB synced`;
      footer?.classList.toggle("over-quota", byteCount > MAX_SYNC_BYTES);
    }
    function setStatus(message, isError = false) {
      syncStatus.textContent = message;
      syncStatus.classList.toggle("error", isError);
    }
    function setStorageLabel(label) {
      if (storageLabel) storageLabel.textContent = label;
    }
  }
  function errorMessage(error) {
    return error instanceof Error ? error.message : "Something went wrong";
  }

  // src/web-storage.ts
  var LOCAL_KEY = "copypasta:web-html";
  var LOCAL_META_KEY = "copypasta:web-meta";
  var PAGE_SOURCE = "copypasta:web";
  var EXTENSION_SOURCE = "copypasta:extension";
  var BRIDGE_TIMEOUT_MS = 700;
  function createWebStorage() {
    let mode = "unknown";
    const listeners = /* @__PURE__ */ new Set();
    window.addEventListener("message", (event) => {
      if (event.source !== window || event.data?.source !== EXTENSION_SOURCE) return;
      if (event.data.event === "changed") {
        mode = "extension";
        listeners.forEach((listener) => listener());
      }
    });
    return {
      readyMessage: "Connected to extension sync",
      footerLabel: "Extension sync",
      async read() {
        if (mode !== "local") {
          const bridged = await tryBridgeRead();
          if (bridged) {
            mode = "extension";
            return {
              ...bridged,
              readyMessage: "Connected to extension sync",
              footerLabel: "Extension sync"
            };
          }
        }
        mode = "local";
        return {
          ...readLocal(),
          readyMessage: "Extension not detected. Saved in this browser.",
          footerLabel: "This browser"
        };
      },
      async write(html) {
        if (mode !== "local") {
          const updatedAt = await tryBridgeWrite(html);
          if (updatedAt) {
            mode = "extension";
            return updatedAt;
          }
        }
        mode = "local";
        return writeLocal(html);
      },
      onChanged(listener) {
        listeners.add(listener);
      }
    };
  }
  async function tryBridgeRead() {
    try {
      const result = await requestBridge("read");
      if (isSyncedHtml(result)) return result;
    } catch {
      return null;
    }
    return null;
  }
  async function tryBridgeWrite(html) {
    try {
      const result = await requestBridge("write", html);
      return typeof result === "number" ? result : null;
    } catch {
      return null;
    }
  }
  function requestBridge(action, html) {
    const id = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      const timeout = window.setTimeout(() => {
        window.removeEventListener("message", handleMessage);
        reject(new Error("Extension bridge unavailable"));
      }, BRIDGE_TIMEOUT_MS);
      function handleMessage(event) {
        if (event.source !== window || event.data?.source !== EXTENSION_SOURCE || event.data.id !== id) return;
        window.clearTimeout(timeout);
        window.removeEventListener("message", handleMessage);
        if (event.data.ok) {
          resolve(event.data.result);
        } else {
          reject(new Error(event.data.error || "Extension bridge failed"));
        }
      }
      window.addEventListener("message", handleMessage);
      window.postMessage({
        source: PAGE_SOURCE,
        id,
        action,
        html
      }, window.location.origin);
    });
  }
  function readLocal() {
    const meta = readLocalMeta();
    return {
      html: localStorage.getItem(LOCAL_KEY) || "",
      updatedAt: meta.updatedAt
    };
  }
  function writeLocal(html) {
    const updatedAt = Date.now();
    localStorage.setItem(LOCAL_KEY, html);
    localStorage.setItem(LOCAL_META_KEY, JSON.stringify({ updatedAt }));
    return updatedAt;
  }
  function readLocalMeta() {
    try {
      const meta = JSON.parse(localStorage.getItem(LOCAL_META_KEY) || "{}");
      return { updatedAt: meta.updatedAt || 0 };
    } catch {
      return { updatedAt: 0 };
    }
  }
  function isSyncedHtml(value) {
    if (!value || typeof value !== "object") return false;
    const record = value;
    return typeof record.html === "string" && typeof record.updatedAt === "number";
  }

  // src/main.ts
  void initCopyPasta(createWebStorage());
})();
