import { Form, ActionPanel, Action, showToast, Toast, useNavigation } from "@raycast/api";
import React, { useState, useEffect } from "react";
import { getSafariPageData } from "./utils/safari";
import { createBookmark } from "./utils/notion-client";
import { BookmarkData } from "./utils/types";

export default function BookmarkCapture() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { pop } = useNavigation();

  // Pre-fill Safari data on mount
  useEffect(() => {
    async function loadSafariData() {
      try {
        const safariData = await getSafariPageData();
        setUrl(safariData.url);
        setTitle(safariData.title || safariData.url);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        await showToast({
          style: Toast.Style.Failure,
          title: "Safari Error",
          message: errorMessage,
        });
      }
    }

    loadSafariData();
  }, []);

  async function handleSubmit(values: { url: string; title: string; tags: string }) {
    // Validate required fields
    if (!values.title || values.title.trim() === "") {
      await showToast({
        style: Toast.Style.Failure,
        title: "Validation Error",
        message: "Title is required",
      });
      return;
    }

    if (!values.url || values.url.trim() === "") {
      await showToast({
        style: Toast.Style.Failure,
        title: "Validation Error",
        message: "URL is required",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Parse tags from comma-separated string
      const tagArray = values.tags
        ? values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : undefined;

      // Create bookmark data
      const bookmarkData: BookmarkData = {
        url: values.url,
        title: values.title,
        timestamp: new Date(),
        tags: tagArray,
      };

      // Save to Notion
      await createBookmark(bookmarkData);

      // Show success message
      await showToast({
        style: Toast.Style.Success,
        title: "Bookmark Saved",
        message: "Successfully saved to Notion Bookmarks",
      });

      // Close the form
      pop();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      // Determine error type and show appropriate message
      let title = "Error";
      let message = errorMessage;

      if (errorMessage.includes("Cannot connect to Notion MCP server")) {
        title = "MCP Server Error";
        message = "Cannot connect to Notion. Please ensure MCP server is running.";
      } else if (errorMessage.includes("Bookmarks database not found")) {
        title = "Database Error";
        message = "Bookmarks database not found in your Notion workspace.";
      } else if (errorMessage.includes("Permission denied")) {
        title = "Permission Error";
        message = "Permission denied. Check your Notion integration settings.";
      }

      await showToast({
        style: Toast.Style.Failure,
        title,
        message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Bookmark" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="url"
        title="URL"
        placeholder="https://example.com"
        value={url}
        onChange={setUrl}
        info="The URL of the page to bookmark"
      />
      <Form.TextField
        id="title"
        title="Title"
        placeholder="Page title"
        value={title}
        onChange={setTitle}
        error={!title ? "Title is required" : undefined}
        info="The title for this bookmark"
      />
      <Form.TextField
        id="tags"
        title="Tags"
        placeholder="productivity, tools, reference"
        value={tags}
        onChange={setTags}
        info="Comma-separated tags (optional)"
      />
      <Form.Description
        title="Note"
        text={`Bookmark will be saved to your Notion Bookmarks database with timestamp: ${new Date().toLocaleString()}`}
      />
    </Form>
  );
}
