import React, { useEffect, useRef, useState } from "react";

const MAX_SYNC_BYTES = 95 * 1024;
const GOOGLE_SYNC_BYTES = 1024 * 1024 * 1024;
const SAVE_DELAY_MS = 500;
const LOCAL_KEY = "copypasta:react-html";
const LOCAL_META_KEY = "copypasta:react-meta";
const GOOGLE_AUTH_KEY = "copypasta:google-auth";
const PAGE_SOURCE = "copypasta:web";
const EXTENSION_SOURCE = "copypasta:extension";
const DEFAULT_BRIDGE_TIMEOUT_MS = 700;
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/drive.appdata"
].join(" ");
const GOOGLE_NOTE_FILENAME = "copypasta-note.json";
const GOOGLE_SCRIPT_URL = "https://accounts.google.com/gsi/client";
const DRIVE_FILES_URL = "https://www.googleapis.com/drive/v3/files";
const DRIVE_UPLOAD_URL = "https://www.googleapis.com/upload/drive/v3/files";
const USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";

export default function CopyPasta({
  className = "",
  bridgeTimeoutMs = DEFAULT_BRIDGE_TIMEOUT_MS,
  localKey = LOCAL_KEY,
  localMetaKey = LOCAL_META_KEY,
  googleClientId = "133784472430-qbls7751u3pjcs8tm196ssgrk8o1ba8b.apps.googleusercontent.com"
}) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const saveTimerRef = useRef(0);
  const applyingRemoteChangeRef = useRef(false);
  const applyingMarkdownShortcutRef = useRef(false);
  const lastSavedHtmlRef = useRef("");
  const lastSavedUpdatedAtRef = useRef(0);
  const modeRef = useRef("unknown");
  const bridgeTimeoutRef = useRef(bridgeTimeoutMs);
  const localKeyRef = useRef(localKey);
  const localMetaKeyRef = useRef(localMetaKey);
  const googleClientIdRef = useRef(googleClientId);
  const googleTokenRef = useRef("");
  const googleFileIdRef = useRef("");
  const maxSyncBytesRef = useRef(MAX_SYNC_BYTES);

  const [syncStatus, setSyncStatus] = useState("Loading synced note...");
  const [isError, setIsError] = useState(false);
  const [quotaText, setQuotaText] = useState("0 KB synced");
  const [overQuota, setOverQuota] = useState(false);
  const [storageLabel, setStorageLabel] = useState("Extension sync");
  const [user, setUser] = useState(null);

  useEffect(() => {
    bridgeTimeoutRef.current = bridgeTimeoutMs;
  }, [bridgeTimeoutMs]);

  useEffect(() => {
    localKeyRef.current = localKey;
    localMetaKeyRef.current = localMetaKey;
  }, [localKey, localMetaKey]);

  useEffect(() => {
    googleClientIdRef.current = googleClientId;
  }, [googleClientId]);

  useEffect(() => {
    let disposed = false;

    const handleBridgeChanged = (event) => {
      if (event.source !== window || event.data?.source !== EXTENSION_SOURCE) return;
      if (event.data.event !== "changed") return;
      modeRef.current = "extension";
      void loadRemoteChange();
    };

    window.addEventListener("message", handleBridgeChanged);
    const googlePoll = window.setInterval(() => {
      if (googleTokenRef.current) void loadRemoteChange();
    }, 5000);
    void loadInitialContent();

    return () => {
      disposed = true;
      window.clearTimeout(saveTimerRef.current);
      window.clearInterval(googlePoll);
      window.removeEventListener("message", handleBridgeChanged);
    };

    async function loadInitialContent() {
      try {
        restoreGoogleSession();
        const synced = await readSyncedHtml();
        if (disposed) return;
        applySyncedHtml(synced);
        showStatus(synced.readyMessage);
        setStorageLabel(synced.footerLabel);
      } catch (error) {
        if (!disposed) showStatus(errorMessage(error), true);
      }
    }

    async function loadRemoteChange() {
      if (applyingRemoteChangeRef.current) return;

      try {
        const synced = await readSyncedHtml();
        setMaxSyncBytes(synced.maxBytes);
        if (synced.updatedAt && synced.updatedAt <= lastSavedUpdatedAtRef.current) return;

        const html = sanitizeHtml(synced.html);
        const editor = editorRef.current;
        if (!editor || html === editor.innerHTML) return;

        applyingRemoteChangeRef.current = true;
        editor.innerHTML = html;
        applyingRemoteChangeRef.current = false;
        lastSavedHtmlRef.current = html;
        lastSavedUpdatedAtRef.current = synced.updatedAt || Date.now();
        showStatus("Updated from another device");
        setStorageLabel(synced.footerLabel);
        updateQuota(html);
      } catch (error) {
        showStatus(errorMessage(error), true);
      }
    }
  }, []);

  function applySyncedHtml(synced) {
    const editor = editorRef.current;
    if (!editor) return;

    const html = sanitizeHtml(synced.html);
    applyingRemoteChangeRef.current = true;
    editor.innerHTML = html;
    applyingRemoteChangeRef.current = false;
    lastSavedHtmlRef.current = html;
    lastSavedUpdatedAtRef.current = synced.updatedAt;
    setMaxSyncBytes(synced.maxBytes);
    updateQuota(html);
  }

  async function readSyncedHtml() {
    if (googleTokenRef.current) {
      modeRef.current = "google";
      return {
        ...await readGoogleDriveNote(),
        maxBytes: GOOGLE_SYNC_BYTES,
        readyMessage: "Synced with Google account",
        footerLabel: "Google Drive"
      };
    }

    if (modeRef.current !== "local") {
      const bridged = await tryBridgeRead();
      if (bridged) {
        modeRef.current = "extension";
        return {
          ...bridged,
          maxBytes: bridged.maxBytes || MAX_SYNC_BYTES,
          readyMessage: "Connected to extension sync",
          footerLabel: "Extension sync"
        };
      }
    }

    modeRef.current = "local";
    return {
      ...readLocal(),
      maxBytes: MAX_SYNC_BYTES,
      readyMessage: "Extension not detected. Saved in this browser.",
      footerLabel: "This browser"
    };
  }

  async function writeSyncedHtml(html) {
    if (googleTokenRef.current) {
      modeRef.current = "google";
      setStorageLabel("Google Drive");
      return writeGoogleDriveNote(html);
    }

    if (modeRef.current !== "local") {
      const updatedAt = await tryBridgeWrite(html);
      if (updatedAt) {
        modeRef.current = "extension";
        setStorageLabel("Extension sync");
        return updatedAt;
      }
    }

    modeRef.current = "local";
    setStorageLabel("This browser");
    return writeLocal(html);
  }

  async function requestGoogleAccessToken() {
    if (!googleClientIdRef.current) {
      throw new Error("Google OAuth client id is not configured");
    }

    await loadGoogleIdentityServices();

    return new Promise((resolve, reject) => {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: googleClientIdRef.current,
        scope: GOOGLE_SCOPES,
        prompt: "consent select_account",
        callback: (response) => {
          if (response?.access_token) {
            resolve({
              token: response.access_token,
              expiresAt: Date.now() + Math.max(0, Number(response.expires_in || 3600) - 60) * 1000
            });
          } else {
            reject(new Error(response?.error_description || response?.error || "Google sign-in failed"));
          }
        },
        error_callback: () => {
          reject(new Error("Google sign-in failed"));
        }
      });

      tokenClient.requestAccessToken();
    });
  }

  async function readGoogleUser() {
    const response = await fetch(USERINFO_URL, {
      headers: googleAuthHeaders()
    });

    if (!response.ok) throw new Error(await googleApiError(response, "Could not read Google profile"));

    const profile = await response.json();
    return {
      name: profile.name || profile.email || "Google account",
      email: profile.email || "",
      picture: profile.picture || ""
    };
  }

  async function readGoogleDriveNote() {
    const file = await findGoogleDriveNote();
    if (!file) return { html: "", updatedAt: 0, maxBytes: GOOGLE_SYNC_BYTES };

    const response = await fetch(`${DRIVE_FILES_URL}/${encodeURIComponent(file.id)}?alt=media`, {
      headers: googleAuthHeaders()
    });

    if (!response.ok) throw new Error(await googleApiError(response, "Could not read Google sync"));

    const note = await response.json();
    return {
      html: typeof note.html === "string" ? note.html : "",
      updatedAt: typeof note.updatedAt === "number" ? note.updatedAt : modifiedTimeMs(file.modifiedTime),
      maxBytes: GOOGLE_SYNC_BYTES
    };
  }

  async function writeGoogleDriveNote(html) {
    const updatedAt = Date.now();
    const body = JSON.stringify({ html, updatedAt });
    const file = await findGoogleDriveNote();

    if (file) {
      const response = await fetch(`${DRIVE_UPLOAD_URL}/${encodeURIComponent(file.id)}?uploadType=media`, {
        method: "PATCH",
        headers: {
          ...googleAuthHeaders(),
          "Content-Type": "application/json"
        },
        body
      });

      if (!response.ok) throw new Error(await googleApiError(response, "Could not save Google sync"));
      return updatedAt;
    }

    const boundary = `copypasta-${crypto.randomUUID()}`;
    const response = await fetch(`${DRIVE_UPLOAD_URL}?uploadType=multipart&fields=id`, {
      method: "POST",
      headers: {
        ...googleAuthHeaders(),
        "Content-Type": `multipart/related; boundary=${boundary}`
      },
      body: [
        `--${boundary}`,
        "Content-Type: application/json; charset=UTF-8",
        "",
        JSON.stringify({
          name: GOOGLE_NOTE_FILENAME,
          parents: ["appDataFolder"]
        }),
        `--${boundary}`,
        "Content-Type: application/json; charset=UTF-8",
        "",
        body,
        `--${boundary}--`
      ].join("\r\n")
    });

    if (!response.ok) throw new Error(await googleApiError(response, "Could not create Google sync"));

    const created = await response.json();
    googleFileIdRef.current = created.id || "";
    return updatedAt;
  }

  async function findGoogleDriveNote() {
    if (googleFileIdRef.current) return { id: googleFileIdRef.current };

    const params = new URLSearchParams({
      spaces: "appDataFolder",
      fields: "files(id,modifiedTime)",
      pageSize: "1",
      q: `name='${GOOGLE_NOTE_FILENAME.replace(/'/g, "\\'")}' and trashed=false`
    });
    const response = await fetch(`${DRIVE_FILES_URL}?${params.toString()}`, {
      headers: googleAuthHeaders()
    });

    if (!response.ok) throw new Error(await googleApiError(response, "Could not find Google sync"));

    const result = await response.json();
    const file = result.files?.[0] || null;
    googleFileIdRef.current = file?.id || "";
    return file;
  }

  function googleAuthHeaders() {
    if (!googleTokenRef.current) throw new Error("Sign in with Google to sync this note");
    return { Authorization: `Bearer ${googleTokenRef.current}` };
  }

  async function tryBridgeRead() {
    try {
      const result = await requestBridge("read");
      return isSyncedHtml(result) ? result : null;
    } catch {
      return null;
    }
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
      }, bridgeTimeoutRef.current);

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
      html: localStorage.getItem(localKeyRef.current) || "",
      updatedAt: meta.updatedAt
    };
  }

  function writeLocal(html) {
    const updatedAt = Date.now();
    localStorage.setItem(localKeyRef.current, html);
    localStorage.setItem(localMetaKeyRef.current, JSON.stringify({ updatedAt }));
    return updatedAt;
  }

  function readLocalMeta() {
    try {
      const meta = JSON.parse(localStorage.getItem(localMetaKeyRef.current) || "{}");
      return { updatedAt: meta.updatedAt || 0 };
    } catch {
      return { updatedAt: 0 };
    }
  }

  function showStatus(message, error = false) {
    setSyncStatus(message);
    setIsError(error);
  }

  function restoreGoogleSession() {
    const session = readStoredGoogleSession(googleClientIdRef.current);
    if (!session) return;

    googleTokenRef.current = session.token;
    setUser(session.user);
    modeRef.current = "google";
  }

  async function toggleGoogleLogin() {
    try {
      if (googleTokenRef.current) {
        googleTokenRef.current = "";
        googleFileIdRef.current = "";
        clearStoredGoogleSession();
        setUser(null);
        modeRef.current = "unknown";
        showStatus("Signed out. Using available browser sync.");
        const synced = await readSyncedHtml();
        applySyncedHtml(synced);
        showStatus(synced.readyMessage);
        setStorageLabel(synced.footerLabel);
        return;
      }

      showStatus("Signing in...");
      const auth = await requestGoogleAccessToken();
      googleTokenRef.current = auth.token;
      const profile = await readGoogleUser();
      writeStoredGoogleSession({
        token: auth.token,
        expiresAt: auth.expiresAt,
        clientId: googleClientIdRef.current,
        user: profile
      });
      setUser(profile);
      const synced = await readSyncedHtml();
      setMaxSyncBytes(synced.maxBytes);
      const currentHtml = sanitizeHtml(editorRef.current?.innerHTML || "");
      if (!synced.html && currentHtml.trim()) {
        lastSavedUpdatedAtRef.current = await writeSyncedHtml(currentHtml);
        lastSavedHtmlRef.current = currentHtml;
        updateQuota(currentHtml);
        showStatus("Saved to Google account");
      } else {
        applySyncedHtml(synced);
        showStatus(synced.readyMessage);
      }
      setStorageLabel(synced.footerLabel);
    } catch (error) {
      showStatus(errorMessage(error), true);
    }
  }

  function updateQuota(html) {
    const byteCount = bytesOf(html);
    setQuotaText(`${formatBytes(byteCount, true)} of ${formatBytes(maxSyncBytesRef.current)} synced`);
    setOverQuota(byteCount > maxSyncBytesRef.current);
  }

  function setMaxSyncBytes(value) {
    maxSyncBytesRef.current = value || (googleTokenRef.current ? GOOGLE_SYNC_BYTES : MAX_SYNC_BYTES);
  }

  function queueSave(delay = SAVE_DELAY_MS) {
    if (applyingRemoteChangeRef.current) return;
    window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => {
      void saveNow();
    }, delay);
  }

  async function saveNow() {
    const editor = editorRef.current;
    if (!editor) return;

    const html = sanitizeHtml(editor.innerHTML);
    if (html !== editor.innerHTML) {
      editor.innerHTML = html;
    }
    if (html === lastSavedHtmlRef.current) return;

    const byteCount = bytesOf(html);
    updateQuota(html);
    if (byteCount > maxSyncBytesRef.current) {
      showStatus("Too large for sync. Remove large images or files.", true);
      return;
    }

    try {
      showStatus("Saving...");
      lastSavedUpdatedAtRef.current = await writeSyncedHtml(html);
      lastSavedHtmlRef.current = html;
      showStatus("Saved");
    } catch (error) {
      showStatus(errorMessage(error), true);
    }
  }

  function handleCommand(command) {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();
    if (command === "createLink") {
      const url = window.prompt("Paste a link URL");
      if (!url) return;
      document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false);
    }
    queueSave();
  }

  function handleInput() {
    applyMarkdownShortcut();
    queueSave();
  }

  function handleEditorClick(event) {
    const link = event.target?.closest?.("a[data-attachment]");
    const editor = editorRef.current;
    if (!link || !editor?.contains(link)) return;

    event.preventDefault();
    downloadAttachmentLink(link);
  }

  async function handlePaste(event) {
    const files = Array.from(event.clipboardData?.files || []);
    if (!files.length) return;

    event.preventDefault();
    if (await insertFiles(files)) {
      queueSave(0);
    }
  }

  async function handleDrop(event) {
    event.preventDefault();
    if (await insertFiles(event.dataTransfer?.files || null)) {
      queueSave(0);
    }
  }

  async function handleFileChange(event) {
    if (await insertFiles(event.target.files)) {
      queueSave(0);
    }
    event.target.value = "";
  }

  async function insertFiles(fileList) {
    const editor = editorRef.current;
    const files = Array.from(fileList || []);
    if (!editor || !files.length) return false;

    for (const file of files) {
      const dataUrl = await readFileAsDataUrl(file);
      if (file.type.startsWith("image/")) {
        insertHtml(`<img src="${escapeAttribute(dataUrl)}" alt="${escapeAttribute(file.name || "Pasted image")}">`);
      } else {
        const label = file.name || "Attachment";
        insertHtml(`<a data-attachment download="${escapeAttribute(label)}" href="${escapeAttribute(dataUrl)}">${escapeHtml(label)}</a>`);
      }
    }

    return true;
  }

  function insertHtml(html) {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand("insertHTML", false, html);
  }

  function copyAll() {
    const editor = editorRef.current;
    if (!editor) return;

    editor.focus();
    const selection = window.getSelection();
    if (!selection) {
      showStatus("Copy failed", true);
      return;
    }

    const range = document.createRange();
    range.selectNodeContents(editor);
    selection.removeAllRanges();
    selection.addRange(range);
    const copied = document.execCommand("copy");
    selection.removeAllRanges();
    showStatus(copied ? "Copied" : "Copy failed", !copied);
  }

  function clearEditor() {
    const editor = editorRef.current;
    if (!editor) return;

    if (!editor.innerHTML.trim() || window.confirm("Clear the synced CopyPasta note?")) {
      editor.innerHTML = "";
      queueSave(0);
    }
  }

  function applyMarkdownShortcut() {
    const editor = editorRef.current;
    if (!editor || applyingMarkdownShortcutRef.current) return;

    applyingMarkdownShortcutRef.current = true;
    applyMarkdownShortcutAtSelection(editor);
    applyingMarkdownShortcutRef.current = false;
  }

  const rootClassName = ["copypasta", className].filter(Boolean).join(" ");
  const statusClassName = ["copypasta__sync-status", isError ? "is-error" : ""].filter(Boolean).join(" ");
  const footerClassName = ["copypasta__footer", overQuota ? "is-over-quota" : ""].filter(Boolean).join(" ");
  const userButtonClassName = ["copypasta__icon-button", "copypasta__user-button", user ? "is-signed-in" : ""].filter(Boolean).join(" ");

  return (
    <main className={rootClassName}>
      <header className="copypasta__topbar">
        <div>
          <h1 className="copypasta__title">CopyPasta</h1>
          <p className={statusClassName}>{syncStatus}</p>
        </div>
        <div className="copypasta__topbar-actions">
          <button
            className={userButtonClassName}
            type="button"
            title={user ? `Signed in as ${user.email || user.name}. Click to sign out.` : "Sign in with Google"}
            aria-label={user ? `Signed in as ${user.email || user.name}. Sign out` : "Sign in with Google"}
            onClick={toggleGoogleLogin}
          >
            {user?.picture ? (
              <img className="copypasta__user-avatar" src={user.picture} alt="" />
            ) : (
              <span aria-hidden="true">G</span>
            )}
          </button>
          <button className="copypasta__icon-button copypasta__danger" type="button" title="Clear note" aria-label="Clear note" onClick={clearEditor}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </header>

      <section className="copypasta__toolbar" aria-label="Editor tools">
        <button className="copypasta__tool-button" type="button" title="Bold" aria-label="Bold" onClick={() => handleCommand("bold")}>
          <strong>B</strong>
        </button>
        <button className="copypasta__tool-button" type="button" title="Italic" aria-label="Italic" onClick={() => handleCommand("italic")}>
          <em>I</em>
        </button>
        <button className="copypasta__tool-button" type="button" title="Underline" aria-label="Underline" onClick={() => handleCommand("underline")}>
          <span className="copypasta__underline">U</span>
        </button>
        <button className="copypasta__tool-button" type="button" title="Bulleted list" aria-label="Bulleted list" onClick={() => handleCommand("insertUnorderedList")}>
          <span aria-hidden="true">&bull;</span>
        </button>
        <button className="copypasta__tool-button" type="button" title="Numbered list" aria-label="Numbered list" onClick={() => handleCommand("insertOrderedList")}>
          <span aria-hidden="true">1.</span>
        </button>
        <button className="copypasta__tool-button" type="button" title="Link" aria-label="Link" onClick={() => handleCommand("createLink")}>
          <span aria-hidden="true">Link</span>
        </button>
        <button className="copypasta__tool-button" type="button" title="Copy all" aria-label="Copy all" onClick={copyAll}>
          <span aria-hidden="true">Copy</span>
        </button>
        <label className="copypasta__tool-button copypasta__file-tool" title="Attach file" aria-label="Attach file">
          <span aria-hidden="true">+</span>
          <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} />
        </label>
      </section>

      <div
        ref={editorRef}
        className="copypasta__editor"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        spellCheck="true"
        data-placeholder="Paste text, screenshots, images, or small files here..."
        onClick={handleEditorClick}
        onInput={handleInput}
        onPaste={handlePaste}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      />

      <footer className={footerClassName}>
        <span>{quotaText}</span>
        <span>{storageLabel}</span>
      </footer>
    </main>
  );
}

function sanitizeHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html;

  const blockedTags = new Set([
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
  return base.closest("h1,h2,h3,h4,h5,h6,p,div,li,blockquote");
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

function placeCaretAtEnd(element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);

  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

function loadGoogleIdentityServices() {
  if (window.google?.accounts?.oauth2) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GOOGLE_SCRIPT_URL}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Could not load Google sign-in")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Google sign-in"));
    document.head.append(script);
  });
}

function readStoredGoogleSession(clientId) {
  try {
    const session = JSON.parse(localStorage.getItem(GOOGLE_AUTH_KEY) || "null");
    if (!isStoredGoogleSession(session, clientId)) {
      clearStoredGoogleSession();
      return null;
    }

    if (session.expiresAt <= Date.now()) {
      clearStoredGoogleSession();
      return null;
    }

    return session;
  } catch {
    clearStoredGoogleSession();
    return null;
  }
}

function writeStoredGoogleSession(session) {
  try {
    localStorage.setItem(GOOGLE_AUTH_KEY, JSON.stringify(session));
  } catch {
    // Local persistence is best-effort; in-memory login still works.
  }
}

function clearStoredGoogleSession() {
  try {
    localStorage.removeItem(GOOGLE_AUTH_KEY);
  } catch {
    // Ignore storage failures so sign-out can continue.
  }
}

function isStoredGoogleSession(value, clientId) {
  return Boolean(
    value &&
    typeof value === "object" &&
    typeof value.token === "string" &&
    typeof value.expiresAt === "number" &&
    typeof value.clientId === "string" &&
    value.clientId === clientId &&
    value.user &&
    typeof value.user === "object" &&
    typeof value.user.name === "string" &&
    typeof value.user.email === "string" &&
    typeof value.user.picture === "string"
  );
}

async function googleApiError(response, fallback) {
  try {
    const body = await response.json();
    return body.error?.message || fallback;
  } catch {
    return fallback;
  }
}

function modifiedTimeMs(value) {
  return value ? Date.parse(value) || 0 : 0;
}

function markdownInlineHtml(text) {
  let html = escapeHtml(text);

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\[([^\]]+)]\((https?:\/\/[^)\s]+|mailto:[^)\s]+|tel:[^)\s]+)\)/g, (_match, label, url) => (
    `<a href="${escapeAttribute(url)}">${label}</a>`
  ));
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  html = html.replace(/(^|[\s(])\*([^*\s][^*]*?)\*/g, "$1<em>$2</em>");
  html = html.replace(/(^|[\s(])_([^_\s][^_]*?)_/g, "$1<em>$2</em>");

  return html;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

function isAllowedUrl(value) {
  if (!value) return true;
  if (value.startsWith("#")) return true;

  try {
    const url = new URL(value, window.location.href);
    return ["data:", "http:", "https:", "mailto:", "tel:"].includes(url.protocol);
  } catch {
    return false;
  }
}

function isSyncedHtml(value) {
  return Boolean(
    value &&
    typeof value === "object" &&
    typeof value.html === "string" &&
    typeof value.updatedAt === "number"
  );
}

function bytesOf(value) {
  return new Blob([value]).size;
}

function downloadAttachmentLink(link) {
  const href = link.getAttribute("href");
  if (!href) return;

  const download = document.createElement("a");
  download.href = href;
  download.download = link.getAttribute("download") || link.textContent?.trim() || "attachment";
  download.rel = "noopener";
  document.body.append(download);
  download.click();
  download.remove();
}

function formatBytes(value, roundUp = false) {
  if (value >= 1024 * 1024 * 1024) return `${formatUnit(value, 1024 * 1024 * 1024, roundUp)} GB`;
  if (value >= 1024 * 1024) return `${formatUnit(value, 1024 * 1024, roundUp)} MB`;
  return `${Math[roundUp ? "ceil" : "floor"](value / 1024)} KB`;
}

function formatUnit(value, unit, roundUp) {
  const amount = value / unit;
  const rounded = roundUp ? Math.ceil(amount * 10) / 10 : Math.floor(amount * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => (
    {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[char] || char
  ));
}

function escapeAttribute(value) {
  return escapeHtml(String(value));
}

function errorMessage(error) {
  return error instanceof Error ? error.message : "Something went wrong";
}
