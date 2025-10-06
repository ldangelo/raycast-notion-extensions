import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import React, { useState } from "react";

export default function Command() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  async function handleSubmit(_values: { url: string; title: string; tags: string }) {
    await showToast({
      style: Toast.Style.Success,
      title: "Placeholder",
      message: "Bookmark capture implementation pending",
    });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Bookmark" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="url" title="URL" placeholder="https://example.com" value={url} onChange={setUrl} />
      <Form.TextField id="title" title="Title" placeholder="Page title" value={title} onChange={setTitle} />
      <Form.TextField id="tags" title="Tags" placeholder="tag1, tag2" value={tags} onChange={setTags} />
    </Form>
  );
}
