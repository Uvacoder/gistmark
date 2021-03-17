import React, { useContext, useState } from "react"
import { EditorStateContext, LayoutContext } from "~/context"
import { BookmarkContext } from "~/context/BookmarkContext"
import { Bookmark } from "~/model/Bookmark"
import Editor from "./Editor"

export const EditBookmarkPanel = () => {
  const layoutContext = useContext(LayoutContext)
  const bookmarkContext = useContext(BookmarkContext)
  const editorState = useContext(EditorStateContext)

  const [state, setState] = useState<Bookmark>({
    guid: editorState.bookmark.guid,
    name: editorState.bookmark.name,
    href: editorState.bookmark.href,
    category: editorState.bookmark.category,
    description: editorState.bookmark.description,
  })

  const handleSave = () => {
    if (!state.name) {
      alert("Please enter a name!")
      return
    }

    if (!state.href) {
      alert("Please enter a URL")
      return
    }

    if (editorState.bookmark.guid) {
      bookmarkContext.editBookmark(state, editorState.bookmark.guid)
      layoutContext.toggleEditPanel()
    } else {
      alert("ERR: Unable to edit, no guid found")
    }
  }

  const handleCancel = () => {
    layoutContext.toggleEditPanel()
  }

  const handleEditField = (key: keyof Bookmark, value: string) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  return (
    <Editor
      editMode={true}
      name={state.name}
      href={state.href}
      category={state.category}
      description={state.description}
      onEditField={(field, value) => handleEditField(field, value)}
      onDirectEdit={(newValue: Bookmark) => setState(newValue)}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  )
}